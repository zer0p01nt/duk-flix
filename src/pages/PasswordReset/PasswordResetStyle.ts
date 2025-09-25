import { theme } from "@/styles/theme";
import styled from "styled-components";
import background from "@/assets/password-reset-background.jpg";

export const Background = styled.div`
  width: 100%;
  height: 680px;
  background-image: url(${background});
  background-size: cover;
  min-height: 31rem;
  display: flex;
  align-items: center;
  flex-direction: column;
  color: ${theme.color.black};
  position: relative;
`;

export const ResetContainer = styled.div`
  width: 100%;
  max-width: 480px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: rgb(242, 242, 242);
  margin: 5rem 2rem;
  padding: 2.5rem;
  gap: 1rem;
`;

export const Title = styled.div`
  font-size: 2rem;
  font-weight: 700;
  align-self: flex-start;
`;

export const Text = styled.div`
  align-self: flex-start;
  font-size: 1rem;
`;

export const ErrorBox = styled.div`
  background-color: rgb(247, 224, 181);
  color: ${theme.color.black};
  width: 100%;
  padding: 1rem;
  border-radius: 4px;
  font-size: 1rem;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

export const InputBox = styled.div`
  width: 100%;
  background-color: ${theme.color.white};
`;

export const Btn = styled.button`
  width: 100%;
  background-color: ${theme.color.primary};
  color: ${theme.color.white};
  padding: 0.75rem 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  border: none;
  font-size: 1.125rem;
  font-weight: 500;
  transition: background-color 0.25s cubic-bezier(0.4, 0, 0.68, 0.06);

  &:hover {
    background-color: ${theme.color.primaryHover};
  }
`;
