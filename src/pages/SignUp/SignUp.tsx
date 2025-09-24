import { auth } from "@/lib/firebase";
import { useMutation } from "@tanstack/react-query";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
  } catch {
    throw new Error("회원가입 중 오류가 발생했습니다.");
  }
};

// Tanstack Query 훅
const useSignUp = (navigate: ReturnType<typeof useNavigate>) => {
  return useMutation({
    mutationFn: signUpWithEmail,
    onSuccess: () => {
      navigate("/login");
    },
    onError: () => {
      alert("회원가입 중 오류가 발생했습니다.");
    },
  });
};

export default function SignUp(): React.JSX.Element {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { mutate, isPending } = useSignUp(navigate);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate({ email, password });
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
      <input
        type='password'
        placeholder='비밀번호를 추가하세요'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        disabled={isPending}
      />
      <button type='submit'>동의하고 계속</button>
    </form>
  );
}
