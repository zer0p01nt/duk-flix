import { auth } from "@/lib/firebase";
import { FirebaseError } from "firebase/app";
import {
  fetchSignInMethodsForEmail,
  sendPasswordResetEmail,
} from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import * as W from "@/pages/Welcome/WelcomeStyle";
import * as S from "./PasswordResetStyle";
import * as L from "@/pages/Login/LoginStyle";
import SignUpHeader from "../SignUp/SignUpHeader";

export default function PasswordReset(): React.JSX.Element {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    if (!email) {
      setErrorMsg("유효한 이메일 주소를 입력하세요.");
      setLoading(false);
      return;
    }

    try {
      // 가입된 이메일인지 확인
      const signInMethods = await fetchSignInMethodsForEmail(auth, email);
      if (signInMethods.length === 0) {
        setErrorMsg("이 이메일 주소와 연결된 계정을 찾을 수 없습니다.");
        setLoading(false);
        return;
      }

      await sendPasswordResetEmail(auth, email);
      alert("비밀번호 재설정 이메일이 전송되었습니다. 이메일을 확인해 주세요.");
      navigate("/login");
    } catch (error) {
      if (
        error instanceof FirebaseError &&
        error.code === "auth/invalid-email"
      ) {
        setErrorMsg("유효한 이메일 주소를 입력하세요.");
      } else {
        setErrorMsg("오류가 발생했습니다.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <W.MainContainer>
      <S.Background>
        <SignUpHeader $isSignUp={false} />
        <S.ResetContainer>
          <S.Title>
            <div>비밀번호, 이메일 주소를</div>
            <div>업데이트하세요</div>
          </S.Title>
          {errorMsg && <S.ErrorBox>{errorMsg}</S.ErrorBox>}
          <S.Text>비밀번호 재설정 안내 이메일을 보내드리겠습니다.</S.Text>
          <S.Form onSubmit={handlePasswordReset}>
            <S.InputBox>
              <L.Input
                type='email'
                placeholder='이메일 주소'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                $isBorderRed={!!errorMsg}
                $isLogin={false}
              />
            </S.InputBox>
            <S.Btn type='submit' disabled={loading}>
              이메일로 받기
            </S.Btn>
          </S.Form>
        </S.ResetContainer>
      </S.Background>
    </W.MainContainer>
  );
}
