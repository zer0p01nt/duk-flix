import { theme } from "@/styles/theme";
import styled from "styled-components";

export const Container = styled.div`
  background: ${theme.color.black};
  width: 100%;
`;

export const MainContainer = styled.div`
  padding: 0 2.625rem;
  display: flex;
  flex-direction: column;
  gap: 5rem;
  min-height: 90dvh;
  width: 100%;
`;

export const Title = styled.div`
  font-size: 1.5rem;
  color: ${theme.color.white};
`;

export const Empty = styled.div`
  color: #666;
  font-size: 1.125rem;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 100px;
`;

export const Wrapper = styled.div`
  display: grid;
  grid-auto-flow: row;
  grid-auto-columns: unset;
  overflow-x: hidden;
  scrollbar-width: none;
  grid-template-columns: repeat(auto-fill, minmax(140px, 260px));
  gap: 15px;
  padding-bottom: 50px;

  a {
    display: block;
    height: 0;
    padding-bottom: 56.25%;
    position: relative;
  }
`;
