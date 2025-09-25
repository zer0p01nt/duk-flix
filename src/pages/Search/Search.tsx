import { useNavigate } from "react-router-dom";
import * as S from "./searchStyle";
import logo from "@/assets/Netflix_Logo_RGB.png";
import { useState, useRef, useEffect } from "react";

// 컴포넌트
export default function Search({
  apiKey,
  logoSrc,
}: { apiKey?: string; logoSrc?: string } = {}): React.JSX.Element {

// const [query, setQuery] = useState("");
const [query, setQuery] = useState("");

  // Api가져오기
const TMDB_KEY = (apiKey || import.meta.env.VITE_TMDB_API_KEY) as string;
const TMDB_BASE = "https://api.themoviedb.org/3";
const TMDB_IMG = "https://image.tmdb.org/t/p/w500";

  const [movies, setMovies] = useState<MovieItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

// const handleClearSearch = () => {
  const navigate = useNavigate();
  const [showSearch, setShowSearch] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLLIElement>(null);

  const handleClearSearch = () => {
  setQuery("");
  setShowSearch(false);
  navigate("/"); // 메인으로
};

  const [suggests, setSuggests] = useState<Suggestion[]>([]);
const [sugLoading, setSugLoading] = useState(false);
const [related, setRelated] = useState<MovieItem[]>([]);
const [relatedLoading, setRelatedLoading] = useState(false);
const [bannerMode, setBannerMode] = useState<"none" | "title" | "keyword">("none");
const [bannerLabel, setBannerLabel] = useState<string>("");

  const hasQuery = query.trim() !== "";
  const isUsingRelated = bannerMode !== "none";
  const gridItems = isUsingRelated ? related : movies;
  const isLoading = isUsingRelated ? relatedLoading : loading;
  const noResult =
    hasQuery &&
    bannerMode === "none" &&
    !loading &&
    !error &&
    movies.length === 0;

type MovieItem = {
  id: number;
  title?: string;
  name?: string;
  poster_path: string | null;
  backdrop_path?: string | null;
};

type Suggestion =
  | { type: "title"; id: number; label: string; media: "movie" | "tv" }
  | { type: "keyword"; id: number; label: string };

type MultiSearchItem = {
  id: number;
  title?: string;
  name?: string;
  media_type: "movie" | "tv" | "person";
};

type KeywordItem = {
  id: number;
  name: string;
};


useEffect(() => {
  const q = query.trim();
  if (!TMDB_KEY) {
    setError("TMDB API 키가 없습니다. apiKey props 또는 VITE_TMDB_API_KEY를 설정하세요.");
    setMovies([]);
    return;
  }

  setBannerMode("none"); 
  setRelated([]);            
  setRelatedLoading(false);

  if (!q) {
    setMovies([]);
    setError(null);
    setLoading(false);
    setSuggests([]);
    setBannerMode("none");
    setRelated([]);
    return;
  }

  const ctrl = new AbortController();
  const timer = setTimeout(async () => {
    setLoading(true);
    setError(null);
    try {
      const url = `${TMDB_BASE}/search/multi?api_key=${TMDB_KEY}&language=ko-KR&query=${encodeURIComponent(q)}&page=1&include_adult=false`;
      const res = await fetch(url, { signal: ctrl.signal });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.status_message || `HTTP ${res.status}`);

      const list: MovieItem[] = (data.results as MovieItem[] || []).filter(
        (it) => it.poster_path || it.backdrop_path
      );
      setMovies(list);
    } catch (e: unknown) {
      if (e instanceof Error && e.name !== "AbortError") setError(e.message);
    } finally {
      setLoading(false);
    }
  }, 250);

  return () => { clearTimeout(timer); ctrl.abort(); };
}, [query, TMDB_KEY]);

