import styled from "styled-components";

/* 페이지 & 공통 */
export const Page = styled.div`
  background:#141414;
  /*
  color: #fff;
  min-height: 100dvh;
  width: 100%;
  overflow-x: hidden; */
`;

// /* 헤더 */
// export const HeaderBar = styled.header`
//   position: sticky;
//   top: 0;
//   z-index: 50;
//   display: grid;
//   grid-template-columns: auto 1fr auto;
//   align-items: center;
//   gap: 16px;
//   padding: 16px 32px;
//   background: linear-gradient(180deg, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0));
// `;

// export const Logo = styled.div`
//   display: flex;
//   align-items: center;
//   gap: 8px;
// `;

// export const LogoImg = styled.img`
//   height: 26px;
//   width: auto;
// `;

// export const Nav = styled.nav`
//   display: flex;
//   gap: 18px;
//   align-items: center;
//   font-size: 14px;
//   opacity: 0.95;
// `;

// export const NavItem = styled.button`
//   background: none;
//   border: 0;
//   color: #fff;
//   cursor: pointer;
//   padding: 6px 0;
//   &:hover {
//     opacity: 0.7;
//   }
// `;

// export const HeaderActions = styled.div`
//   display: flex;
//   gap: 14px;
//   align-items: center;
// `;

// export const Svg = styled.svg`
//   width: 20px;
//   height: 20px;
//   color: #fff; /* path의 fill="currentColor"와 연결됨 */
// `;

// export const IconBox = styled.div`
//   width: 28px;
//   height: 28px;
//   display: grid;
//   place-items: center;
//   background: rgba(255, 255, 255, 0.08);
//   border-radius: 999px;
// `;

// export const Avatar = styled.div`
//   width: 28px;
//   height: 28px;
//   border-radius: 50%;
//   background: #9c88ff;
// `;

/* 히어로 */
export const Hero = styled.section`
  position: relative;
  height: clamp(380px, 46vw, 720px);
  overflow: hidden;
`;

export const HeroBackdrop = styled.div<{ bg: string }>`
  position: absolute;
  inset: 0;
  background: ${({ bg }) => `url(${bg}) center/cover no-repeat`};
  filter: brightness(0.95);
`;

export const HeroGradient = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
      180deg,
      rgba(0, 0, 0, 0.75) 0%,
      rgba(0, 0, 0, 0) 14%
    ),
    linear-gradient(0deg, rgba(0, 0, 0, 0.92) 0%, rgba(0, 0, 0, 0) 32%);
`;

export const HeroContent = styled.div`
  position: relative;
  z-index: 1;
  max-width: 720px;
  padding: 8vw 4vw;
  display: grid;
  gap: 16px;
`;

export const HeroTitle = styled.h1`
  margin: 0;
`;
export const TitleLogo = styled.img`
  width: clamp(220px, 34vw, 520px);
  height: auto;
  object-fit: contain;
  filter: drop-shadow(0 2px 10px rgba(0, 0, 0, 0.6));
`;

export const HeroDesc = styled.p`
  font-size: clamp(14px, 1.4vw, 18px);
  color: #ddd;
  margin: 0;
  max-width: 56ch;
  width: 360px;
`;

export const BtnRow = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 8px;
`;

export const PlayBtn = styled.button`
  padding: 10px 16px;
  border-radius: 4px;
  border: 0;
  background: #fff;
  color: #000;
  font-weight: 700;
  cursor: pointer;
`;
export const InfoBtn = styled(PlayBtn)`
  background: rgba(109, 109, 110, 0.7);
  color: #fff;
`;

/* 가로 슬라이더 */
export const RowSection = styled.section`
  display: grid;
  gap: 26px;
  padding: 24px 24px 56px;
`;

export const Row = styled.div`
  display: grid;
  gap: 10px;
`;

export const RowTitle = styled.h2`
  font-size: 18px;
  margin: 0 2px;
`;

export const SliderWrapper = styled.div`
  position: relative;
`;

export const Slider = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: clamp(140px, 18vw, 260px);
  gap: 8px;
  overflow-x: auto;
  padding-bottom: 6px;

  &::-webkit-scrollbar {
    height: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.25);
    border-radius: 999px;
  }
`;

export const ArrowLeft = styled.button`
  position: absolute;
  top: 40%;
  left: 0;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.5);
  border: none;
  color: white;
  font-size: 24px;
  cursor: pointer;
  z-index: 2;
`;

export const ArrowRight = styled(ArrowLeft)`
  left: auto;
  right: 0;
`;

export const Thumb = styled.div`
  position: relative;
  aspect-ratio: 16/9;
  background: #222;
  border-radius: 6px;
  overflow: hidden;
  cursor: pointer;

  &:hover::after {
    content: "";
    position: absolute;
    inset: 0;
    box-shadow: inset 0 0 0 2px #fff3;
  }
`;

export const ThumbLabel = styled.div`
  position: absolute;
  left: 8px;
  bottom: 8px;
  font-size: 12px;
  color: #fff;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.7);
`;
