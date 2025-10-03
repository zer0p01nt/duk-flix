import { useEffect, useMemo, useRef, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import * as S from "./MainpageStyle";
import mainbackground from "@/assets/main-background.webp";
import Search from "../Search/Search";
import Footer from "@/components/Footer/Footer";
import { fetchMyListDocs } from "@/util/myList";
import { useAuth } from "@/hooks/useAuth";
import type {
  Media,
  RowData,
  TMDBListResponse,
  TMDBMovieRaw,
  TMDBTVRaw,
} from "@/types/TMDB.type";
import { mapMovie, mapTV, posterURL } from "@/util/mapMedias";
import { useQuery } from "@tanstack/react-query";
import YouTube from "react-youtube";
import { IconVolume, IconVolumeMuted } from "@/components/Icons/Icons";

// --- 타입 및 헬퍼 함수  ---
type VideoInfo = { key?: string };

const takeDistinct = <T extends { id: number }>(
  list: T[],
  count: number,
  banned: Set<number>
): T[] => {
  const out: T[] = [];
  for (const it of list) {
    if (out.length >= count) break;
    if (banned.has(it.id)) continue;
    out.push(it);
    banned.add(it.id);
  }
  return out;
};

const fetchVideos = async (
  mediaType: string,
  mediaId: string
): Promise<VideoInfo> => {
  const TMDB_KEY = import.meta.env.VITE_TMDB_API_KEY;
  const TMDB_BASE = "https://api.themoviedb.org/3";
  const url = `${TMDB_BASE}/${mediaType}/${mediaId}/videos?api_key=${TMDB_KEY}&language=ko-KR`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("비디오 정보를 불러오는 데 실패했습니다.");
  }
  const data = await response.json();
  const trailer = data.results.find(
    (video: any) => video.type === "Trailer" && video.site === "YouTube"
  );
  return trailer ? { key: trailer.key } : {};
};
// ------------------------------------

