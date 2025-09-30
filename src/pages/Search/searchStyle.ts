import styled from "styled-components";

/* 페이지 & 공통 */
export const SearchPage = styled.div`
  color: #fff;
  min-height: 100dvh;
  /* display: contents; */
  background-color: #141414;
  width: 100%;
  overflow-x: hidden;
  /* display: none; */
`;

/* 헤더 */
export const HeaderSpacer = styled.div`
  height: 50px; /* 50 + 16*2 */
`;

export const HeaderBar = styled.header`
  /* position: sticky;
  width: 100%;
  height: 50px;
  top: 0;
  z-index: 50; */
  /* position: fixed; */
  position: fixed;        /* ✅ 항상 상단 고정 */
  top: 0; left: 0; right: 0;
  z-index: 1000;
  width: 100%;
  height: 50px;           /* 실제 높이: 50 + padding(16*2) = 82px */
  box-sizing: border-box; 
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 20px;
  padding: 16px 42px;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0));
`;

export const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const LogoImg = styled.img`
  height: 45px;
  width: auto;

  @media (max-width: 642px) {
    height: 30px;
      width: auto;
  }
`;

export const Nav = styled.nav`
  display: flex;
  gap: 18px;
  align-items: center;
  font-size: 14px;
  opacity: 0.95;

@media (max-width: 841px) {
  display: none;
}
`;

export const NavItem = styled.button`
  background: none;
  border: 0;
  color: #fff;
  cursor: pointer;
  padding: 6px 0;
  &:hover {
    opacity: 0.7;
  }
  font-size: clamp(8px, 1.3vw, 14px);
`;

export const HeaderActions = styled.div`
  display: flex;
  gap: 14px;
  align-items: center;
`;

export const Svg = styled.svg`
  width: 20px;
  height: 20px;
  color: #fff; /* path의 fill="currentColor"와 연결됨 */
`;

export const IconBox = styled.div`
  width: 28px;
  margin: 5px 0;
  height: 28px;
  display: grid;
  place-items: center;
  background: rgba(255, 255, 255, 0.08);
  border-radius: 999px;
  &:hover{
    cursor: pointer;
  }
`;

export const SearchIconBox = styled.div`
  width: 28px;
  margin: 5px 0;
  height: 28px;
  display: grid;
  place-items: center;
  background: rgba(255, 255, 255, 0.08);
  border-radius: 999px;
  &:hover{
    cursor: pointer;
  }
`;

export const Avatar = styled.div`
  width: 28px;
  height: 28px;
  border-radius: 30%;
  background: #9c88ff;
    &:hover{
    cursor: pointer;
  }
`;


// 검색
export const SearchBox = styled.input`
  width: 230px;
  border-radius: 0%;
  background-color: #000;
  border: none;
  color: #fff;
  outline: none;
`;

export const SearchBtn = styled.div`
  background-color: #000;
  border: 1px solid #fff;
  display: flex;
  justify-content: center;
`;

export const Searchimg = styled.div`
  width: 28px;
  margin: 5px 0;
  height: 28px;
  display: grid;
  place-items: center;
  background: rgba(255, 255, 255, 0.08);
  border-radius: 999px;
`;

export const SearchDel = styled.div`
font-size: 28px;
margin-right: 2px;
cursor: pointer;
`;


// 반응형 메뉴바
export const SearchNav = styled.div`
  font-size: clamp(8px, 2vw, 14px);
  cursor: pointer;
`;

export const Dropdown = styled.div`
    position: absolute;
    background-color: rgba(0, 0, 0, 0.54);
    border: 1px solid hsla(0, 0%, 100%, .15);
    box-sizing: border-box;
    cursor: pointer;
    font-size: 13px;
    line-height: 21px;
    text-align: center;
margin-left: -86px;
    border-top: 2px solid  #e5e5e5;

    width: 200px;
        top: 90px;
`;

export const Ul = styled.ul`
display: none;
@media (max-width: 841px) {
  display: block;
}
`;
export const Li = styled.li`
    display: list-item;
    unicode-bidi: isolate;
`;
export const DropdownUl = styled.ul`

`;
export const DropdownLi = styled.li`
padding: 15px 0;
&:hover{
  background-color:  rgba(71, 71, 71, 0.17);
}
`;

export const DropdownIcon = styled.div`
    border: 7px solid transparent;
    border-bottom-color: #e5e5e5;
    height: 0;
    left: 50%;
    margin-left: -7px;
    position: absolute;
    top: -16px;
    width: 0;
`;
// 헤더끝


// 메인 공통
export const main = styled.div`
margin-top: 30px`;

// 추천
export const RecommendBox = styled.div`
display: flex;
margin: 20px 30px 0 50px;
`;
export const RecommendTitle = styled.div`
  font-size: clamp(14px, 1.2vw, 16px);
  color: rgba(255, 255, 255, 0.5);
  white-space: nowrap;
`;
export const Recommend = styled.div`
margin-left: 10px;
display: flex;
    flex-flow: wrap;
gap: 10px;
width: 100%;
`;
export const RecommendIcon = styled.div`
  font-size: clamp(14px, 1.2vw, 17px);
  border-right: 1px solid  rgba(255, 255, 255, 0.5);
  padding-right: 10px;
  &:last-child {
    border-right: none;
    padding-left: 0;
  }
  cursor: pointer;
  &:hover{
    color: red;
  }
`;


// 추천 영화
export const ReMovie = styled.div`
margin-top: 30px;
  display: flex;
  flex-direction: column;
`;

export const MovieGrid = styled.div`
  display: grid;
  gap: 12px;
  margin: 0 60px;

/* 2 */
  grid-template-columns: repeat(2, minmax(0, 1fr));

/* 개수 조정 */
  @media (min-width: 700px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
  @media (min-width: 1000px) {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
  @media (min-width: 1300px) {
    grid-template-columns: repeat(5, minmax(0, 1fr));
  }
`;

export const Movie = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: 6px;
  aspect-ratio: 16 / 10;
  background: #111;
`;

/* 링크(카드 전체 클릭) */
export const MovieLink = styled.a`
  display: block;
  width: 100%;
  height: 100%;
`;

/* 포스터 이미지 */
export const Poster = styled.img`
  width: 100%;
  height: 100%;
  display: block;
  transition: transform 0.2s ease;
  &:hover {
    transform: scale(1.05);
  }
`;


// 결과 없음 페이지
export const text = styled.div`
text-align: center;
margin-top: 60px;
`;

export const NoSearch = styled.div`
display: inline-block;
text-align: left;
`;

export const NoSearchTitle = styled.div`
`;
export const ReSearch = styled.div`
margin: 13px 0;
`;
export const ReSearchUl = styled.ul`
margin-left: 40px;
`;
export const ReSearchLi = styled.li`
list-style-type: disc;
`;


// 
export const ReOther = styled.div`
font-size: 23px;
margin: 0 54px 10px 54px;
`;