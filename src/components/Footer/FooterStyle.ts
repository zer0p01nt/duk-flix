import { media } from "@/styles/media";
import { theme } from "@/styles/theme";
import styled, { css } from "styled-components";
import type { FooterProps } from "./Footer";
import { LangSelect } from "@/pages/Welcome/WelcomeStyle";

export const MainContainer = styled.footer<FooterProps>`
  width: 100%;
  padding: 2rem 9rem;
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 1.5rem;

  ${media.tablet`
      padding: 2rem 1.5rem;
  `}

  ${({ $isSignUp, $isWelcome }) =>
    $isSignUp
      ? css`
          border-top: 1px solid ${theme.color.signUpGray};
          background-color: rgb(243, 243, 243);
          color: rgb(115, 115, 115);

          ${Link}, ${TextBtn}, ${LangSelect} {
            color: rgb(115, 115, 115);
          }
          ${Link} {
            text-decoration-line: none;
            font-size: 0.8125rem;
          }
          ${LangSelect} {
            background-color: ${theme.color.white};
          }
        `
      : $isWelcome
      ? css`
          border-top: none;
          background-color: #000;
          color: ${theme.color.lightgray};

          ${Link}, ${TextBtn}, ${LangSelect} {
            color: ${theme.color.lightgray};
          }
        `
      : css`
          border-top: 1px solid rgb(35, 35, 35);
          background-color: rgb(22, 22, 22);
          color: ${theme.color.lightgray};

          ${Link}, ${TextBtn}, ${LangSelect} {
            color: ${theme.color.lightgray};
          }
        `}
`;

export const LinkBox = styled.ul<{ $isWelcome: boolean }>`
  width: 100%;
  gap: 1rem;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  align-items: center;

  ${({ $isWelcome }) =>
    $isWelcome
      ? css`
          ${media.tablet`
            grid-template-columns: repeat(3, 1fr);
          `}
          ${media.mobile`
            grid-template-columns: repeat(2, 1fr);
          `}
        `
      : css`
          ${media.tablet`
            grid-template-columns: repeat(2, 1fr);
          `}
        `}
`;

export const Link = styled.a`
  font-size: 0.875rem;
`;

export const Text = styled.div`
  font-size: 0.75rem;
`;

export const TextBtn = styled.a`
  text-decoration-line: none;
  font-size: 0.75rem;
`;
