import styled from "styled-components";
import background from "@/assets/welcome-background.jpg";
import { theme } from "@/styles/theme";

export const Background = styled.div`
  width: 100%;
  height: 90vh;
  min-height: 31rem;
  background-image: url(${background});
  background-size: cover;
  padding: 0 1rem;
  position: relative;
  display: flex;
  align-items: center;
  flex-direction: column;
  color: ${theme.color.white};
`;

export const LoginContainer = styled.div`
  background-color: rgba(0, 0, 0, 0.6);
  max-width: 480px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1 1 0%;
  z-index: 100;
  padding: 4rem;
  margin-bottom: 4rem;
  gap: 3rem;
`;

export const Title = styled.div`
  color: ${theme.color.white};
  font-size: 2rem;
  font-weight: 700;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  width: 100%;
`;

export const ErrorBox = styled.div`
  background-color: rgb(216, 157, 49);
  color: ${theme.color.black};
  width: 100%;
  padding: 1rem;
  border-radius: 4px;
  font-size: 1rem;
`;

export const InputBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const Input = styled.input<{ $isBorderRed: boolean; $isLogin: boolean }>`
  width: 100%;
  padding: 1rem;
  background: none;
  caret-color: ${({ $isLogin }) => ($isLogin ? "#FFF" : "#000")};
  line-height: 1.5;
  font-size: 1rem;
  color: ${({ $isLogin }) => ($isLogin ? "#FFF" : "#000")};
  border-radius: 4px;
  border: ${({ $isBorderRed, $isLogin }) =>
    $isBorderRed
      ? $isLogin
        ? `1px solid ${theme.color.red}`
        : `1px solid ${theme.color.primaryHover}`
      : `1px solid ${theme.color.gray}`};
  outline-offset: 3px;

  &::placeholder {
    color: ${({ $isLogin }) => ($isLogin ? "#b7b7b8" : "#4C4C4C")};
  }
`;

export const ErrorMsg = styled.div<{ $isLogin: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 3px;
  align-self: flex-start;
  color: ${({ $isLogin }) =>
    $isLogin ? `${theme.color.red}` : `${theme.color.primaryHover}`};
  font-size: 0.8125rem;
`;

export const Btn = styled.button`
  width: 100%;
  background-color: ${theme.color.primary};
  color: ${theme.color.white};
  padding: 0.375rem 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  border: none;
  font-size: 1rem;
  font-weight: 500;
  transition: background-color 0.25s cubic-bezier(0.4, 0, 0.68, 0.06);

  &:hover {
    background-color: ${theme.color.primaryHover};
  }
`;

export const ToReset = styled.a`
  color: ${theme.color.white};
`;

export const ToSignUpBox = styled.div`
  display: flex;
  gap: 5px;
  align-self: flex-start;
`;

export const ToSignUpText = styled.div`
  color: ${theme.color.gray};
`;

export const ToSignUp = styled.a`
  color: ${theme.color.white};
  text-decoration-line: none;
  font-weight: 600;
`;