// 추천어 생성
useEffect(() => {
  const q = query.trim();
  if (!q) return;

  const ctrl = new AbortController();
  const timer = setTimeout(async () => {
    setSugLoading(true);
    try {
      const titleUrl = `${TMDB_BASE}/search/multi?api_key=${TMDB_KEY}&language=ko-KR&query=${encodeURIComponent(q)}&page=1&include_adult=false`;
      const titleRes = await fetch(titleUrl, { signal: ctrl.signal });
      const titleData = await titleRes.json().catch(() => ({}));

// 1) 타입 가드 추가
const isMovieOrTv = (x: MultiSearchItem): x is MultiSearchItem & { media_type: "movie" | "tv" } =>
  x.media_type === "movie" || x.media_type === "tv";

// 2) filter에 타입 가드 사용
const titleSugs: Suggestion[] =
  ((titleData.results ?? []) as MultiSearchItem[])
    .filter(isMovieOrTv) 
    .slice(0, 6)
    .map((it) => ({
      type: "title" as const,
      id: it.id,
      label: it.title || it.name || "",
      media: it.media_type,
    }));


      // 2) 키워드(분위기) 후보
      const kwUrl = `${TMDB_BASE}/search/keyword?api_key=${TMDB_KEY}&query=${encodeURIComponent(q)}&page=1`;
      const kwRes = await fetch(kwUrl, { signal: ctrl.signal });
      const kwData = await kwRes.json().catch(() => ({}));

const kwSugs: Suggestion[] = ((kwData.results ?? []) as KeywordItem[])
  .slice(0, 6)
  .map((k) => ({
    type: "keyword" as const,
    id: k.id,
    label: k.name,
  }));

      const mixed = [...titleSugs, ...kwSugs].slice(0, 10);
      setSuggests(mixed);
    } finally {
      setSugLoading(false);
    }
  }, 250);

  return () => { clearTimeout(timer); ctrl.abort(); };
}, [query, TMDB_KEY]);

//추천클릭
const handleSuggestClick = async (s: Suggestion) => {
  setRelated([]);
  setBannerLabel(s.label);

  if (s.type === "title") {
    setBannerMode("title");
    setRelatedLoading(true);
    try {
      const path = s.media === "movie"
        ? `/movie/${s.id}/recommendations`
        : `/tv/${s.id}/recommendations`;
      const url = `${TMDB_BASE}${path}?api_key=${TMDB_KEY}&language=ko-KR&page=1`;
      const res = await fetch(url);
      const data = await res.json().catch(() => ({}));
const list: MovieItem[] = ((data.results ?? []) as MovieItem[]).filter(
  (it) => it.poster_path || it.backdrop_path
);
      setRelated(list);
    } finally {
      setRelatedLoading(false);
    }
  }

  if (s.type === "keyword") {
    setBannerMode("keyword");
    setRelatedLoading(true);
    try {
      const url = `${TMDB_BASE}/discover/movie?api_key=${TMDB_KEY}&language=ko-KR&include_adult=false&with_keywords=${s.id}&sort_by=popularity.desc&page=1`;
      const res = await fetch(url);
      const data = await res.json().catch(() => ({}));
      const list: MovieItem[] = ((data.results ?? []) as MovieItem[]).filter(
  (it) => it.poster_path || it.backdrop_path
);
      setRelated(list);
    } finally {
      setRelatedLoading(false);
    }
  }
};


