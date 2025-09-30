import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import * as S from "./DetailPageStyle";

// TMDB API 관련 정보
const TMDB_KEY = import.meta.env.VITE_TMDB_API_KEY;
const TMDB_BASE = "https://api.themoviedb.org/3";
const TMDB_IMG_ORIGINAL = "https://image.tmdb.org/t/p/original";

// 영화 상세 정보를 불러오는 비동기 함수
const fetchMovieDetail = async (movieId: string) => {
  const url = `${TMDB_BASE}/movie/${movieId}?api_key=${TMDB_KEY}&language=ko-KR`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("영화 정보를 불러오는 데 실패했습니다.");
  }
  return response.json();
};

export default function DetailPage() {
  const navigate = useNavigate();
  const { movieId } = useParams<{ movieId: string }>();

  const {
    data: movie,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["movieDetail", movieId],
    queryFn: () => fetchMovieDetail(movieId!),
    enabled: !!movieId,
  });

  const handleClose = () => {
    navigate(-1);
  };

  const backdropUrl = movie?.backdrop_path
    ? `${TMDB_IMG_ORIGINAL}${movie.backdrop_path}`
    : "";

  return (
    <S.Overlay onClick={handleClose}>
      <S.ModalContainer onClick={(e) => e.stopPropagation()}>
        {isLoading && <p style={{ padding: "20px" }}>로딩 중...</p>}
        {isError && <p style={{ padding: "20px" }}>오류가 발생했습니다.</p>}
        {movie && (
          <>
            <S.CloseButton onClick={handleClose}>×</S.CloseButton>
            <S.BackdropContainer>
              <S.BackdropImage src={backdropUrl} alt={movie.title} />
              <S.BackdropGradient />
              <S.Title>{movie.title}</S.Title>
              <S.ActionButtons>
                <S.PlayButton>▶ 재생</S.PlayButton>
                {/* 👇 각 버튼에 data-tooltip 속성으로 툴팁 내용을 전달합니다. */}
                <S.ActionButton data-tooltip="내가 찜한 콘텐츠에 추가">+</S.ActionButton>
                <S.ActionButton data-tooltip="최고예요!">👍</S.ActionButton>
                <S.ActionButton data-tooltip="맘에 안 들어요">👎</S.ActionButton>
              </S.ActionButtons>
            </S.BackdropContainer>

            <S.Content>
              <S.MetaContainer>
                <S.Details>
                  <span>{movie.release_date.substring(0, 4)}</span>
                  <span>
                    {Math.floor(movie.runtime / 60)}시간 {movie.runtime % 60}분
                  </span>
                  <S.HDTag>HD</S.HDTag>
                </S.Details>
                <S.Overview>{movie.overview}</S.Overview>
              </S.MetaContainer>

              <S.InfoContainer>
                {/* 추가 정보 (장르, 출연진 등)는 여기에 배치할 수 있습니다. */}
              </S.InfoContainer>
            </S.Content>
          </>
        )}
      </S.ModalContainer>
    </S.Overlay>
  );
}