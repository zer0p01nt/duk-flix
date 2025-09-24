import { auth } from "@/lib/firebase";
import { FirebaseError } from "firebase/app";
import { sendPasswordResetEmail } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
      await sendPasswordResetEmail(auth, email);
      alert("비밀번호 재설정 이메일이 전송되었습니다. 이메일을 확인해 주세요.");
      navigate("/login");
    } catch (error) {
      if (
        error instanceof FirebaseError &&
        (error.code === "auth/user-not-found" ||
          error.code === "auth/invalid-email")
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
    <div>
      <div>비밀번호, 이메일 주소를 업데이트하세요</div>
      <div>비밀번호 재설정 안내 이메일을 보내드리겠습니다.</div>
      <form onSubmit={handlePasswordReset}>
        <input
          type='email'
          placeholder='이메일 주소'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
        />
        {errorMsg && <div>{errorMsg}</div>}
        <button type='submit' disabled={loading}>
          이메일로 받기
        </button>
      </form>
    </div>
  );
}
