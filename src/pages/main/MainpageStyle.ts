import styled from "styled-components";


/* 페이지 & 공통 */
export const Page = styled.div`
  background:#141414;
  /*
  color: #fff;
  min-height: 100dvh;
  width: 100%;
  overflow-x: hidden;*/
`;

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

// 가로슬라이더
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
  overflow: hidden;
  padding: 0 6px;
`;

export const Slider = styled.div`
  position: relative;
  z-index: 1;
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: clamp(140px, 18vw, 260px);
  gap: 8px;
  overflow-x: auto;
  scroll-behavior: smooth;
  padding-bottom: 6px;

  &::-webkit-scrollbar {
    height: 0;
  }
  scrollbar-width: none;
`;

/* 화살표 버튼 */
const hoverSelector = `
  ${SliderWrapper}:hover & { opacity: 1; }
`;

export const ArrowLeft = styled.button`
  position: absolute;
  top: 50%;
  left: 8px;
  transform: translateY(-50%);
  width: 44px;
  height: 115px;
  border: none;
  border-radius: 6px;
  display: grid;
  place-items: center;
  color: #fff;
  background: rgba(0, 0, 0, 0.45);
  cursor: pointer;
  z-index: 2;
  opacity: 0;
  transition: opacity 0.2s ease;
  ${hoverSelector}

  &:focus-visible {
    outline: 2px solid #fff;
    outline-offset: 2px;
    opacity: 1;
  }
`;

export const ArrowRight = styled(ArrowLeft)`
  left: auto;
  right: 8px;
`;

/* 썸네일: 배경 이미지를 바로 씌우는 버튼 형태 */
export const Thumb = styled.button<{ $bg: string }>`
  position: relative;
  aspect-ratio: 16 / 9;
  width: 100%;
  border: 0;
  border-radius: 6px;
  overflow: hidden;
  cursor: pointer;
  background: ${({ $bg }) =>
    $bg ? `url(${$bg}) center / cover no-repeat` : "#222"};

  &:hover::after {
    content: "";
    position: absolute;
    inset: 0;
    box-shadow: inset 0 0 0 2px #fff3;
  }

  &:focus-visible {
    outline: 2px solid #fff;
    outline-offset: 2px;
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
