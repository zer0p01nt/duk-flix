import styled from "styled-components";
import { theme } from "@/styles/theme";

export const MainContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: ${theme.color.white};
`;

export const Header = styled.div<{ $isSignUp: boolean }>`
  height: 100px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 0 2.625rem;
  align-items: center;
  border-bottom: ${({ $isSignUp }) =>
    $isSignUp ? `1px solid ${theme.color.signUpGray} ` : "1px solid #1A1A1A"};
`;

export const ToLogin = styled.a`
  font-size: 1rem;
  font-weight: 500;
  color: ${theme.color.darkgray};
  text-decoration-line: none;
`;

export const SignUpContainer = styled.div`
  width: 100%;
  max-width: 440px;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 2rem 2rem 4rem;
  gap: 1rem;
`;

export const Title = styled.div`
  color: ${theme.color.darkgray};
  font-size: 2rem;
  font-weight: 500;
  align-self: flex-start;
  width: 100%;
`;

export const TextBox = styled.div`
  align-self: flex-start;
  width: 100%;
`;

export const Text = styled.div`
  color: #000;
  font-size: 1.125rem;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  width: 100%;
`;

export const Btn = styled.button`
  width: 100%;
  background-color: ${theme.color.primary};
  color: ${theme.color.white};
  padding: 1.25rem 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  border: none;
  font-size: 1.5rem;
  font-weight: 500;
  transition: background-color 0.25s cubic-bezier(0.4, 0, 0.68, 0.06);

  &:hover {
    background-color: ${theme.color.primaryHover};
  }
`;
