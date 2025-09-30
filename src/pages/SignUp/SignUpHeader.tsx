import { useNavigate, type NavigateFunction } from "react-router-dom";
import * as S from "./SignUpStyle";
import * as W from "@/pages/Welcome/WelcomeStyle";

interface SignUpHeaderProps {
  $isSignUp: boolean;
}

export default function SignUpHeader({
  $isSignUp,
}: SignUpHeaderProps): React.JSX.Element {
  const navigate: NavigateFunction = useNavigate();
  return (
    <S.Header $isSignUp={$isSignUp}>
      <W.Logo onClick={() => navigate("/")} />
      {$isSignUp ? (
        <S.ToLogin href='/login'>로그인</S.ToLogin>
      ) : (
        <W.LoginButton onClick={() => navigate("/login")}>로그인</W.LoginButton>
      )}
    </S.Header>
  );
}
