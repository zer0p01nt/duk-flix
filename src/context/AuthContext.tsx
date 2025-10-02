import { auth } from "@/lib/firebase";
import { FirebaseError } from "firebase/app";
import {
  browserLocalPersistence,
  onAuthStateChanged,
  setPersistence,
  signInWithEmailAndPassword,
  signOut,
  type User,
} from "firebase/auth";
import { createContext, useEffect, useState, type ReactNode } from "react";

export interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // 초기에 로그인 상태 파악
  useEffect(() => {
    // 로그인 상태 로컬에 저장하는 함수 (초기에만)
    const setupPersistence = async () => {
      try {
        await setPersistence(auth, browserLocalPersistence);
      } catch (error) {
        console.error("Firebase Persistence 설정 오류:", error);
      }

      const unsubscribe = onAuthStateChanged(auth, (user) => {
        setCurrentUser(user);
        setLoading(false);
      });

      return () => unsubscribe();
    };

    setupPersistence();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      if (error instanceof FirebaseError) {
        // 계정이 없을 때
        if (error.code === "auth/user-not-found") {
          throw new Error("이 이메일 주소를 사용하는 계정을 찾을 수 없습니다.");
        }
        // 계정과 비밀번호가 일치하지 않을 때
        if (error.code === "auth/invalid-credential") {
          throw new Error("이메일 주소 또는 비밀번호가 올바르지 않습니다.");
        }
      }
      throw new Error("로그인 중 오류가 발생했습니다.");
    }
  };

  const logout = () => {
    return signOut(auth);
  };

  const value = { currentUser, loading, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { AuthContext };
