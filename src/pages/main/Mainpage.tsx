// import { useNavigate } from "react-router-dom"; //navigate() 사용할 때 주석 풀면 됑
import * as S from "./MainpageStyle";
import mainbackground from "@/assets/main-background.webp";
import Search from "../Search/Search";

type Row = {
  id: string;
  title: string;
  items: { id: string; title: string }[];
};

const rows: Row[] = [
  {
    id: "r1",
    title: "오늘 한국 Top 10",
    items: Array.from({ length: 12 }, (_, i) => ({
      id: `r1-${i}`,
      title: `콘텐츠 ${i + 1}`,
    })),
  },
  {
    id: "r2",
    title: "내가 찜한 리스트",
    items: Array.from({ length: 10 }, (_, i) => ({
      id: `r2-${i}`,
      title: `찜 ${i + 1}`,
    })),
  },
  {
    id: "r3",
    title: "시청 중인 콘텐츠",
    items: Array.from({ length: 8 }, (_, i) => ({
      id: `r3-${i}`,
      title: `시청중 ${i + 1}`,
    })),
  },
];

export default function Home(): React.JSX.Element {
  // const navigate = useNavigate(); //이것듀

  return (
    <S.Page>
      {/* 주석부분 사용 안 한다면 삭제해주세욤 */}
      {/* 헤더
      <S.HeaderBar>
        <S.Logo>
          <S.LogoImg src={logo} alt="Netflix" />
        </S.Logo>
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
          <S.IconBox aria-label="검색">
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
          </S.IconBox>
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
      </S.HeaderBar> */}
      <Search/>

      {/* 히어로(상단 큰 배너) */}
      <S.Hero>
        <S.HeroBackdrop bg={mainbackground} />
        <S.HeroGradient />
        <S.HeroContent>
          <S.HeroTitle>
            <S.TitleLogo
              src="https://occ-0-8143-64.1.nflxso.net/dnm/api/v6/LmEnxtiAuzezXBjYXPuDgfZ4zZQ/AAAABVuCD_FbNAHQG_w13eIIiTGmrkrCAFty8dPsgJuKfih5Flj8QDPYeoWK5rc-DOiclyt2FdC9FYG8M3YxwS3sENYjUCZTTtx7XkD0QdZMZN2n.webp?r=0d7"
              alt="극장판 짱구는 못말려 23기 : 나의 이사 이야기 선인장 대습격"
            />
          </S.HeroTitle>

          <S.HeroDesc>
            멕시코 지사로 발령이 난 아빠를 따라 함께 이사를 한 짱구 가족.
            무시무시한 선인장 괴물에 맞서, 짱구네 식구들의 서바이벌 승부가
            시작된다.
          </S.HeroDesc>

          <S.BtnRow>
            <S.PlayBtn>▶ 재생</S.PlayBtn>
            <S.InfoBtn>ⓘ 상세 정보</S.InfoBtn>
          </S.BtnRow>
        </S.HeroContent>
      </S.Hero>

      {/* 가로 슬라이더 영역 */}
      <S.RowSection>
        {rows.map((row) => (
          <S.Row key={row.id}>
            <S.RowTitle>{row.title}</S.RowTitle>
            <S.SliderWrapper>
              <S.ArrowLeft
                className="left"
                aria-label="left"
                onClick={() =>
                  document
                    .getElementById(row.id)
                    ?.scrollBy({ left: -600, behavior: "smooth" })
                }
              >
                ◀
              </S.ArrowLeft>
              <S.Slider id={row.id}>
                {row.items.map((it) => (
                  <S.Thumb key={it.id} title={it.title}>
                    <S.ThumbLabel>{it.title}</S.ThumbLabel>
                  </S.Thumb>
                ))}
              </S.Slider>
              <S.ArrowRight
                className="right"
                aria-label="right"
                onClick={() =>
                  document
                    .getElementById(row.id)
                    ?.scrollBy({ left: 600, behavior: "smooth" })
                }
              >
                ▶
              </S.ArrowRight>
            </S.SliderWrapper>
          </S.Row>
        ))}
      </S.RowSection>
    </S.Page>
  );
}
