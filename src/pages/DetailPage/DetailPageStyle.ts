import styled from "styled-components";

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const ModalContainer = styled.div`
  width: 90%;
  max-width: 850px;
  background-color: #181818;
  border-radius: 8px;
  overflow: hidden;
  position: relative;
  max-height: 90vh;
  overflow-y: auto;
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  background: #181818;
  border-radius: 50%;
  border: none;
  color: white;
  width: 36px;
  height: 36px;
  font-size: 24px;
  cursor: pointer;
  z-index: 20;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const BackdropContainer = styled.div`
  position: relative;
  width: 100%;
  padding-top: 56.25%; /* 16:9 비율 */
`;

export const BackdropImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const BackdropGradient = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 50%;
  background: linear-gradient(to top, #181818 20%, transparent);
  z-index: 5;
`;

export const Title = styled.h1`
  position: absolute;
  bottom: 110px;
  left: 50px;
  font-size: 36px;
  color: white;
  z-index: 10;
  margin: 0;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
`;

export const ActionButtons = styled.div`
  position: absolute;
  bottom: 40px;
  left: 50px;
  display: flex;
  gap: 10px;
  align-items: center;
  z-index: 10;
`;

export const PlayButton = styled.button`
  padding: 8px 24px;
  border-radius: 4px;
  border: none;
  background-color: white;
  color: black;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;

  &:hover {
    background-color: rgba(255, 255, 255, 0.8);
  }
`;

export const ActionButton = styled.button`
  position: relative;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.7);
  background-color: rgba(42, 42, 42, 0.6);
  color: white;
  font-size: 24px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  
  &:hover {
    border-color: white;
  }
  
  svg {
    width: 22px;
    height: 22px;
  }
`;

export const RatingMenu = styled.div`
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  background-color: #2a2a2a;
  border-radius: 30px;
  padding: 8px 12px;
  gap: 12px;
  
  opacity: 0;
  visibility: hidden;
  transition: all 0.2s ease;
  pointer-events: none;
`;

export const CloseRatingButton = styled(ActionButton)`
  position: absolute;
  top: 60px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 16px;
  
  opacity: 0;
  visibility: hidden;
  transition: all 0.2s ease;
  pointer-events: none;
`;

export const RatingContainer = styled.div<{ $isOpen: boolean }>`
  position: relative;
  width: 44px;
  height: 44px;

  & > ${ActionButton} {
    transition: all 0.2s ease;
  }
  
  ${({ $isOpen }) => $isOpen && `
    & > ${ActionButton} {
      opacity: 0;
      visibility: hidden;
    }
    & > ${RatingMenu}, & > ${CloseRatingButton} {
      opacity: 1;
      visibility: visible;
      pointer-events: auto;
    }
  `}
`;

export const RatingOption = styled(ActionButton)`
  width: 42px;
  height: 42px;
  border: none;
  background-color: transparent;

  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }

  svg {
    width: 24px;
    height: 24px;
  }

  &::before {
    content: attr(data-tooltip);
    position: absolute;
    bottom: calc(100% + 10px);
    left: 50%;
    transform: translateX(-50%);
    background-color: #e6e6e6;
    color: #111;
    padding: 8px 12px;
    border-radius: 4px;
    font-size: 15px;
    font-weight: 500;
    white-space: nowrap;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.2s ease, visibility 0.2s ease;
  }
  
  &::after {
    content: "";
    position: absolute;
    bottom: calc(100% + 4px);
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-top: 6px solid #e6e6e6;
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.2s ease, visibility 0.2s ease;
  }
  
  &:hover::before,
  &:hover::after {
    opacity: 1;
    visibility: visible;
  }
`;

export const Content = styled.div`
  padding: 20px 50px 40px;
  display: flex;
  gap: 30px;
`;

export const MetaContainer = styled.div`
  flex: 2;
`;

export const InfoContainer = styled.div`
  flex: 1;
`;

export const Details = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 20px;
  color: #a3a3a3;
  font-weight: bold;
  white-space: nowrap;
`;

export const HDTag = styled.span`
  border: 1px solid rgba(255, 255, 255, 0.7);
  padding: 0px 6px;
  border-radius: 4px;
  font-size: 14px;
`;

export const Overview = styled.p`
  font-size: 16px;
  line-height: 1.6;
  color: #fff;
  margin: 0;
`;