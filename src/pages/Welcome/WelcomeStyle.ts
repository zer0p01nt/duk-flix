import styled from "styled-components";
import background from "@/assets/welcome-background.jpg";
import logo from "@/assets/Netflix_Logo_RGB.png";
import { theme } from "@/styles/theme";

export const MainContainer = styled.div`
  width: 100%;
  height: 1000px;
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: #000;
`;

export const HeaderContainer = styled.div`
  width: 100%;
  height: 664px;
  background-image: url(${background});
  background-size: cover;
  padding: 0 5rem;
  min-height: 31rem;
  display: flex;
  align-items: center;
  flex-direction: column;
  color: ${theme.color.white};
  position: relative;
`;

export const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${theme.color.black};
  /* mix-blend-mode: color-burn; */
  opacity: 0.7;
  z-index: 1;
`;

export const WelcomeHeader = styled.header`
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 10;
`;

export const Logo = styled.div`
  width: 200px;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url(${logo});
  background-size: cover;
  background-repeat: no-repeat;
`;

export const Console = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const LangSelect = styled.select`
  background: none;
  border-radius: 4px;
  padding: 0.375rem;
  color: ${theme.color.white};
  font-size: 1rem;
`;

export const LangOption = styled.option`
  color: ${theme.color.black};
`;

export const LoginButton = styled.button`
  background-color: ${theme.color.primary};
  color: ${theme.color.white};
  border: none;
  border-radius: 4px;
  padding: 0.375rem 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  transition: background-color 0.25s cubic-bezier(0.4, 0, 0.68, 0.06);

  &:hover {
    background-color: ${theme.color.primaryHover};
  }
`;

export const CenterBox = styled.div`
  width: 100%;
  height: 464px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 10;
`;

export const CenterTitle = styled.div`
  color: ${theme.color.white};
  font-size: 2rem;
  font-weight: 700;
`;
