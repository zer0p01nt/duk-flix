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
  bottom: 100px;
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
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;

  &:hover {
    background-color: rgba(255, 255, 255, 0.8);
  }
`;

export const ActionButton = styled.button`
  position: relative;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.7);
  background-color: rgba(42, 42, 42, 0.6);
  color: white;
  font-size: 20px;
  cursor: pointer;
  
  &:hover {
    border-color: white;
  }

  /* 👇 content 부분을 attr(data-tooltip)으로 수정했습니다. */
  &::before {
    content: attr(data-tooltip); /* 속성 값으로 툴팁 내용 가져오기 */
    position: absolute;
    bottom: calc(100% + 10px);
    left: 50%;
    transform: translateX(-50%);
    background-color: #e6e6e6;
    color: #111;
    padding: 8px 12px;
    border-radius: 4px;
    font-size: 14px;
    white-space: nowrap;
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.2s ease, visibility 0.2s ease;
    z-index: 30;
  }

  &::after {
    content: "";
    position: absolute;
    bottom: calc(100% + 5px);
    left: 50%;
    transform: translateX(-50%) rotate(45deg);
    width: 10px;
    height: 10px;
    background-color: #e6e6e6;
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.2s ease, visibility 0.2s ease;
    z-index: 29;
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