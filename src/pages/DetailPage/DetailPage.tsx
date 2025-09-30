import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import * as S from "./DetailPageStyle";
// 👇 아이콘 컴포넌트들을 import 합니다.
import { IconThumbsUp, IconThumbsDown, IconDoubleThumbsUp } from "@/components/Icons/Icons";

const TMDB_KEY = import.meta.env.VITE_TMDB_API_KEY;
const TMDB_BASE = "https://api.themoviedb.org/3";
const TMDB_IMG_ORIGINAL = "https://image.tmdb.org/t/p/original";

const fetchDetail = async (mediaType: string, mediaId: string) => {
  const url = `${TMDB_BASE}/${mediaType}/${mediaId}?api_key=${TMDB_KEY}&language=ko-KR`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("콘텐츠 정보를 불러오는 데 실패했습니다.");
  }
  return response.json();
};

export default function DetailPage() {
  const navigate = useNavigate();
  const { mediaType, mediaId } = useParams<{ mediaType: string; mediaId: string }>();

  const {
    data: content,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["detail", mediaType, mediaId],
    queryFn: () => fetchDetail(mediaType!, mediaId!),
    enabled: !!mediaType && !!mediaId,
  });

  const handleClose = () => navigate(-1);

  const title = content?.title || content?.name;
  const releaseDate = content?.release_date || content?.first_air_date;
  const runtime = content?.runtime ?? (content?.episode_run_time ? content.episode_run_time[0] : 0);

  const backdropUrl = content?.backdrop_path
    ? `${TMDB_IMG_ORIGINAL}${content.backdrop_path}`
    : "";

  return (
    <S.Overlay onClick={handleClose}>
      <S.ModalContainer onClick={(e) => e.stopPropagation()}>
        {isLoading && <p style={{ padding: "20px" }}>로딩 중...</p>}
        {isError && <p style={{ padding: "20px" }}>오류가 발생했습니다.</p>}
        {content && (
          <>
            <S.CloseButton onClick={handleClose}>×</S.CloseButton>
            <S.BackdropContainer>
              <S.BackdropImage src={backdropUrl} alt={title} />
              <S.BackdropGradient />
              <S.Title>{title}</S.Title>
              <S.ActionButtons>
                <S.PlayButton>▶ 재생</S.PlayButton>
                {/* 👇 이모티콘을 아이콘 컴포넌트로 교체 */}
                <S.ActionButton data-tooltip="내가 찜한 콘텐츠에 추가">+</S.ActionButton>
                <S.RatingContainer>
                  <S.ActionButton data-tooltip="평가">
                    <IconThumbsUp />
                  </S.ActionButton>
                  <S.RatingMenu>
                    <S.RatingOption data-tooltip="맘에 안 들어요">
                      <IconThumbsDown />
                    </S.RatingOption>
                    <S.RatingOption data-tooltip="좋아요">
                      <IconThumbsUp />
                    </S.RatingOption>
                    <S.RatingOption data-tooltip="최고예요!">
                      <IconDoubleThumbsUp />
                    </S.RatingOption>
                  </S.RatingMenu>
                </S.RatingContainer>
              </S.ActionButtons>
            </S.BackdropContainer>
            <S.Content>
              <S.MetaContainer>
                <S.Details>
                  <span>{releaseDate?.substring(0, 4)}</span>
                  {runtime > 0 && (
                    <span>
                      {Math.floor(runtime / 60)}시간 {runtime % 60}분
                    </span>
                  )}
                  <S.HDTag>HD</S.HDTag>
                </S.Details>
                <S.Overview>{content.overview}</S.Overview>
              </S.MetaContainer>
              <S.InfoContainer></S.InfoContainer>
            </S.Content>
          </>
        )}
      </S.ModalContainer>
    </S.Overlay>
  );
}