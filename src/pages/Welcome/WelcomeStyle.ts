import styled, { css } from "styled-components";
import background from "@/assets/welcome-background.jpg";
import logo from "@/assets/Netflix_Logo_RGB.png";
import { theme } from "@/styles/theme";
import { media } from "@/styles/media";

export const MainContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: #000;
`;

export const HeaderContainer = styled.div`
  width: 100%;
  height: 90vh;
  background-image: url(${background});
  background-size: cover;
  min-height: 31rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: ${theme.color.white};
  position: relative;
  padding-bottom: 10vh;
`;

export const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${theme.color.black};
  mix-blend-mode: color-burn;
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
  padding: 10px 2.625rem;
  ${media.mobile`
    padding: 10px 1.5rem;
  `}
`;

export const Logo = styled.button`
  width: 200px;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url(${logo});
  background-size: cover;
  background-repeat: no-repeat;
  background-color: transparent;
  border: none;
  cursor: pointer;
  ${media.tablet`
    width: 100px;
    height: 45px;
  `}
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
  color: ${theme.color.white};
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  z-index: 10;
  gap: 1rem;
  padding: 0 1.5rem;
`;

export const CenterTitle = styled.div`
  font-size: 3.5rem;
  font-weight: 900;
  max-width: 450px;
  ${media.laptop`
    font-size: 2.5rem;
    font-weight: 700;
    max-width: 1280px;
      `}
  ${media.tablet`
    font-size: 2rem;
    font-weight: 700;
    max-width: 1280px;
      `}
`;

export const CenterText = styled.div`
  font-size: 1.25rem;
  font-weight: 500;
  ${media.laptop`
    font-size: 1rem;
    font-weight: 400;
      `}
`;

export const FormText = styled.div`
  font-size: 1rem;
  margin-top: 1rem;
`;

export const CenterFormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;

export const Form = styled.form`
  display: flex;
  gap: 0.5rem;
  height: 100%;
  align-items: flex-start;
  width: 50vw;
  max-width: 37.5rem;
`;

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex: 1 1 auto;
  gap: 0.5rem;
`;

export const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;

  gap: 0.5rem;
  /* 일단은 이렇게 - 더 나은 방법이 있나 찾아보기 */
  height: 58px;
  background-color: ${theme.color.primary};
  color: ${theme.color.white};
  font-size: 1.125rem;
  font-weight: 500;
  border-radius: 4px;
  border: none;
  padding: 0.75rem 1.5rem;
  white-space: nowrap;
  transition: background-color 0.25s cubic-bezier(0.4, 0, 0.68, 0.06);

  &:hover {
    background-color: ${theme.color.primaryHover};
  }
`;

export const Curve = styled.div`
  width: 100%;
  height: 5rem;
  position: absolute;
  bottom: 0;
  left: 0;
  overflow: hidden;
  z-index: 10;
  background: none;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: -50%;
    right: -50%;
    bottom: -500px;
    border-radius: 50% / 300px;
    border: 5px solid transparent;
    background-image: linear-gradient(#000, #000),
      linear-gradient(
        to right,
        rgba(33, 13, 22, 1) 16%,
        rgba(184, 40, 105, 1),
        rgba(229, 9, 20, 1),
        rgba(184, 40, 105, 1),
        rgba(33, 13, 22, 1) 84%
      );
    background-origin: border-box;
    background-clip: content-box, border-box;
    background-origin: border-box;
    background-clip: content-box, border-box;
  }
`;

export const CurveInner = styled.div`
  box-sizing: border-box;
  position: absolute;
  width: 100%;
  height: 5rem;
  top: 5px;
  display: flex;
  align-items: center;
  border-top-left-radius: 50% 100%;
  border-top-right-radius: 50% 100%;
  background: radial-gradient(
      50% 500% at 50% -420%,
      rgba(64, 97, 231, 0.4) 80%,
      rgba(0, 0, 0, 0.1) 100%
    ),
    black;
  background-clip: padding-box;
`;

