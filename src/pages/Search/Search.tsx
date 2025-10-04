import { Link, useNavigate, useLocation, Outlet } from "react-router-dom";
import * as S from "./searchStyle";
import logo from "@/assets/Netflix_Logo_RGB.png";
import { useState, useRef, useEffect, useCallback } from "react";
import { useAuth } from "@/hooks/useAuth";
import Footer from "@/components/Footer/Footer";

// --- 타입 정의 ---
type MovieItem = {
  id: number;
  title?: string;
  name?: string;
  poster_path: string | null;
  backdrop_path?: string | null;
  media_type: "movie" | "tv";
};

type MultiSearchItem = {
  id: number;
  title?: string;
  name?: string;
  media_type: "movie" | "tv" | "person";
  poster_path?: string | null; // 배포 오류 해결
  backdrop_path?: string | null; // 배포 오류 해결
};
// ----------------

export default function Search({
  apiKey,
  logoSrc,
}: { apiKey?: string; logoSrc?: string } = {}): React.JSX.Element {
  const location = useLocation();
  const navigate = useNavigate();

  const [query, setQuery] = useState(() => {
    const params = new URLSearchParams(location.search);
    return params.get("query") ?? "";
  });

  const TMDB_KEY = (apiKey || import.meta.env.VITE_TMDB_API_KEY) as string;
  const TMDB_BASE = "https://api.themoviedb.org/3";
  const TMDB_IMG = "https://image.tmdb.org/t/p/w500";

  const isSearchRoute = location.pathname.startsWith("/search");

  const [movies, setMovies] = useState<MovieItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [showSearch, setShowSearch] = useState(isSearchRoute);
  const searchRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLLIElement>(null);

  const hasQuery = query.trim() !== "";
  const noResult = hasQuery && !loading && !error && movies.length === 0;

  const handleClearSearch = () => {
    setQuery("");
    navigate("/home");
  };

  // 검색어 입력 시 URL 실시간 변경
  useEffect(() => {
    const q = query.trim();
    if (showSearch && !location.pathname.includes("/search/")) {
      const timer = setTimeout(() => {
        if (q) {
          navigate(`/search?query=${encodeURIComponent(q)}`, { replace: true });
        } else if (location.pathname === "/search") {
          navigate("/home", { replace: true });
        }
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [query, navigate, showSearch, location.pathname]);

  // URL 변경에 따라 API 호출
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const q = params.get("query")?.trim() ?? "";

    if (!q || !isSearchRoute) {
      setMovies([]);
      setError(null);
      return;
    }
    if (!TMDB_KEY) {
      setError("TMDB API 키가 없습니다.");
      return;
    }

    const ctrl = new AbortController();
    setLoading(true);
    setError(null);

    fetch(
      `${TMDB_BASE}/search/multi?api_key=${TMDB_KEY}&language=ko-KR&query=${encodeURIComponent(
        q
      )}&page=1&include_adult=false`,
      { signal: ctrl.signal }
    )
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {
        const list: MovieItem[] = (
          (data.results as MultiSearchItem[]) || []
        ).filter(
          (it): it is MovieItem =>
            (it.media_type === "movie" || it.media_type === "tv") &&
            !!(it.poster_path || it.backdrop_path)
        );
        setMovies(list);
      })
      .catch((e) => {
        if (e.name !== "AbortError") setError(e.message);
      })
      .finally(() => setLoading(false));

    return () => ctrl.abort();
  }, [location.search, isSearchRoute, TMDB_KEY]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(e.target as Node) &&
        !query.trim() &&
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

  const alertNotYet = useCallback(() => {
    alert("개발되지 않은 기능입니다.");
  }, []);

  const headerContent = (
    <S.HeaderBar>
      <S.Logo href='/home'>
        <S.LogoImg src={logoSrc || logo} alt='Netflix' />
      </S.Logo>
      <S.Ul>
        <S.Li ref={dropdownRef}>
          <S.SearchNav onClick={() => setOpen((prev) => !prev)}>
            메뉴 ▼
          </S.SearchNav>
          {open && (
            <S.Dropdown>
              <S.DropdownIcon></S.DropdownIcon>
              <S.DropdownUl>
                <S.DropdownLi
                  onClick={() => navigate("/home")}
                  $isSelected={location.pathname === "/home"}
                >
                  홈
                </S.DropdownLi>
                <S.DropdownLi onClick={() => alertNotYet()} $isSelected={false}>
                  시리즈
                </S.DropdownLi>
                <S.DropdownLi onClick={() => alertNotYet()} $isSelected={false}>
                  영화
                </S.DropdownLi>
                <S.DropdownLi onClick={() => alertNotYet()} $isSelected={false}>
                  NEW & 인기
                </S.DropdownLi>
                <S.DropdownLi
                  onClick={() => navigate("/my-list")}
                  $isSelected={location.pathname === "/my-list"}
                >
                  내가 찜한 리스트
                </S.DropdownLi>
              </S.DropdownUl>
            </S.Dropdown>
          )}
        </S.Li>
      </S.Ul>
      <S.Nav>
        <S.NavItem
          onClick={() => navigate("/home")}
          $isSelected={location.pathname === "/home"}
        >
          홈
        </S.NavItem>
        <S.NavItem onClick={() => alertNotYet()} $isSelected={false}>
          시리즈
        </S.NavItem>
        <S.NavItem onClick={() => alertNotYet()} $isSelected={false}>
          영화
        </S.NavItem>
        <S.NavItem onClick={() => alertNotYet()} $isSelected={false}>
          NEW & 인기
        </S.NavItem>
        <S.NavItem
          onClick={() => navigate("/my-list")}
          $isSelected={location.pathname === "/my-list"}
        >
          내가 찜한 리스트
        </S.NavItem>
      </S.Nav>
      <S.HeaderActions>
        {showSearch ? (
          <S.SearchBtn ref={searchRef}>
            <S.Searchimg aria-label='검색'>
              <S.Svg viewBox='0 0 24 24'>
                <path
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                  d='M10 17a7 7 0 1 0 0-14 7 7 0 0 0 0 14zm6 5l-4-4'
                ></path>
              </S.Svg>
            </S.Searchimg>
            <S.SearchBox
              placeholder='제목, 사람, 장르'
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            {query && (
              <S.SearchDel
                onClick={handleClearSearch}
                role='button'
                aria-label='검색어 삭제'
              >
                ⨯
              </S.SearchDel>
            )}
          </S.SearchBtn>
        ) : (
          <S.SearchIconBox
            aria-label='검색'
            onClick={() => setShowSearch(true)}
          >
            <S.Svg viewBox='0 0 24 24'>
              <path
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                d='M10 17a7 7 0 1 0 0-14 7 7 0 0 0 0 14zm6 5l-4-4'
              ></path>
            </S.Svg>
          </S.SearchIconBox>
        )}
        <S.IconBox aria-label='알림'>
          <S.Svg viewBox='0 0 24 24'>
            <path
              d='M13.0002 4.07092C16.3924 4.55624 19 7.4736 19 11V15.2538C20.0489 15.3307 21.0851 15.4245 22.1072 15.5347L21.8928 17.5232C18.7222 17.1813 15.4092 17 12 17C8.59081 17 5.27788 17.1813 2.10723 17.5232L1.89282 15.5347C2.91498 15.4245 3.95119 15.3307 5.00003 15.2538V11C5.00003 7.47345 7.60784 4.55599 11.0002 4.07086V2H13.0002V4.07092ZM17 15.1287V11C17 8.23858 14.7614 6 12 6C9.2386 6 7.00003 8.23858 7.00003 11V15.1287C8.64066 15.0437 10.3091 15 12 15C13.691 15 15.3594 15.0437 17 15.1287ZM8.62593 19.3712C8.66235 20.5173 10.1512 22 11.9996 22C13.848 22 15.3368 20.5173 15.3732 19.3712C15.3803 19.1489 15.1758 19 14.9533 19H9.0458C8.82333 19 8.61886 19.1489 8.62593 19.3712Z'
              fill='currentColor'
            ></path>
          </S.Svg>
        </S.IconBox>
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
            <S.ProfileDropdownItem
              as='button'
              onClick={handleSignOut}
              $isButton={true}
            >
              넷플릭스에서 로그아웃
            </S.ProfileDropdownItem>
          </S.ProfileDropdown>
        </div>
      </S.HeaderActions>
    </S.HeaderBar>
  );

  if (isSearchRoute) {
    return (
      <S.SearchPage>
        {headerContent}
        <S.HeaderSpacer />
        <S.main>
          {noResult ? (
            <S.text>
              <S.NoSearch>
                <S.NoSearchTitle>
                  입력하신 검색어 '{query}'(와)과 일치하는 결과가 없습니다.
                </S.NoSearchTitle>
                <S.ReSearch>추천 검색어:</S.ReSearch>
                <S.ReSearchUl>
                  <S.ReSearchLi>다른 키워드를 입력해 보세요.</S.ReSearchLi>
                  <S.ReSearchLi>시리즈나 영화를 찾고 계신가요?</S.ReSearchLi>
                  <S.ReSearchLi>
                    영화 제목, 시리즈 제목, 또는 배우나 감독의 이름으로 검색해
                    보세요.
                  </S.ReSearchLi>
                  <S.ReSearchLi>
                    코미디, 로맨스, 스포츠 또는 드라마와 같은 장르명으로 검색해
                    보세요.
                  </S.ReSearchLi>
                </S.ReSearchUl>
              </S.NoSearch>
            </S.text>
          ) : (
            <>
              <S.ReMovie>
                {loading ? (
                  <div style={{ margin: "0 60px", opacity: 0.7 }}>
                    불러오는 중…
                  </div>
                ) : null}
                {error && (
                  <div style={{ margin: "0 60px", color: "tomato" }}>
                    오류: {error}
                  </div>
                )}
                {!loading && !error && movies.length > 0 && (
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
              </S.ReMovie>
            </>
          )}
        </S.main>
        <Outlet />
        <S.FooterBox>
          <Footer $isSignUp={false} $isWelcome={false} $isMain={true} />
        </S.FooterBox>
      </S.SearchPage>
    );
  }
  return headerContent;
}
