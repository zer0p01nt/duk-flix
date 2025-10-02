import { validateAll, validateEmail, validatePassword } from "@/util/validate";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as W from "@/pages/Welcome/WelcomeStyle";
import * as S from "./LoginStyle";
import EmailInput from "./EmailInput";
import PasswordInput from "./PasswordInput";
import Footer from "@/components/Footer/Footer";
import { useAuth } from "@/hooks/useAuth";

export default function Login(): React.JSX.Element {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // 유효성 검사 결과 저장
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  // AuthContext 불러옴
  const { login } = useAuth();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateAll(email, password, setEmailError, setPasswordError)) {
      return;
    }

    setErrorMsg("");
    setIsLoading(true);
    try {
      await login(email, password);
      // 로그인하면 뒤로가기 눌러도 로그인 안 풀리게
      navigate("/home", { replace: true });
    } catch (error) {
      if (error instanceof Error) {
        setErrorMsg(error.message);
      } else {
        setErrorMsg("알 수 없는 오류가 발생했습니다.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <W.MainContainer>
        <S.Background>
          <W.WelcomeHeader>
            <W.Logo onClick={() => navigate("/")} />
          </W.WelcomeHeader>
          <S.LoginContainer>
            <S.Title>로그인</S.Title>
            <S.Form onSubmit={onSubmit}>
              {errorMsg && <S.ErrorBox>{errorMsg}</S.ErrorBox>}
              <S.InputBox>
                <EmailInput
                  email={email}
                  setEmail={setEmail}
                  validateEmail={validateEmail}
                  setEmailError={setEmailError}
                  isPending={isLoading}
                  $isBorderRed={!!emailError}
                  $isLogin={true}
                />
                {emailError && (
                  <S.ErrorMsg $isLogin={true}>
                    <svg
                      viewBox='0 0 16 16'
                      width='16'
                      height='16'
                      data-icon='CircleXSmall'
                      data-icon-id=':r13:'
                      aria-hidden='true'
                      className='default-ltr-iqcdef-cache-2ui8wr e1vkmu653'
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      role='img'
                    >
                      <path
                        fillRule='evenodd'
                        clipRule='evenodd'
                        d='M14.5 8C14.5 11.5899 11.5899 14.5 8 14.5C4.41015 14.5 1.5 11.5899 1.5 8C1.5 4.41015 4.41015 1.5 8 1.5C11.5899 1.5 14.5 4.41015 14.5 8ZM16 8C16 12.4183 12.4183 16 8 16C3.58172 16 0 12.4183 0 8C0 3.58172 3.58172 0 8 0C12.4183 0 16 3.58172 16 8ZM4.46967 5.53033L6.93934 8L4.46967 10.4697L5.53033 11.5303L8 9.06066L10.4697 11.5303L11.5303 10.4697L9.06066 8L11.5303 5.53033L10.4697 4.46967L8 6.93934L5.53033 4.46967L4.46967 5.53033Z'
                        fill='currentColor'
                      ></path>
                    </svg>
                    {emailError}
                  </S.ErrorMsg>
                )}
              </S.InputBox>
              <S.InputBox>
                <PasswordInput
                  password={password}
                  setPassword={setPassword}
                  validatePassword={validatePassword}
                  setPasswordError={setPasswordError}
                  isPending={isLoading}
                  $isBorderRed={!!passwordError}
                  $isLogin={true}
                />
                {passwordError && (
                  <S.ErrorMsg $isLogin={true}>
                    <svg
                      viewBox='0 0 16 16'
                      width='16'
                      height='16'
                      data-icon='CircleXSmall'
                      data-icon-id=':r13:'
                      aria-hidden='true'
                      className='default-ltr-iqcdef-cache-2ui8wr e1vkmu653'
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      role='img'
                    >
                      <path
                        fillRule='evenodd'
                        clipRule='evenodd'
                        d='M14.5 8C14.5 11.5899 11.5899 14.5 8 14.5C4.41015 14.5 1.5 11.5899 1.5 8C1.5 4.41015 4.41015 1.5 8 1.5C11.5899 1.5 14.5 4.41015 14.5 8ZM16 8C16 12.4183 12.4183 16 8 16C3.58172 16 0 12.4183 0 8C0 3.58172 3.58172 0 8 0C12.4183 0 16 3.58172 16 8ZM4.46967 5.53033L6.93934 8L4.46967 10.4697L5.53033 11.5303L8 9.06066L10.4697 11.5303L11.5303 10.4697L9.06066 8L11.5303 5.53033L10.4697 4.46967L8 6.93934L5.53033 4.46967L4.46967 5.53033Z'
                        fill='currentColor'
                      ></path>
                    </svg>
                    {passwordError}
                  </S.ErrorMsg>
                )}
              </S.InputBox>

              <S.Btn type='submit'>로그인</S.Btn>
              <S.ToReset href='/password-reset'>
                비밀번호를 잊으셨나요?
              </S.ToReset>
              <S.ToSignUpBox>
                <S.ToSignUpText>넷플릭스 회원이 아닌가요?</S.ToSignUpText>
                <S.ToSignUp href='/signup'>지금 가입하세요.</S.ToSignUp>
              </S.ToSignUpBox>
            </S.Form>
          </S.LoginContainer>
          <W.Overlay />
        </S.Background>
      </W.MainContainer>
      <Footer $isSignUp={false} $isWelcome={false} $isMain={false} />
    </>
  );
}
