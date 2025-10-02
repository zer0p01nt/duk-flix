import { useEffect, useMemo, useRef, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import * as S from "./MainpageStyle";
import mainbackground from "@/assets/main-background.webp";
import Search from "../Search/Search";
import Footer from "@/components/Footer/Footer";
import { useQuery } from "@tanstack/react-query";
import YouTube from "react-youtube";
import { IconVolume, IconVolumeMuted } from "@/components/icons/Icons";

/** 공통 미디어 타입 */
type Media = {
  id: number;
  title?: string;
  poster_path?: string | null;
  backdrop_path?: string | null;
  media_type?: "movie" | "tv";
};

type RowData = {
  id: string;
  title: string;
  items: Media[];
};

type TMDBMovieRaw = {
  id: number;
  title?: string;
  original_title?: string;
  poster_path?: string | null;
  backdrop_path?: string | null;
};

type TMDBTVRaw = {
  id: number;
  name?: string;
  original_name?: string;
  poster_path?: string | null;
  backdrop_path?: string | null;
};

type TMDBListResponse<T> = {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
};

type VideoInfo = { key?: string };

const posterURL = (
  path: string | null | undefined,
  size: "w154" | "w342" | "w500" = "w342"
) => (path ? `https://image.tmdb.org/t/p/${size}${path}` : "");

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

const mapMovie = (m: TMDBMovieRaw): Media => ({
  id: m.id,
  title: m.title ?? m.original_title ?? "제목 없음",
  poster_path: m.poster_path ?? null,
  backdrop_path: m.backdrop_path ?? null,
  media_type: "movie",
});

const mapTV = (t: TMDBTVRaw): Media => ({
  id: t.id,
  title: t.name ?? t.original_name ?? "제목 없음",
  poster_path: t.poster_path ?? null,
  backdrop_path: t.backdrop_path ?? null,
  media_type: "tv",
});

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

export default function Home(): React.JSX.Element {
  const navigate = useNavigate(); // useNavigate 훅 사용
  const [topKr, setTopKr] = useState<Media[]>([]);
  const [popularMovies, setPopularMovies] = useState<Media[]>([]);
  const [popularTV, setPopularTV] = useState<Media[]>([]);
  const [myList] = useState<Media[]>([]);
  const [watching, setWatching] = useState<Media[]>([]);
  const sliderRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const [isHovering, setIsHovering] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const playerRef = useRef<any>(null);

  
  const jjangguMovieId = 371236;

  const { data: videoInfo } = useQuery({
    queryKey: ["videos", "movie", jjangguMovieId],
    queryFn: () => fetchVideos("movie", jjangguMovieId.toString()),
    enabled: !!jjangguMovieId,
  });
  const trailerKey = videoInfo?.key;

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

        const watchingList = takeDistinct(nowPlaying, 8, banned); // 시청 중(임시)
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
  }, []);

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
                mute: 1,
                controls: 0,
                loop: 1,
                playlist: trailerKey,
              },
            }}
            onReady={(event) => {
              playerRef.current = event.target;
              if (isMuted) {
                event.target.mute();
              } else {
                event.target.unMute();
              }
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
        <S.VolumeControl onClick={handleVolumeToggle}>
          {isMuted ? <IconVolumeMuted /> : <IconVolume />}
        </S.VolumeControl>
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