// 검색어 있을 시에는 고정
useEffect(() => {
  const handleClickOutside = (e: MouseEvent) => {
    if (
      searchRef.current &&
      !searchRef.current.contains(e.target as Node) &&
      query.trim() === ""
    ) {
      setShowSearch(false);
    }
  };

  if (showSearch) document.addEventListener("mousedown", handleClickOutside);
  return () => document.removeEventListener("mousedown", handleClickOutside);
}, [showSearch, query]);


  // 드롭다운 외부 클릭
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    if (open) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);
  

  return (
    <S.Page>
      {/* 헤더 */}
      <S.HeaderBar>
        <S.Logo>
          {/* <S.LogoImg src={logo} alt="Netflix" /> */}
          <S.LogoImg src={logoSrc || logo} alt="Netflix" />
        </S.Logo>

        {/* 메뉴 */}
        <S.Ul>
          <S.Li ref={dropdownRef}>
            <S.SearchNav onClick={() => setOpen((prev) => !prev)}>
              메뉴 ▼
            </S.SearchNav>

            {open && (
              <S.Dropdown >
                <S.DropdownIcon>
                </S.DropdownIcon>
              <S.DropdownUl>
                <S.DropdownLi onClick={() => navigate("/")}>
                  홈
                </S.DropdownLi>
                <S.DropdownLi onClick={() => navigate("/series")}>
                  시리즈
                </S.DropdownLi>
                <S.DropdownLi onClick={() => navigate("/movies")}>
                  영화
                </S.DropdownLi>
                <S.DropdownLi onClick={() => navigate("/new")}>
                  NEW & 인기
                </S.DropdownLi>
                <S.DropdownLi onClick={() => navigate("/my-list")}>
                  내가 찜한 리스트
                </S.DropdownLi>
              </S.DropdownUl>
            </S.Dropdown>
        )}
          </S.Li>
        </S.Ul>

      {/* 네브바 */}
        <S.Nav>
          <S.NavItem onClick={() => navigate("/")}>홈</S.NavItem>
          <S.NavItem onClick={() => navigate("/series")}>시리즈</S.NavItem>
          <S.NavItem onClick={() => navigate("/movies")}>영화</S.NavItem>
          <S.NavItem onClick={() => navigate("/new")}>NEW & 인기</S.NavItem>
          <S.NavItem onClick={() => navigate("/my-list")}>
            내가 찜한 리스트
          </S.NavItem>
        </S.Nav>
        
        <S.HeaderActions>
          {showSearch && ( 
          <S.SearchBtn ref={searchRef}>
            <S.Searchimg aria-label="검색">
              <S.Svg
                viewBox="0 0 24 24"
                role="img"
                aria-hidden="true"
                focusable="false"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10ZM15.6177 17.0319C14.078 18.2635 12.125 19 10 19C5.02944 19 1 14.9706 1 10C1 5.02944 5.02944 1 10 1C14.9706 1 19 5.02944 19 10C19 12.125 18.2635 14.078 17.0319 15.6177L22.7071 21.2929L21.2929 22.7071L15.6177 17.0319Z"
                  fill="currentColor"
                />
              </S.Svg>
            </S.Searchimg>
              <S.SearchBox
                placeholder="제목, 사람, 장르"
                value={query}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)}
              />
            {query && (
            <S.SearchDel onClick={handleClearSearch} role="button" aria-label="검색어 삭제">
              ⨯
            </S.SearchDel>
            )}
            </S.SearchBtn>
            )}

          {!showSearch && (
            <S.SearchIconBox aria-label="검색" onClick={() => setShowSearch(true)}>
              <S.Svg
                viewBox="0 0 24 24"
                role="img"
                aria-hidden="true"
                focusable="false"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10ZM15.6177 17.0319C14.078 18.2635 12.125 19 10 19C5.02944 19 1 14.9706 1 10C1 5.02944 5.02944 1 10 1C14.9706 1 19 5.02944 19 10C19 12.125 18.2635 14.078 17.0319 15.6177L22.7071 21.2929L21.2929 22.7071L15.6177 17.0319Z"
                  fill="currentColor"
                />
              </S.Svg>
            </S.SearchIconBox>
            )}
          <S.IconBox aria-label="알림">
            <S.Svg
              viewBox="0 0 24 24"
              role="img"
              aria-hidden="true"
              focusable="false"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M13.0002 4.07092C16.3924 4.55624 19 7.4736 19 11V15.2538C20.0489 15.3307 21.0851 15.4245 22.1072 15.5347L21.8928 17.5232C18.7222 17.1813 15.4092 17 12 17C8.59081 17 5.27788 17.1813 2.10723 17.5232L1.89282 15.5347C2.91498 15.4245 3.95119 15.3307 5.00003 15.2538V11C5.00003 7.47345 7.60784 4.55599 11.0002 4.07086V2H13.0002V4.07092ZM17 15.1287V11C17 8.23858 14.7614 6 12 6C9.2386 6 7.00003 8.23858 7.00003 11V15.1287C8.64066 15.0437 10.3091 15 12 15C13.691 15 15.3594 15.0437 17 15.1287ZM8.62593 19.3712C8.66235 20.5173 10.1512 22 11.9996 22C13.848 22 15.3368 20.5173 15.3732 19.3712C15.3803 19.1489 15.1758 19 14.9533 19H9.0458C8.82333 19 8.61886 19.1489 8.62593 19.3712Z"
                fill="currentColor"
              ></path>
            </S.Svg>
          </S.IconBox>
          <S.Avatar />
        </S.HeaderActions>
      </S.HeaderBar>