export default function Home(): React.JSX.Element {
  const navigate = useNavigate();
  const [topKr, setTopKr] = useState<Media[]>([]);
  const [popularMovies, setPopularMovies] = useState<Media[]>([]);
  const [popularTV, setPopularTV] = useState<Media[]>([]);
  const [myList, setMyList] = useState<Media[]>([]);
  const [watching, setWatching] = useState<Media[]>([]);
  const sliderRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // --- 비디오 플레이어 관련 상태 ---
  const [isHovering, setIsHovering] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const playerRef = useRef<any>(null);

  // --- 사용자 정보 가져오기 ---
  const { currentUser } = useAuth();
  const userId = currentUser?.uid;

  // --- 짱구 비디오 정보 가져오기 ---
  const jjangguMovieId = 371236;
  const { data: videoInfo } = useQuery({
    queryKey: ["videos", "movie", jjangguMovieId],
    queryFn: () => fetchVideos("movie", jjangguMovieId.toString()),
  });
  const trailerKey = videoInfo?.key;

  // --- 영화/TV 목록 데이터 가져오기 ---
  useEffect(() => {
    const api = axios.create({
      baseURL: "https://api.themoviedb.org/3",
      params: {
        api_key: import.meta.env.VITE_TMDB_API_KEY,
        language: "ko-KR",
      },
    });

    (async () => {
      try {
        const [discMovieRes, discTVRes] = await Promise.all([
          api.get<TMDBListResponse<TMDBMovieRaw>>("/discover/movie", {
            params: {
              with_original_language: "ko",
              sort_by: "popularity.desc",
              region: "KR",
            },
          }),
          api.get<TMDBListResponse<TMDBTVRaw>>("/discover/tv", {
            params: {
              with_original_language: "ko",
              sort_by: "popularity.desc",
            },
          }),
        ]);
        const discMovies = discMovieRes.data.results.map(mapMovie);
        const discTVs = discTVRes.data.results.map(mapTV);

        const nowPlayingRes = await api.get<TMDBListResponse<TMDBMovieRaw>>(
          "/movie/now_playing",
          { params: { region: "KR" } }
        );
        const nowPlaying = nowPlayingRes.data.results.map(mapMovie);

        const [moviePopularRes, tvPopularRes] = await Promise.all([
          api.get<TMDBListResponse<TMDBMovieRaw>>("/movie/popular", {
            params: { region: "KR" },
          }),
          api.get<TMDBListResponse<TMDBTVRaw>>("/tv/popular"),
        ]);
        const movies = moviePopularRes.data.results.map(mapMovie);
        const tvs = tvPopularRes.data.results.map(mapTV);

        // 내가 찜한 리스트 불러오는 로직 추가
        if (userId) {
          const myListDocs = await fetchMyListDocs(userId);
          const myListItemPromises = myListDocs.map((item) =>
            api
              .get<TMDBMovieRaw | TMDBTVRaw>(`/${item.media_type}/${item.id}`)
              .then((res) => {
                return item.media_type === "movie"
                  ? mapMovie(res.data as TMDBMovieRaw)
                  : mapTV(res.data as TMDBTVRaw);
              })
              .catch((error) => {
                console.error(error);
                return null;
              })
          );
          const myListItems = (await Promise.all(myListItemPromises)).filter(
            (item): item is Media => item !== null
          );
          setMyList(myListItems);
        }

        const banned = new Set<number>();

        const mixedKR: Media[] = [];
        let i = 0;
        while (mixedKR.length < 10 && (discMovies[i] || discTVs[i])) {
          if (discMovies[i]) mixedKR.push(discMovies[i]);
          if (mixedKR.length >= 10) break;
          if (discTVs[i]) mixedKR.push(discTVs[i]);
          i++;
        }
        const topKRList = takeDistinct(mixedKR, 10, banned);
        const watchingList = takeDistinct(nowPlaying, 8, banned);
        const popularMovieList = takeDistinct(movies, 18, banned);
        const popularTVList = takeDistinct(tvs, 18, banned);

        setTopKr(topKRList);
        setWatching(watchingList);
        setPopularMovies(popularMovieList);
        setPopularTV(popularTVList);
      } catch (err) {
        console.error("TMDB 로딩 에러:", err);
      }
    })();
  }, [userId]); // myList를 의존성 배열에서 제거하여 무한 루프 방지

  const rows: RowData[] = useMemo(
    () => [
      { id: "r1", title: "오늘 한국 Top 10", items: topKr.slice(0, 10) },
      ...(myList.length > 0
        ? [{ id: "r2", title: "내가 찜한 리스트", items: myList } as RowData]
        : []),
      { id: "r3", title: "시청 중인 콘텐츠", items: watching },
      { id: "r4", title: "인기 영화", items: popularMovies.slice(0, 18) },
      { id: "r5", title: "인기 시리즈", items: popularTV.slice(0, 18) },
    ],
    [topKr, myList, watching, popularMovies, popularTV]
  );

  const handleScroll = (rowId: string, delta: number) => {
    const el = sliderRefs.current[rowId];
    el?.scrollBy({ left: delta, behavior: "smooth" });
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

  return (
    <S.Page>
      <Search />
      <S.Hero
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
                mute: isMuted ? 1 : 0,
                controls: 0,
                loop: 1,
                playlist: trailerKey,
              },
            }}
            onReady={(event) => {
              playerRef.current = event.target;
              if (isMuted) event.target.mute();
            }}
            style={{
              position: "absolute",
              top: "-50%",
              left: 0,
              width: "100%",
              height: "200%",
              pointerEvents: "none",
            }}
          />
        ) : (
          <S.HeroBackdrop $bg={mainbackground} />
        )}

        <S.HeroGradient />
        <S.HeroContent>
          <S.HeroTitle>
            <S.TitleLogo
              src="https://occ-0-8143-64.1.nflxso.net/dnm/api/v6/LmEnxtiAuzezXBjYXPuDgfZ4zZQ/AAAABVuCD_FbNAHQG_w13eIIiTGmrkrCAFty8dPsgJuKfih5Flj8QDPYeoWK5rc-DOiclyt2FdC9FYG8M3YxwS3sENYjUCZTTtx7XkD0QdZMZN2n.webp?r=0d7"
              alt="극장판 짱구는 못말려 23기"
            />
          </S.HeroTitle>
          <S.HeroDesc>
            멕시코 지사로 발령이 난 아빠를 따라 함께 이사를 한 짱구 가족.
            무시무시한 선인장 괴물에 맞서, 짱구네 식구들의 서바이벌 승부가
            시작된다.
          </S.HeroDesc>
          <S.BtnRow>
            <S.PlayBtn
              as="a"
              href={`https://www.themoviedb.org/movie/${jjangguMovieId}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              ▶ 재생
            </S.PlayBtn>
            <S.InfoBtn onClick={() => navigate(`/home/movie/${jjangguMovieId}`)}>
              ⓘ 상세 정보
            </S.InfoBtn>
          </S.BtnRow>
        </S.HeroContent>
        {isHovering && trailerKey && (
          <S.VolumeControl onClick={handleVolumeToggle}>
            {isMuted ? <IconVolumeMuted /> : <IconVolume />}
          </S.VolumeControl>
        )}
      </S.Hero>
      <S.RowSection>
        {rows.map((row) => (
          <S.Row key={row.id}>
            <S.RowTitle>{row.title}</S.RowTitle>
            <S.SliderWrapper>
              <S.ArrowLeft
                aria-label="left"
                onClick={() => handleScroll(row.id, -600)}
                style={{ left: 8 }}
              >
                ◀
              </S.ArrowLeft>
              <S.Slider
                ref={(el: HTMLDivElement | null) => {
                  sliderRefs.current[row.id] = el;
                }}
              >
                {row.items.map((it, idx) => {
                  const poster = posterURL(it.poster_path, "w342");
                  if (row.id === "r1") {
                    const detailHref = `/home/${it.media_type}/${it.id}`;
                    return (
                      <Link
                        key={`${row.id}-${it.media_type}-${it.id}`}
                        to={detailHref}
                        aria-label={`${idx + 1}위: ${it.title} 상세보기`}
                        style={{ display: "block" }}
                      >
                        <S.RankItem>
                          <S.RankSvg viewBox="0 0 200 200" aria-hidden>
                            <S.RankText
                              x="95%"
                              y="50%"
                              textAnchor="end"
                              dominantBaseline="middle"
                              fontSize="180"
                              vectorEffect="non-scaling-stroke"
                            >
                              {idx + 1}
                            </S.RankText>
                          </S.RankSvg>
                          <S.PosterThumb $bg={poster || ""}>
                            <S.ThumbLabel>{it.title}</S.ThumbLabel>
                          </S.PosterThumb>
                        </S.RankItem>
                      </Link>
                    );
                  }
                  return (
                    <Link
                      key={`${row.id}-${it.media_type}-${it.id}`}
                      to={`/home/${it.media_type}/${it.id}`}
                    >
                      <S.Thumb $bg={poster || ""} title={it.title}>
                        <S.ThumbLabel>{it.title}</S.ThumbLabel>
                      </S.Thumb>
                    </Link>
                  );
                })}
              </S.Slider>
              <S.ArrowRight
                aria-label="right"
                onClick={() => handleScroll(row.id, 600)}
              >
                ▶
              </S.ArrowRight>
            </S.SliderWrapper>
          </S.Row>
        ))}
      </S.RowSection>
      <Outlet />
      <Footer $isSignUp={false} $isWelcome={false} $isMain={true} />
    </S.Page>
  );
}