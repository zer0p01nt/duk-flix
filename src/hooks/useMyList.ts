import {
  addToMyList,
  deleteFromMyList,
  isContentInMyList,
} from "@/util/myList";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "./useAuth";

export const useMyList = (
  mediaType: "movie" | "tv" | undefined,
  mediaId: number | undefined
) => {
  const { currentUser } = useAuth();
  const userId = currentUser?.uid;

  const queryClient = useQueryClient();
  const safeMediaType = mediaType as "movie" | "tv" | undefined;

  const { data: isInList = false, refetch: refetchStatus } = useQuery({
    queryKey: ["myList", userId, safeMediaType, mediaId],
    queryFn: () => isContentInMyList(userId!, mediaId!, safeMediaType!),
    enabled: !!userId && !!safeMediaType && !!mediaId,
  });

  const mutation = useMutation({
    mutationFn: () => {
      if (!userId || !safeMediaType || !mediaId)
        throw new Error("ID 또는 타입 누락");
      const entry = { id: mediaId, media_type: safeMediaType };
      // 현재 상태에 따라 추가 또는 삭제
      return isInList
        ? deleteFromMyList(userId, entry)
        : addToMyList(userId, entry);
    },
    onSuccess: () => {
      // 찜 상태 새로고침 -> 버튼 UI 업데이트
      refetchStatus();
      // 'myList' 쿼리 키를 무효화하여 Home 컴포넌트가 최신 목록을 다시 가져오도록
      queryClient.invalidateQueries({ queryKey: ["myList"] });
      // 혹시 다른 상세 쿼리가 있으면 그것도 무효화
      queryClient.invalidateQueries({ queryKey: ["detail"] });
    },
  });

  return {
    isInList,
    toggleList: mutation.mutate,
  };
};
