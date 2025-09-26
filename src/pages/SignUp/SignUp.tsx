import { auth } from "@/lib/firebase";
import { validateAll, validateEmail, validatePassword } from "@/util/validate";
import { useMutation } from "@tanstack/react-query";
import { FirebaseError } from "firebase/app";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import EmailInput from "../Login/EmailInput";
import PasswordInput from "../Login/PasswordInput";
import * as L from "@/pages/Login/LoginStyle";
import * as S from "./SignUpStyle";
import SignUpHeader from "./SignUpHeader";
import Footer from "@/components/Footer/Footer";

// firebase 회원가입 함수
const signUpWithEmail = async (account: {
  email: string;
  password: string;
}) => {
  try {
    const credential = await createUserWithEmailAndPassword(
      auth,
      account.email,
      account.password
    );
    return credential.user;
  } catch (error) {
    if (
      error instanceof FirebaseError &&
      error.code === "auth/email-already-in-use"
    ) {
      throw new Error("이미 사용 중인 이메일 주소입니다.");
    }
    throw new Error("회원가입 중 오류가 발생했습니다.");
  }
};

// Tanstack Query 훅
const useSignUp = (
  navigate: ReturnType<typeof useNavigate>,
  setError: (message: string) => void
) => {
  return useMutation({
    mutationFn: signUpWithEmail,
    onSuccess: () => {
      setError("");
      navigate("/login");
    },
    onError: (error) => {
      setError(error.message);
    },
  });
};

export default function SignUp(): React.JSX.Element {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const { mutate, isPending } = useSignUp(navigate, setEmailError);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateAll(email, password, setEmailError, setPasswordError)) {
      return;
    }
    mutate({ email, password });
  };

  return (
    <>
      <S.MainContainer>
        <SignUpHeader $isSignUp={true} />
        <S.SignUpContainer>
          <S.Title>비밀번호를 설정해 멤버십을 시작하세요</S.Title>
          <S.TextBox>
            <S.Text>몇 단계만 더 거치면 넷플릭스 가입 완료!</S.Text>
            <S.Text>복잡한 단계는 모두 없앴습니다.</S.Text>
          </S.TextBox>
          <S.Form onSubmit={onSubmit}>
            <L.InputBox>
              <EmailInput
                email={email}
                setEmail={setEmail}
                validateEmail={validateEmail}
                setEmailError={setEmailError}
                isPending={isPending}
                $isBorderRed={!!emailError}
                $isLogin={false}
              />
              {emailError && (
                <L.ErrorMsg $isLogin={false}>
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
                </L.ErrorMsg>
              )}
            </L.InputBox>
            <L.InputBox>
              <PasswordInput
                password={password}
                setPassword={setPassword}
                validatePassword={validatePassword}
                setPasswordError={setPasswordError}
                isPending={isPending}
                $isBorderRed={!!passwordError}
                $isLogin={false}
              />
              {passwordError && (
                <L.ErrorMsg $isLogin={false}>
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
                </L.ErrorMsg>
              )}
            </L.InputBox>

            <S.Btn type='submit'>동의하고 계속</S.Btn>
          </S.Form>
        </S.SignUpContainer>
      </S.MainContainer>
      <Footer $isSignUp={true} $isWelcome={false} />
    </>
  );
}
