import { theme } from "@/styles/theme";
import styled from "styled-components";

// 페이지
export const Page = styled.div`
  background: ${theme.color.black};
`;

export const Svg = styled.svg`
  width: 20px;
  height: 20px;
  color: #fff;
`;

// 히어로
export const Hero = styled.section`
  position: relative;
  height: clamp(380px, 46vw, 720px);
  overflow: hidden;
  margin-top: -66px;
`;
export const HeroBackdrop = styled.div<{ $bg: string }>`
  position: absolute;
  inset: 0;
  background: ${({ $bg }) => `url(${$bg}) center/cover no-repeat`};
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
  text-decoration: none;
`;
export const InfoBtn = styled(PlayBtn)`
  background: rgba(109, 109, 110, 0.7);
  color: #fff;
`;
export const ActionButton = styled.button`
  position: relative;
  width: 38.46px;
  height: 38.46px;
  padding: 8.112px;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.7);
  background-color: rgba(42, 42, 42, 0.6);
  color: white;
  font-size: 20px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    border-color: white;
  }
  svg {
    width: 100%;
    height: 100%;
  }
`;

export const VolumeControl = styled(ActionButton)`
  position: absolute;
  right: 4vw;
  bottom: 8vw;
  z-index: 10;
`;
// 슬라이더
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
  color: #fff;
`;
export const SliderWrapper = styled.div`
  position: relative;
  overflow: hidden;
  padding: 0 6px;
`;
export const Slider = styled.div`
  position: relative;
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: clamp(140px, 18vw, 260px);
  gap: 8px;
  overflow-x: auto;
  overflow-y: hidden;
  scroll-behavior: smooth;
  padding-bottom: 6px;

  &::-webkit-scrollbar {
    height: 0;
  }
  scrollbar-width: none;
`;
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
`;
export const ArrowRight = styled(ArrowLeft)`
  left: auto;
  right: 8px;
`;

// 썸네일
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
`;
export const ThumbLabel = styled.div`
  position: absolute;
  left: 8px;
  bottom: 8px;
  font-size: 12px;
  color: #fff;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.7);
`;

// Top10
export const RankItem = styled.div`
  position: relative;
  display: flex;
  align-items: flex-end;
  padding-left: clamp(90px, 12vw, 180px);
`;
export const RankSvg = styled.svg`
  position: absolute;
  top: 60%;
  right: 55px;
  transform: translateY(-50%);
  width: clamp(90px, 12vw, 180px);
  overflow: visible;
  pointer-events: none;
  z-index: 0;
`;
export const RankText = styled.text`
  font-weight: 900;
  font-family: system-ui, -apple-system, "Segoe UI", Roboto, "Noto Sans KR",
    Arial, sans-serif;
  fill: transparent;
  stroke: #a0a4ab;
  stroke-width: 10;
  stroke-linejoin: round;
  stroke-linecap: round;
  paint-order: stroke;
  opacity: 0.35;
  user-select: none;
  shape-rendering: geometricPrecision;
`;
export const PosterThumb = styled(Thumb)`
  aspect-ratio: 2 / 3; /* 세로 포스터 */
  border-radius: 8px;
`;
