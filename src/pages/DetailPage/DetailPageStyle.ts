import styled, { keyframes } from "styled-components";

export const Overlay = styled.div`
  position: fixed; top: 0; left: 0; width: 100%; height: 100%;
  background-color: rgba(0, 0, 0, 0.7); display: flex;
  justify-content: center; align-items: center; z-index: 1000;
`;
export const ModalContainer = styled.div`
  width: 90%; max-width: 850px; background-color: #181818;
  border-radius: 8px; overflow: visible;
  position: relative;
`;
export const CloseButton = styled.button`
  position: absolute; top: 16px; right: 16px; background: #181818;
  border-radius: 50%; border: none; color: white; width: 36px;
  height: 36px; font-size: 24px; cursor: pointer; z-index: 20;
  display: flex; justify-content: center; align-items: center;
`;
export const BackdropContainer = styled.div`
  position: relative; width: 100%; padding-top: 56.25%;
`;
export const BackdropImage = styled.img`
  position: absolute; top: 0; left: 0; width: 100%; height: 100%;
  object-fit: cover;
`;
export const TrailerPlayer = styled.iframe`
  position: absolute; top: 0; left: 0; width: 100%; height: 100%;
  border: none;
`;
export const BackdropGradient = styled.div`
  position: absolute; bottom: 0; left: 0; width: 100%; height: 50%;
  background: linear-gradient(to top, #181818 20%, transparent); z-index: 5;
`;
export const Title = styled.h1`
  position: absolute; bottom: 110px; left: 50px; font-size: 36px;
  color: white; z-index: 10; margin: 0;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
`;
export const ActionButtons = styled.div`
  position: absolute; bottom: 40px; left: 50px; display: flex;
  gap: 8px; align-items: center; z-index: 10;
`;
export const PlayButton = styled.a`
  padding: 0 24px 0 20px; height: 40.5px; border-radius: 4px; border: none;
  background-color: white; color: black; font-size: 16px; font-weight: 600;
  cursor: pointer; display: flex; align-items: center; gap: 10px;
  text-decoration: none;
  &:hover { background-color: rgba(255, 255, 255, 0.8); }
  &::before { content: "▶"; font-size: 24px; }
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
  &:hover { border-color: white; }
  svg { width: 100%; height: 100%; }
`;
export const RatingMenu = styled.div`
  position: absolute; bottom: 0; left: 50%; transform: translateX(-50%);
  display: flex; align-items: center; background-color: #232323;
  border-radius: 30px; padding: 8px; gap: 8px; opacity: 0; visibility: hidden;
  transition: all 0.2s ease; pointer-events: none;
`;
export const CloseRatingButton = styled(ActionButton)`
  position: absolute; top: 55px; left: 50%; transform: translateX(-50%);
  font-size: 14px; opacity: 0; visibility: hidden; transition: all 0.2s ease;
  pointer-events: none;
`;
export const RatingContainer = styled.div<{ $isOpen: boolean }>`
  position: relative; width: 38.46px; height: 38.46px;
  & > ${ActionButton} { transition: all 0.2s ease; }
  ${({ $isOpen }) => $isOpen && `
    & > ${ActionButton} { opacity: 0; visibility: hidden; }
    & > ${RatingMenu}, & > ${CloseRatingButton} { opacity: 1; visibility: visible; pointer-events: auto; }
  `}
`;
export const RatingOption = styled(ActionButton)`
  padding: 8.112px;
  border: none;
  background-color: transparent;
  width: 38.46px; height: 38.46px;
  &:hover { background-color: rgba(255, 255, 255, 0.2); }
  svg { width: 18.25px; height: 18.25px; }

  /* 👇 사라졌던 툴팁 스타일을 다시 추가했습니다. */
  &::before {
    content: attr(data-tooltip);
    position: absolute;
    bottom: calc(100% + 12px);
    left: 50%;
    transform: translateX(-50%);
    background-color: #fff;
    color: #181818;
    padding: 7px 12px;
    border-radius: 4px;
    font-size: 16px;
    font-weight: 700;
    white-space: nowrap;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.35);
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.2s ease;
    z-index: 30;
  }
  &::after {
    content: "";
    position: absolute;
    bottom: calc(100% + 6px);
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-top: 6px solid #fff;
    filter: drop-shadow(0 -1px 1px rgba(0, 0, 0, 0.1));
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.2s ease;
    z-index: 31;
  }
  &:hover::before,
  &:hover::after {
    opacity: 1;
    visibility: visible;
  }
`;
export const VolumeControl = styled(ActionButton)`
  position: absolute; right: 50px; bottom: 40px; z-index: 10;
`;
const particleAnimation = keyframes`
  0% { transform: scale(0.3) translate(-50%, -50%); opacity: 1; }
  100% { transform: scale(2) translate(-50%, -50%); opacity: 0; }
`;
export const ParticleEffect = styled.div`
  position: absolute; top: 50%; left: 50%; width: 100px; height: 100px;
  transform: translate(-50%, -50%); pointer-events: none;
  &::before, &::after {
    content: '✨'; position: absolute; font-size: 20px; opacity: 0;
    animation: ${particleAnimation} 0.8s ease-out forwards;
  }
  &::before { top: 20%; left: 20%; }
  &::after {
    top: 60%; left: 70%; font-size: 30px; animation-delay: 0.1s;
  }
`;
export const Content = styled.div`
  padding: 20px 50px 40px; display: flex; gap: 30px;
`;
export const MetaContainer = styled.div` flex: 2; `;
export const InfoContainer = styled.div` flex: 1; `;
export const Details = styled.div`
  display: flex; align-items: center; gap: 16px; margin-bottom: 20px;
  color: #a3a3a3; font-weight: bold; white-space: nowrap;
`;
export const HDTag = styled.span`
  border: 1px solid rgba(255, 255, 255, 0.7); padding: 0px 6px;
  border-radius: 4px; font-size: 14px;
`;
export const Overview = styled.p`
  font-size: 16px; line-height: 1.6; color: #fff; margin: 0;
`;