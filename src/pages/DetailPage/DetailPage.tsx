import { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import YouTube from "react-youtube"; // YouTube 라이브러리 import
import * as S from "./DetailPageStyle";
import {
  IconThumbsUp, IconThumbsDown, IconDoubleThumbsUp, IconCheck,
  IconThumbsUpFilled, IconThumbsDownFilled, IconDoubleThumbsUpFilled,
  IconVolume, IconVolumeMuted
} from "../../components/icons/Icons";

// 타입 정의
type Rating = 'dislike' | 'like' | 'love';
type VideoInfo = { key?: string };

// API 관련 상수
const TMDB_KEY = import.meta.env.VITE_TMDB_API_KEY;
const TMDB_BASE = "https://api.themoviedb.org/3";
const TMDB_IMG_ORIGINAL = "https://image.tmdb.org/t/p/original";

// API 호출 함수
const fetchDetail = async (mediaType: string, mediaId: string) => {
  const url = `${TMDB_BASE}/${mediaType}/${mediaId}?api_key=${TMDB_KEY}&language=ko-KR`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("콘텐츠 정보를 불러오는 데 실패했습니다.");
  }
  return response.json();
};

const fetchVideos = async (mediaType: string, mediaId: string): Promise<VideoInfo> => {
  const url = `${TMDB_BASE}/${mediaType}/${mediaId}/videos?api_key=${TMDB_KEY}&language=ko-KR`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("비디오 정보를 불러오는 데 실패했습니다.");
  }
  const data = await response.json();
  const trailer = data.results.find((video: any) => video.type === 'Trailer' && video.site === 'YouTube');
  return trailer ? { key: trailer.key } : {};
};

// 메인 컴포넌트
export default function DetailPage() {
  const navigate = useNavigate();
  const { mediaType, mediaId } = useParams<{ mediaType: string; mediaId: string }>();

  // 상태 관리
  const [isHovering, setIsHovering] = useState(false);
  const [isRatingMenuOpen, setIsRatingMenuOpen] = useState(false);
  const [selectedRating, setSelectedRating] = useState<Rating | null>(null);
  const [showParticles, setShowParticles] = useState(false);
  const [isAddedToList, setIsAddedToList] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  // Ref 관리
  const ratingContainerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<any>(null); // YouTube 플레이어 인스턴스를 저장하기 위한 ref

  // 데이터 fetching
  const { data: content, isLoading, isError } = useQuery({
    queryKey: ["detail", mediaType, mediaId],
    queryFn: () => fetchDetail(mediaType!, mediaId!),
    enabled: !!mediaType && !!mediaId,
  });

  const { data: videoInfo } = useQuery({
    queryKey: ["videos", mediaType, mediaId],
    queryFn: () => fetchVideos(mediaType!, mediaId!),
    enabled: !!mediaType && !!mediaId,
  });

  // 외부 클릭 감지 Hook
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ratingContainerRef.current && !ratingContainerRef.current.contains(event.target as Node)) {
        setIsRatingMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [ratingContainerRef]);

  // 핸들러 함수들
  const handleRatingSelect = (rating: Rating) => {
    setSelectedRating(rating);
    setIsRatingMenuOpen(false);
    if (rating === 'love') {
      setShowParticles(true);
      setTimeout(() => setShowParticles(false), 1000);
    }
  };

  const renderRatingIcon = () => {
    if (selectedRating === 'dislike') return <IconThumbsDownFilled />;
    if (selectedRating === 'like') return <IconThumbsUpFilled />;
    if (selectedRating === 'love') return <IconDoubleThumbsUpFilled />;
    return <IconThumbsUp />;
  };

  const handleVolumeToggle = () => {
    if (playerRef.current) {
      if (isMuted) {
        playerRef.current.unMute();
      } else {
        playerRef.current.mute();
      }
      setIsMuted(!isMuted);
    }
  };

  const handleClose = () => navigate(-1);

  // 렌더링을 위한 변수
  const title = content?.title || content?.name;
  const releaseDate = content?.release_date || content?.first_air_date;
  const runtime = content?.runtime ?? (content?.episode_run_time ? content.episode_run_time[0] : 0);
  const backdropUrl = content?.backdrop_path ? `${TMDB_IMG_ORIGINAL}${content.backdrop_path}` : "";
  const trailerKey = videoInfo?.key;

  return (
    <S.Overlay onClick={handleClose}>
      <S.ModalContainer onClick={(e) => e.stopPropagation()}>
        {isLoading && <p style={{ padding: "20px" }}>로딩 중...</p>}
        {isError && <p style={{ padding: "20px" }}>오류가 발생했습니다.</p>}
        {content && (
          <>
            <S.CloseButton onClick={handleClose}>×</S.CloseButton>
            <S.BackdropContainer
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              {isHovering && trailerKey ? (
                <YouTube
                  videoId={trailerKey}
                  opts={{
                    width: "100%",
                    height: "100%",
                    playerVars: {
                      autoplay: 1,
                      mute: 1, // 처음엔 항상 음소거로 시작
                      controls: 0,
                      loop: 1,
                      playlist: trailerKey,
                    },
                  }}
                  onReady={(event) => { playerRef.current = event.target; }}
                  style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                />
              ) : (
                <S.BackdropImage src={backdropUrl} alt={title} />
              )}
              
              <S.BackdropGradient />
              <S.Title>{title}</S.Title>
              <S.ActionButtons>
                <S.PlayButton
                  href={`https://www.themoviedb.org/${mediaType}/${mediaId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  재생
                </S.PlayButton>
                <S.ActionButton
                  data-tooltip={isAddedToList ? "내가 찜한 콘텐츠에서 삭제" : "내가 찜한 콘텐츠에 추가"}
                  onClick={() => setIsAddedToList(prev => !prev)}
                >
                  {isAddedToList ? <IconCheck /> : "+"}
                </S.ActionButton>
                <S.RatingContainer ref={ratingContainerRef} $isOpen={isRatingMenuOpen}>
                  <S.ActionButton
                    data-tooltip={selectedRating ? "평가함" : "평가"}
                    onClick={() => setIsRatingMenuOpen(prev => !prev)}
                  >
                    {renderRatingIcon()}
                    {showParticles && <S.ParticleEffect />}
                  </S.ActionButton>
                  <S.RatingMenu>
                    <S.RatingOption data-tooltip={selectedRating === 'dislike' ? '평가함' : '맘에 안 들어요'} onClick={() => handleRatingSelect('dislike')}><IconThumbsDown /></S.RatingOption>
                    <S.RatingOption data-tooltip={selectedRating === 'like' ? '평가함' : '좋아요'} onClick={() => handleRatingSelect('like')}><IconThumbsUp /></S.RatingOption>
                    <S.RatingOption data-tooltip={selectedRating === 'love' ? '평가함' : '최고예요!'} onClick={() => handleRatingSelect('love')}><IconDoubleThumbsUp /></S.RatingOption>
                  </S.RatingMenu>
                  <S.CloseRatingButton onClick={() => setIsRatingMenuOpen(false)}>✕</S.CloseRatingButton>
                </S.RatingContainer>
              </S.ActionButtons>
              <S.VolumeControl onClick={handleVolumeToggle}>
                {isMuted ? <IconVolumeMuted /> : <IconVolume />}
              </S.VolumeControl>
            </S.BackdropContainer>
            <S.Content>
              <S.MetaContainer>
                <S.Details>
                  <span>{releaseDate?.substring(0, 4)}</span>
                  {runtime > 0 && <span>{Math.floor(runtime / 60)}시간 {runtime % 60}분</span>}
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