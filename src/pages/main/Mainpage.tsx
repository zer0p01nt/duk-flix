import { useEffect, useMemo, useRef, useState } from "react";
import axios from "axios";
import * as S from "./MainpageStyle";
import mainbackground from "@/assets/main-background.webp";
import Search from "../Search/Search";

/** 렌더에 쓰는 공통 미디어 타입 */
type Media = {
  id: number;
  title: string;
  poster_path: string | null;
  backdrop_path?: string | null;
  media_type: "movie" | "tv";
};

type RowData = {
  id: string;
  title: string;
  items: Media[];
};

/** TMDB 원본 타입 */
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

/** 이미지 URL 헬퍼 */
const posterURL = (
  path: string | null,
  size: "w154" | "w342" | "w500" = "w342"
) => (path ? `https://image.tmdb.org/t/p/${size}${path}` : "");

/** 중복 제거 */
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

/** 매핑 */
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

export default function Home(): React.JSX.Element {
  const [topKr, setTopKr] = useState<Media[]>([]);
  const [popularMovies, setPopularMovies] = useState<Media[]>([]);
  const [popularTV, setPopularTV] = useState<Media[]>([]);
  const [myList, setMyList] = useState<Media[]>([]);
  const [watching, setWatching] = useState<Media[]>([]);
  const sliderRefs = useRef<Record<string, HTMLDivElement | null>>({});

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
        // 오늘 한국 Top 후보
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

        // 시청 중 → 현재 상영작
        const nowPlayingRes = await api.get<TMDBListResponse<TMDBMovieRaw>>(
          "/movie/now_playing",
          { params: { region: "KR" } }
        );
        const nowPlaying = nowPlayingRes.data.results.map(mapMovie);

        // 인기 영화 / 인기 시리즈
        const [moviePopularRes, tvPopularRes] = await Promise.all([
          api.get<TMDBListResponse<TMDBMovieRaw>>("/movie/popular", {
            params: { region: "KR" },
          }),
          api.get<TMDBListResponse<TMDBTVRaw>>("/tv/popular"),
        ]);
        const movies = moviePopularRes.data.results.map(mapMovie);
        const tvs = tvPopularRes.data.results.map(mapTV);

        // 중복 제거하며 섹션 구성
        const banned = new Set<number>();

        // 오늘 한국 Top 10
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

  return (
    <S.Page>
      <Search />

      {/* 히어로 */}
      <S.Hero>
        <S.HeroBackdrop bg={mainbackground} />
        <S.HeroGradient />
        <S.HeroContent>
          <S.HeroTitle>
            <S.TitleLogo
              src="https://occ-0-8143-64.1.nflxso.net/dnm/api/v6/LmEnxtiAuzezXBjYXPuDgfZ4zZQ/AAAABVuCD_FbNAHQG_w13eIIiTGmrkrCAFty8dPsgJuKfih5Flj8QDPYeoWK5rc-DOiclyt2FdC9FYG8M3YxwS3sENYjUCZTTtx7XkD0QdZMZN2n.webp?r=0d7"
              alt="극장판 짱구"
            />
          </S.HeroTitle>
          <S.HeroDesc>
            멕시코 지사로 발령이 난 아빠를 따라 함께 이사를 한 짱구 가족.
            무시무시한 선인장 괴물에 맞서, 짱구네 식구들의 서바이벌 승부가
            시작된다.
          </S.HeroDesc>
          <S.BtnRow>
            <S.PlayBtn>▶ 재생</S.PlayBtn>
            <S.InfoBtn>ⓘ 상세 정보</S.InfoBtn>
          </S.BtnRow>
        </S.HeroContent>
      </S.Hero>

      {/* 섹션 */}
      <S.RowSection>
        {rows.map((row) => (
          <S.Row key={row.id}>
            <S.RowTitle>{row.title}</S.RowTitle>
            <S.SliderWrapper>
              <S.ArrowLeft
                aria-label="left"
                onClick={() => handleScroll(row.id, -600)}
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
                    return (
                      <S.RankItem key={`${row.id}-${it.id}`}>
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
                    );
                  }

                  return (
                    <S.Thumb
                      key={`${row.id}-${it.id}`}
                      $bg={poster || ""}
                      title={it.title}
                    >
                      <S.ThumbLabel>{it.title}</S.ThumbLabel>
                    </S.Thumb>
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
    </S.Page>
  );
}