import { db } from "@/lib/firebase";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  setDoc,
} from "firebase/firestore";

export type MyListEntry = { id: number; media_type?: "movie" | "tv" };

// 컬렉션 경로를 동적으로 생성하는 헬퍼 함수
export const getMyListItemsCollection = (userId: string) => {
  // /myList/{userId}/items
  return collection(db, "myList", userId, "items");
};
export const getMyListDocRef = (userId: string, entry: MyListEntry) => {
  const docId = `${entry.media_type}_${entry.id}`;
  // /myList/{userId}/items/{docId}
  return doc(db, "myList", userId, "items", docId);
};

/** 선택: Firestore에 저장된 "내가 찜한 리스트"를 읽어오는 헬퍼
 *  - 기본 경로: /myList
 *  - 프로젝트에서 사용자별로 관리한다면 /users/{uid}/myList 로 바꿔 사용하세요.
 */
export async function fetchMyListDocs(userId: string): Promise<MyListEntry[]> {
  try {
    const itemsCollection = getMyListItemsCollection(userId);
    const snap = await getDocs(itemsCollection);
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

// 내가 찜한 리스트에 추가
export async function addToMyList(
  userId: string,
  entry: MyListEntry
): Promise<void> {
  const docRef = getMyListDocRef(userId, entry);
  await setDoc(docRef, {
    id: entry.id,
    media_type: entry.media_type,
  });
}

// 내가 찜한 리스트에서 삭제
export async function deleteFromMyList(
  userId: string,
  entry: MyListEntry
): Promise<void> {
  const docRef = getMyListDocRef(userId, entry);
  await deleteDoc(docRef);
}

// 내가 찜한 리스트에 있는지 확인
export async function isContentInMyList(
  userId: string,
  id: number,
  media_type?: "movie" | "tv"
): Promise<boolean> {
  const docRef = getMyListDocRef(userId, { id, media_type });
  const docSnap = await getDoc(docRef);
  return docSnap.exists();
}
