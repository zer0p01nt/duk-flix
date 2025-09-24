import { auth } from "@/lib/firebase";
import { useMutation } from "@tanstack/react-query";
import { FirebaseError } from "firebase/app";
import {
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// firebase 로그인 함수
const signInWithEmail = async (account: {
  email: string;
  password: string;
}) => {
  try {
    const credential = await signInWithEmailAndPassword(
      auth,
      account.email,
      account.password
    );
    return credential.user;
  } catch (error) {
    if (
      error instanceof FirebaseError &&
      error.code === "auth/invalid-credential"
    ) {
      throw new Error("이메일 주소 또는 비밀번호가 올바르지 않습니다.");
    }
    throw new Error("로그인 중 오류가 발생했습니다.");
  }
};

// Tanstack Query 훅
const useLogin = (navigate: ReturnType<typeof useNavigate>) => {
  return useMutation({
    mutationFn: signInWithEmail,
    onSuccess: () => {
      navigate("/home");
    },
    onError: () => {
      alert("로그인 중 오류가 발생했습니다.");
    },
  });
};

// firebase 비밀번호 재설정 함수
const sendResetEmail = async (email: string) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert("비밀번호 재설정 이메일이 전송되었습니다. 이메일을 확인해 주세요.");
  } catch (error) {
    if (error instanceof FirebaseError && error.code === "auth/invalid-email") {
      alert("가입되지 않은 이메일 주소입니다.");
    } else {
      alert("비밀번호 재설정 이메일 전송에 실패했습니다.");
    }
  }
};

export default function Login(): React.JSX.Element {
  const navigate = useNavigate();
  const { mutate, isPending } = useLogin(navigate);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // 유효성 검사 결과 저장
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  // 유효성 검사
  const validate = () => {
    let isValid = true;
    setEmailError("");
    setPasswordError("");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError("유효한 이메일 주소를 입력하세요.");
      isValid = false;
    }

    if (password.length < 4 || password.length > 60) {
      setPasswordError("비밀번호는 4~60자 사이여야 합니다.");
      isValid = false;
    }

    return isValid;
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      return;
    }
    mutate({ email, password });
  };

  const handlePasswordReset = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!email) {
      alert("비밀번호 재설정 이메일을 받으려면 이메일 주소를 입력해 주세요.");
      return;
    }
    sendResetEmail(email);
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        type='email'
        placeholder='이메일 주소'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={isPending}
      />
      {emailError && <div>{emailError}</div>}
      <input
        type='password'
        placeholder='비밀번호를 추가하세요'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        disabled={isPending}
      />
      {passwordError && <div>{passwordError}</div>}
      <button type='submit'>로그인</button>
      <button type='button' onClick={handlePasswordReset}>
        비밀번호를 잊으셨나요?
      </button>
      <div>
        넷플릭스 회원이 아니신가요?
        <button type='button' onClick={() => navigate("/signup")}>
          지금 가입하세요.
        </button>
      </div>
    </form>
  );
}
