import { useNavigate, type NavigateFunction } from "react-router-dom";
import * as S from "./WelcomeStyle";

export default function Welcome(): React.JSX.Element {
  const navigate: NavigateFunction = useNavigate();

  return (
    <S.MainContainer>
      <S.HeaderContainer>
        <S.WelcomeHeader>
          <S.Logo />
          <S.Console>
            <S.LangSelect>
              <S.LangOption>한국어</S.LangOption>
              <S.LangOption>English</S.LangOption>
            </S.LangSelect>
            <S.LoginButton onClick={() => navigate("/login")}>
              로그인
            </S.LoginButton>
          </S.Console>
        </S.WelcomeHeader>
        <S.CenterBox>
          <S.CenterTitle>영화, 시리즈 등을 무제한으로</S.CenterTitle>
        </S.CenterBox>
        <S.Overlay />
      </S.HeaderContainer>
      <div>
        <div>7000원이면 만날 수 있는 넷플릭스</div>
      </div>
    </S.MainContainer>
  );
}
