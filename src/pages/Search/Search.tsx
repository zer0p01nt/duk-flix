import { Link, useNavigate, useLocation, Outlet } from "react-router-dom";
import * as S from "./searchStyle";
import logo from "@/assets/Netflix_Logo_RGB.png";
import { useState, useRef, useEffect, useCallback } from "react";
import { useAuth } from "@/hooks/useAuth";
import Footer from "@/components/Footer/Footer";

// 컴포넌트
export default function Search({
  apiKey,
  logoSrc,
}: { apiKey?: string; logoSrc?: string } = {}): React.JSX.Element {
  const [query, setQuery] = useState("");

  // Api가져오기
  const TMDB_KEY = (apiKey || import.meta.env.VITE_TMDB_API_KEY) as string;
  const TMDB_BASE = "https://api.themoviedb.org/3";
  const TMDB_IMG = "https://image.tmdb.org/t/p/w500";

  // 로딩
  const { pathname, search } = useLocation();
  const isSearchRoute = pathname.startsWith("/search");

  useEffect(() => {
    // 상세 페이지가 아닐 때만 URL의 쿼리를 상태에 동기화
    if (pathname === '/search') {
      const params = new URLSearchParams(search);
      const q = params.get("query") ?? "";
      if (q !== query) setQuery(q);
    } else {
        // 검색 페이지가 아니면 검색어 초기화
        setQuery("");
    }
  }, [pathname, search]);

  useEffect(() => {
    if (isSearchRoute) {
      setShowSearch(true);
    }
  }, [isSearchRoute]);

  const [movies, setMovies] = useState<MovieItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();
  const [showSearch, setShowSearch] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLLIElement>(null);

  const handleClearSearch = () => {
    setQuery("");
    navigate("/home");
  };
  
  // 검색어 입력 시 URL 변경
  useEffect(() => {
    const q = query.trim();
    // 이 효과는 검색창에 입력할 때만 동작해야 함
    if (!showSearch) return;

    const timer = setTimeout(() => {
        if (q) {
            const next = `/search?query=${encodeURIComponent(q)}`;
            // 현재 URL이 이미 올바른 검색 URL이 아니라면 이동
            if (`${pathname}${search}` !== next) {
                navigate(next, { replace: true });
            }
        } else if (isSearchRoute && pathname === '/search') {
            // 검색페이지에서 검색어를 모두 지우면 홈으로 이동
            navigate("/home", { replace: true });
        }
    }, 300);

    return () => clearTimeout(timer);
  }, [query, navigate, showSearch, isSearchRoute, pathname, search]);


  const [suggests, setSuggests] = useState<Suggestion[]>([]);
  const [sugLoading, setSugLoading] = useState(false);
  const [related, setRelated] = useState<MovieItem[]>([]);
  const [relatedLoading, setRelatedLoading] = useState(false);
  const [bannerMode, setBannerMode] = useState<"none" | "title" | "keyword">(
    "none"
  );
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
    media_type: "movie" | "tv";
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
    if (!q || !isSearchRoute) {
      setMovies([]);
      setError(null);
      return;
    }
    if (!TMDB_KEY) {
      setError(
        "TMDB API 키가 없습니다. apiKey props 또는 VITE_TMDB_API_KEY를 설정하세요."
      );
      return;
    }
  
    setBannerMode("none");
    setRelated([]);
    setRelatedLoading(false);
  
    const ctrl = new AbortController();
    const timer = setTimeout(async () => {
      setLoading(true);
      setError(null);
      try {
        const url = `${TMDB_BASE}/search/multi?api_key=${TMDB_KEY}&language=ko-KR&query=${encodeURIComponent(
          q
        )}&page=1&include_adult=false`;
        const res = await fetch(url, { signal: ctrl.signal });
        const data = await res.json().catch(() => ({}));
        if (!res.ok)
          throw new Error(data.status_message || `HTTP ${res.status}`);
  
        const list: MovieItem[] = ((data.results as MultiSearchItem[]) || [])
          .filter(
            (it): it is MovieItem =>
              (it.media_type === "movie" || it.media_type === "tv") &&
              (it.poster_path || it.backdrop_path)
          );
        setMovies(list);
      } catch (e: unknown) {
        if (e instanceof Error && e.name !== "AbortError") setError(e.message);
      } finally {
        setLoading(false);
      }
    }, 250);
  
    return () => {
      clearTimeout(timer);
      ctrl.abort();
    };
  }, [query, TMDB_KEY, isSearchRoute]);

  // 외부 클릭 감지 로직
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(e.target as Node) &&
        query.trim() === "" &&
        !isSearchRoute
      ) {
        setShowSearch(false);
      }
    };
    if (showSearch) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showSearch, query, isSearchRoute]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    if (open) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  // 프로필 드롭다운
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { currentUser, logout } = useAuth();
  const userEmail = currentUser?.email || "Guest";

  const handleSignOut = useCallback(async () => {
    if (confirm("로그아웃하시겠습니까?")) {
      try {
        await logout();
        navigate("/");
      } catch {
        alert("로그아웃에 실패했습니다.");
      }
    }
    setIsProfileOpen(false);
  }, [logout, navigate]);

  const headerContent = (
    <S.HeaderBar>
      <S.Logo>
        <Link to="/home">
          <S.LogoImg src={logoSrc || logo} alt="Netflix" />
        </Link>
      </S.Logo>
      <S.Ul>
        <S.Li ref={dropdownRef}>
          <S.SearchNav onClick={() => setOpen((prev) => !prev)}>
            메뉴 ▼
          </S.SearchNav>
          {open && (
            <S.Dropdown>
              <S.DropdownIcon />
              <S.DropdownUl>
                <S.DropdownLi onClick={() => navigate("/home")}>홈</S.DropdownLi>
                <S.DropdownLi onClick={() => navigate("/series")}>시리즈</S.DropdownLi>
                <S.DropdownLi onClick={() => navigate("/movies")}>영화</S.DropdownLi>
                <S.DropdownLi onClick={() => navigate("/new")}>NEW & 인기</S.DropdownLi>
                <S.DropdownLi onClick={() => navigate("/my-list")}>내가 찜한 리스트</S.DropdownLi>
              </S.DropdownUl>
            </S.Dropdown>
          )}
        </S.Li>
      </S.Ul>
      <S.Nav>
        <S.NavItem onClick={() => navigate("/home")}>홈</S.NavItem>
        <S.NavItem onClick={() => navigate("/series")}>시리즈</S.NavItem>
        <S.NavItem onClick={() => navigate("/movies")}>영화</S.NavItem>
        <S.NavItem onClick={() => navigate("/new")}>NEW & 인기</S.NavItem>
        <S.NavItem onClick={() => navigate("/my-list")}>내가 찜한 리스트</S.NavItem>
      </S.Nav>
      <S.HeaderActions>
        {showSearch && (
          <S.SearchBtn ref={searchRef}>
            <S.Searchimg aria-label="검색">
            <S.Svg
                  viewBox='0 0 24 24'
                  role='img'
                  aria-hidden='true'
                  focusable='false'
                >
                  <path
                    fillRule='evenodd'
                    clipRule='evenodd'
                    d='M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10ZM15.6177 17.0319C14.078 18.2635 12.125 19 10 19C5.02944 19 1 14.9706 1 10C1 5.02944 5.02944 1 10 1C14.9706 1 19 5.02944 19 10C19 12.125 18.2635 14.078 17.0319 15.6177L22.7071 21.2929L21.2929 22.7071L15.6177 17.0319Z'
                    fill='currentColor'
                  />
                </S.Svg>
            </S.Searchimg>
            <S.SearchBox
              placeholder="제목, 사람, 장르"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            {query && (
              <S.SearchDel onClick={handleClearSearch} role="button" aria-label="검색어 삭제">
                ⨯
              </S.SearchDel>
            )}
          </S.SearchBtn>
        )}
        {!showSearch && (
          <S.SearchIconBox
            aria-label="검색"
            onClick={() => setShowSearch(true)}
          >
            <S.Svg
                  viewBox='0 0 24 24'
                  role='img'
                  aria-hidden='true'
                  focusable='false'
                >
                  <path
                    fillRule='evenodd'
                    clipRule='evenodd'
                    d='M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10ZM15.6177 17.0319C14.078 18.2635 12.125 19 10 19C5.02944 19 1 14.9706 1 10C1 5.02944 5.02944 1 10 1C14.9706 1 19 5.02944 19 10C19 12.125 18.2635 14.078 17.0319 15.6177L22.7071 21.2929L21.2929 22.7071L15.6177 17.0319Z'
                    fill='currentColor'
                  />
                </S.Svg>
          </S.SearchIconBox>
        )}
        <S.IconBox aria-label="알림">{/* ... 알림 아이콘 ... */}</S.IconBox>
        <div
          onMouseEnter={() => setIsProfileOpen(true)}
          onMouseLeave={() => setIsProfileOpen(false)}
        >
          <S.AvatarWrapper>
            <S.AvatarBox>
              <S.Avatar />
              <S.AvatarTriangle $isRotated={isProfileOpen} />
            </S.AvatarBox>
          </S.AvatarWrapper>
          <S.ProfileDropdown $isOpen={isProfileOpen}>
            <S.ProfileDropdownIcon />
            <S.ProfileDropdownItem $isButton={false}>
              <S.Avatar />
              <span>{userEmail}</span>
            </S.ProfileDropdownItem>
            <S.ProfileDropdownHr />
            <S.ProfileDropdownItem as="button" onClick={handleSignOut} $isButton={true}>
              넷플릭스에서 로그아웃
            </S.ProfileDropdownItem>
          </S.ProfileDropdown>
        </div>
      </S.HeaderActions>
    </S.HeaderBar>
  );

  // 현재 경로가 /search 이면 전체 검색 페이지를, 아니면 헤더만 렌더링
  if (isSearchRoute) {
    return (
      <S.SearchPage>
        {headerContent}
        <S.HeaderSpacer />
        <S.main>
          {/* ... 추천 검색어, 로딩, 오류, 결과 없음 등 JSX ... */}
          {hasQuery && !loading && !error && movies.length > 0 && (
            <S.MovieGrid>
              {movies.map((m) => {
                const title = m.title || m.name || "제목 없음";
                const img =
                  (m.poster_path && `${TMDB_IMG}${m.poster_path}`) ||
                  (m.backdrop_path && `${TMDB_IMG}${m.backdrop_path}`) ||
                  "";
                return (
                  <Link key={m.id} to={`/search/${m.media_type}/${m.id}`}>
                    <S.Movie>
                      <S.Poster src={img} alt={title} title={title} />
                    </S.Movie>
                  </Link>
                );
              })}
            </S.MovieGrid>
          )}
        </S.main>
        <Outlet />
        <Footer $isSignUp={false} $isWelcome={false} $isMain={true} />
      </S.SearchPage>
    );
  }

  // /search 경로가 아닐 경우 헤더만 반환
  return headerContent;
}