// Firebase 초기화 (Vite 환경변수 사용)
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Vite: 반드시 VITE_ 프리픽스만 클라이언트로 노출됩니다.
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FB_API_KEY as string,
  authDomain: import.meta.env.VITE_FB_AUTH_DOMAIN as string,
  projectId: import.meta.env.VITE_FB_PROJECT_ID as string,
  storageBucket: import.meta.env.VITE_FB_STORAGE_BUCKET as string,
  messagingSenderId: import.meta.env.VITE_FB_MESSAGING_SENDER as string,
  appId: import.meta.env.VITE_FB_APP_ID as string,
};

export const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

/** 선택: Firestore에 저장된 "내가 찜한 리스트"를 읽어오는 헬퍼
 *  - 기본 경로: /myList
 *  - 프로젝트에서 사용자별로 관리한다면 /users/{uid}/myList 로 바꿔 사용하세요.
 */
export type MyListEntry = { id: number; media_type?: "movie" | "tv" };

import { collection, getDocs } from "firebase/firestore";
export async function fetchMyListDocs(
  path: string = "myList"
): Promise<MyListEntry[]> {
  try {
    const snap = await getDocs(collection(db, path));
    const list: MyListEntry[] = [];
    snap.forEach((d) => {
      const data = d.data();
      if (typeof data?.id === "number") {
        list.push({
          id: data.id,
          media_type: data.media_type ?? "movie",
        });
      }
    });
    return list;
  } catch {
    return [];
  }
}
