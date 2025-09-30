import styled from "styled-components";

export const MainContainer = styled.div`
  display: flex;
  align-items: center;
  width: 70vw;
  gap: 0.75rem;
`;

export const ListContainer = styled.div`
  display: flex;
  overflow-x: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }

  height: 300px;
  padding: 0.5rem 1rem;
`;

export const MovieContainer = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;
`;

export const MovieItem = styled.div<{ $posterPath: string }>`
  width: 180px;
  height: 270px;
  background-image: url(${({ $posterPath }) => $posterPath});
  background-size: cover;
  background-position: center;
  transition: all 0.2s ease-in-out;
  flex-shrink: 0;
  border-radius: 0.5rem;
  position: relative;

  &:hover {
    scale: 1.03;
    z-index: 10;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  }
`;

export const RankNumber = styled.div`
  position: absolute;
  bottom: 0.5rem;
  left: -1rem;
  z-index: 10;
  font-size: 6rem;
  font-weight: 700;
  -webkit-text-stroke: 0.1rem rgb(255, 255, 255);
  text-shadow: 0 0 1.5rem rgba(0, 0, 0, 0.5);
  -webkit-text-fill-color: rgb(0, 0, 0);
`;

// 4. 스크롤 버튼 스타일
export const ScrollButton = styled.button<{ $direction: "left" | "right" }>`
  height: 7.5rem;
  width: 1.5rem;
  border-radius: 0.5rem;
  border: none;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  padding: 0px;
  margin: 0px;
  transition: opacity 400ms ease-in-out;
  color: rgba(255, 255, 255, 0.7);
  background-color: rgba(255, 255, 255, 0.1);
  cursor: pointer;
  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
`;
