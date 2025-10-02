import { AuthContext, type AuthContextType } from "@/context/AuthContext";
import { useContext } from "react";

// 인증상태 가져오는 훅
export const useAuth = () => {
  const context = useContext(
    AuthContext as React.Context<AuthContextType | undefined>
  );
  if (!context) {
    throw new Error("AuthProvider로 감싸지 않아서 발생한 오류입니다.");
  }

  return context;
};