{/* 메인 */}
<S.main>
  {/* 추천검색어 */}
  {hasQuery && !noResult && (
<S.RecommendBox>
  <S.RecommendTitle>
    더 다양한 검색어가 필요하시다면!:
  </S.RecommendTitle>
  <S.Recommend>
    {sugLoading && <span>추천어 로딩…</span>}
    {!sugLoading && suggests.map((s) => (
    <S.RecommendIcon key={`${s.type}-${s.id}`} onClick={() => handleSuggestClick(s)}>
    {s.label}
    </S.RecommendIcon>
    ))}
  </S.Recommend>
</S.RecommendBox>
  )}

{/* 추천영화 */}
<S.ReMovie>
  {hasQuery && isLoading && (
    <div style={{ margin: "0 60px", opacity: 0.7 }}>불러오는 중…</div>
  )}

  {hasQuery && !noResult && bannerMode !== "none" && (
  <S.ReOther>
    {bannerMode === "title"
        ? `“${bannerLabel}” 작품은 없습니다. 대신 이런 작품들은 어떠세요?`
        : `${bannerLabel} 검색 결과 && 다른 인기 콘텐츠`}
  </S.ReOther>
  )}
  
  {hasQuery && error && (
    <div style={{ margin: "0 60px", color: "tomato" }}>오류: {error}</div>
  )}

  {hasQuery && !loading && !error && movies.length > 0 && (
  <S.MovieGrid>
    {gridItems.map((m) => {
            const title = m.title || m.name || "제목 없음";
            const img =
              (m.poster_path && `${TMDB_IMG}${m.poster_path}`) ||
              (m.backdrop_path && `${TMDB_IMG}${m.backdrop_path}`) ||
              "";
            return (
              <S.Movie key={m.id}>
                <S.MovieLink href={`#movie-${m.id}`}>
                  <S.Poster src={img} alt={title} title={title} />
                </S.MovieLink>
              </S.Movie>
            );
          })}
  </S.MovieGrid>
  )}

     {/* 결과 없음 */}
      {noResult && (
        <S.text>
<S.NoSearch>
  <S.NoSearchTitle>
    입력하신 검색어 '{query}'(와)과 일치하는 결과가 없습니다.
  </S.NoSearchTitle>
  <S.ReSearch>
추천 검색어:
  </S.ReSearch>
  <S.ReSearchUl>
  <S.ReSearchLi>
    다른 키워드를 입력해 보세요.
  </S.ReSearchLi>
    <S.ReSearchLi>
    시리즈나 영화를 찾고 계신가요?
  </S.ReSearchLi>
    <S.ReSearchLi>
    영화 제목, 시리즈 제목, 또는 배우나 감독의 이음으로 검색해 보세요.
  </S.ReSearchLi>
    <S.ReSearchLi>
    코미디, 로맨스, 스포츠 또는 드라마와 같은 장르명으로 검색해 보세요.
  </S.ReSearchLi>
  </S.ReSearchUl>
</S.NoSearch>
</S.text>
        )}
</S.ReMovie>
</S.main>
    </S.Page>
  );
}