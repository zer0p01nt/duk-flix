import { useQuery } from "@tanstack/react-query";
import * as S from "./TrendingMovieListStyle";
import { useRef } from "react";

const TMDB_KEY = import.meta.env.VITE_TMDB_API_KEY;
const TMDB_TRENDING = `https://api.themoviedb.org/3/trending/movie/week?language=ko-KR&api_key=${TMDB_KEY}&page=1/`;
const TMDB_IMG = "https://image.tmdb.org/t/p/w500/";

export interface TrendingMovie {
  id: number;
  poster_path: string;
}

interface TrendingResponse {
  results: TrendingMovie[];
}

const fetchTrendingMovies = async (): Promise<TrendingMovie[]> => {
  const res = await fetch(TMDB_TRENDING);
  if (!res.ok) throw new Error("지금 뜨는 콘텐츠를 불러오지 못했습니다.");

  const data: TrendingResponse = await res.json();
  return data.results.slice(0, 10).map((movie) => ({
    id: movie.id,
    poster_path: `${TMDB_IMG}${movie.poster_path}`,
  }));
};

export default function TrendingMovieList(): React.JSX.Element {
  const ref = useRef<HTMLDivElement>(null);

  const { data, isPending } = useQuery<TrendingMovie[]>({
    queryKey: ["movies"],
    queryFn: () => fetchTrendingMovies(),
  });

  const handleScroll = (direction: "left" | "right") => {
    if (ref.current) {
      const scrollAmount = ref.current.clientWidth * 0.8;

      const distance = direction === "left" ? -scrollAmount : scrollAmount;

      ref.current.scrollBy({
        left: distance,
        behavior: "smooth",
      });
    }
  };

  return (
    <S.MainContainer>
      <S.ScrollButton $direction='left' onClick={() => handleScroll("left")}>
        <svg
          viewBox='0 0 24 24'
          width='24'
          height='24'
          data-icon='ChevronLeftMedium'
          data-icon-id=':r1m:'
          aria-hidden='true'
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          role='img'
        >
          <path
            fill-rule='evenodd'
            clip-rule='evenodd'
            d='M8.41409 12L15.707 19.2928L14.2928 20.7071L6.29277 12.7071C6.10523 12.5195 5.99988 12.2652 5.99988 12C5.99988 11.7347 6.10523 11.4804 6.29277 11.2928L14.2928 3.29285L15.707 4.70706L8.41409 12Z'
            fill='currentColor'
          ></path>
        </svg>
      </S.ScrollButton>
      <S.ListContainer ref={ref}>
        <S.MovieContainer>
          {!isPending &&
            data &&
            data.map((movie, index) => (
              <S.MovieItem key={movie.id} $posterPath={movie.poster_path}>
                <S.RankNumber>{index + 1}</S.RankNumber>
              </S.MovieItem>
            ))}
        </S.MovieContainer>
      </S.ListContainer>
      <S.ScrollButton $direction='right' onClick={() => handleScroll("right")}>
        <svg
          viewBox='0 0 24 24'
          width='24'
          height='24'
          data-icon='ChevronRightMedium'
          data-icon-id=':r1n:'
          aria-hidden='true'
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          role='img'
        >
          <path
            fill-rule='evenodd'
            clip-rule='evenodd'
            d='M15.5859 12L8.29303 19.2928L9.70725 20.7071L17.7072 12.7071C17.8948 12.5195 18.0001 12.2652 18.0001 12C18.0001 11.7347 17.8948 11.4804 17.7072 11.2928L9.70724 3.29285L8.29303 4.70706L15.5859 12Z'
            fill='currentColor'
          ></path>
        </svg>
      </S.ScrollButton>
    </S.MainContainer>
  );
}
