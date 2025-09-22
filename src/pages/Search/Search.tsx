import { useNavigate } from "react-router-dom";
import * as S from "./searchStyle";
import logo from "@/assets/Netflix_Logo_RGB.png";
import { useState, useRef, useEffect } from "react";


export default function Search(): React.JSX.Element {
  const navigate = useNavigate();
  const [showSearch, setShowSearch] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

    const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLLIElement>(null);



    // 외부 클릭 감지
useEffect(() => {
  const handleClickOutside = (e: MouseEvent) => {
    if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
      setShowSearch(false);
    }
  };

  if (showSearch) document.addEventListener("mousedown", handleClickOutside);
  return () => document.removeEventListener("mousedown", handleClickOutside);
}, [showSearch]);


  // 드롭다운 외부 클릭 감지
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
          <S.LogoImg src={logo} alt="Netflix" />
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
            <S.SearchBox placeholder="제목, 사람, 장르">
            </S.SearchBox>
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
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M13.0002 4.07092C16.3924 4.55624 19 7.4736 19 11V15.2538C20.0489 15.3307 21.0851 15.4245 22.1072 15.5347L21.8928 17.5232C18.7222 17.1813 15.4092 17 12 17C8.59081 17 5.27788 17.1813 2.10723 17.5232L1.89282 15.5347C2.91498 15.4245 3.95119 15.3307 5.00003 15.2538V11C5.00003 7.47345 7.60784 4.55599 11.0002 4.07086V2H13.0002V4.07092ZM17 15.1287V11C17 8.23858 14.7614 6 12 6C9.2386 6 7.00003 8.23858 7.00003 11V15.1287C8.64066 15.0437 10.3091 15 12 15C13.691 15 15.3594 15.0437 17 15.1287ZM8.62593 19.3712C8.66235 20.5173 10.1512 22 11.9996 22C13.848 22 15.3368 20.5173 15.3732 19.3712C15.3803 19.1489 15.1758 19 14.9533 19H9.0458C8.82333 19 8.61886 19.1489 8.62593 19.3712Z"
                fill="currentColor"
              ></path>
            </S.Svg>
          </S.IconBox>
          <S.Avatar />
        </S.HeaderActions>
      </S.HeaderBar>
    </S.Page>
  );
}