export const Main = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 4rem;
  color: ${theme.color.white};
  width: 100%;
  padding: 0 1.5rem 4rem;
`;

export const PopCornWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 70vw;
  gap: 1rem;
  transition: all 0.5s cubic-bezier(0.33, 0, 0, 1);

  &:hover {
    scale: 1.03;
  }
`;

export const PopCornBox = styled.div`
  padding: 1rem 1.5rem;
  border-radius: 1rem;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: linear-gradient(91deg, #261733, #151a3f);
  transition: all 0.5s cubic-bezier(0.33, 0, 0, 1);

  &:hover {
    background: linear-gradient(91deg, #482566 0%, #161d52 99.51%);
  }
`;

export const PopCornTextBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.25rem;
`;

export const PopCornTitle = styled.div`
  font-size: 1.25rem;
  font-weight: 500;
`;

export const PopCornText = styled.div`
  font-size: 1rem;
  font-weight: 400;
`;

export const PopCornBtn = styled.button`
  background-color: rgba(128, 128, 128, 0.4);
  border: none;
  border-radius: 0.25rem;
  padding: 0.375rem 1rem;
  color: ${theme.color.white};
  font-size: 1rem;
  font-weight: 500;
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 70vw;
  gap: 1rem;
`;

export const ContentTitle = styled.div`
  font-size: 2rem;
  font-weight: 700;
  align-self: flex-start;
  ${media.laptop`
      font-size: 1.5rem;
      font-weight: 500;
  `}
`;

export const ReasonContainer = styled.div`
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(4, 1fr);

  ${media.laptop`
    grid-template-columns: repeat(2, 1fr);
  `}
  ${media.tablet`
    grid-template-columns: none;
    grid-template-rows: repeat(4, 1fr);
  `}
`;

export const ReasonBox = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 1rem;
  padding: 1.5rem 1rem;
  border-radius: 0.5rem;
  background: linear-gradient(149deg, #192247 0%, #210e17 99.08%);

  & > svg {
    align-self: flex-end;
  }
`;

export const ReasonTitle = styled.div`
  font-size: 1.5rem;
  font-weight: 500;
  ${media.laptop`
    font-size: 1.25rem;
  `}
`;

export const ReasonText = styled.div`
  color: ${theme.color.lightgray};
  font-size: 1rem;
  font-weight: 400;
`;

export const FAQContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
`;

export const FAQWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.1rem;
  width: 100%;
`;

export const FAQBox = styled.button<{ $isOpen: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  background-color: rgb(45, 45, 45);
  color: ${theme.color.white};
  transition: background-color 250ms cubic-bezier(0.32, 0.94, 0.6, 0.1);
  cursor: pointer;
  font-size: 1.5rem;
  border: none;
  padding: 1.5rem;
  gap: 1rem;

  &:hover {
    background-color: rgb(65, 65, 65);
  }
  ${media.laptop`
    font-size: 1.125rem;
  `}

  ${({ $isOpen }) =>
    $isOpen &&
    css`
      svg {
        transform: rotate(-45deg);
      }
    `}
`;

export const FAQContent = styled.div<{ $isOpen: boolean }>`
  width: 100%;
  background-color: rgb(45, 45, 45);
  flex-direction: column;
  justify-content: center;
  gap: 1.5rem;
  font-size: 1.125rem;

  transition: all 200ms cubic-bezier(0.32, 0.94, 0.6, 0.1);
  overflow: hidden;

  ${({ $isOpen }) =>
    $isOpen
      ? css`
          max-height: 500px;
          padding: 1.5rem;
          opacity: 1;
        `
      : css`
          max-height: 0;
          padding: 0 1.5rem;
          opacity: 0;
        `}

  ${media.laptop`
    font-size: 1rem;
  `}

  & > a {
    color: ${theme.color.white};
    font-size: 1.125rem;
    ${media.laptop`
      font-size: 1rem;
    `}
  }
`;
