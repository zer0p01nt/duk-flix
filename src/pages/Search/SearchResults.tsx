// src/SearchResults.tsx
import { useSearchParams, Link } from "react-router-dom";
import * as S from "./searchStyle";
import { useEffect, useState } from "react";
import Footer from "@/components/Footer/Footer";


// type MovieItem = {
//   id: number;
//   title?: string;
//   name?: string;
//   poster_path: string | null;
//   backdrop_path?: string | null;
// };


// type 보강
type MovieItem = {
  id: number;
  title?: string;
  name?: string;
  poster_path: string | null;
  backdrop_path?: string | null;
  media_type?: "movie" | "tv" | "person";
};


export default function SearchResults({ apiKey }: { apiKey?: string }) {
  const [params] = useSearchParams();
  const query = params.get("query") ?? "";

  const TMDB_KEY = (apiKey || import.meta.env.VITE_TMDB_API_KEY) as string;
  const TMDB_BASE = "https://api.themoviedb.org/3";
  const TMDB_IMG = "https://image.tmdb.org/t/p/w500";

  const [movies, setMovies] = useState<MovieItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const q = query.trim();
    if (!q) {
      setMovies([]);
      setError(null);
      return;
    }
    if (!TMDB_KEY) {
      setError(
        "TMDB API 키가 없습니다. apiKey props 또는 VITE_TMDB_API_KEY를 설정하세요."
      );
      setMovies([]);
      return;
    }

    const ctrl = new AbortController();
    const timer = setTimeout(async () => {
      setLoading(true);
      setError(null);
      try {
        const url = `${TMDB_BASE}/search/multi?api_key=${TMDB_KEY}&language=ko-KR&query=${encodeURIComponent(
          q
        )}&page=1&include_adult=false`;
        const res = await fetch(url, { signal: ctrl.signal });
        const data = await res.json().catch(() => ({}));
        if (!res.ok)
          throw new Error(data.status_message || `HTTP ${res.status}`);

        const list: MovieItem[] = ((data.results ?? []) as MovieItem[]).filter(
          (it) => it.poster_path || it.backdrop_path
        );
        setMovies(list);
      } catch (e) {
        setError(e instanceof Error ? e.message : "검색 실패");
        setMovies([]);
      } finally {
        setLoading(false);
      }
    }, 250);

    return () => {
      clearTimeout(timer);
      ctrl.abort();
    };
  }, [query, TMDB_KEY]);

  const hasQuery = query.trim() !== "";
  const noResult = hasQuery && !loading && !error && movies.length === 0;

  return (
    <S.Remain>
      {loading && (
        <div style={{ margin: "0 60px", opacity: 0.7 }}>불러오는 중…</div>
      )}
      {error && (
        <div style={{ margin: "0 60px", color: "tomato" }}>오류: {error}</div>
      )}
      {noResult && (
        <div style={{ margin: "0 60px" }}>
          입력하신 검색어 '{query}'(와)과 일치하는 결과가 없습니다.
        </div>
      )}

      {!loading && !error && movies.length > 0 && (
        <S.MovieGrid>
          {/* {movies.map((m) => {
            const title = m.title || m.name || "제목 없음";
            const img =
              (m.poster_path && `${TMDB_IMG}${m.poster_path}`) ||
              (m.backdrop_path && `${TMDB_IMG}${m.backdrop_path}`) ||
              "";
            return (
              <S.Movie key={m.id}>
                <S.Poster src={img} alt={title} title={title} />
              </S.Movie>
            );
          })} */}
          {movies.map((m) => {
  const type = m.media_type;
  const title = m.title || m.name || "제목 없음";
  const img =
    (m.poster_path && `${TMDB_IMG}${m.poster_path}`) ||
    (m.backdrop_path && `${TMDB_IMG}${m.backdrop_path}`) ||
    "";

  const card = <S.Poster src={img} alt={title} title={title} />;

  const isPlayable = type === "movie" || type === "tv";

  return (
    <S.Movie key={`${type ?? "unknown"}-${m.id}`}>
      {isPlayable ? (
        <Link to={`/home/${type}/${m.id}`}>{card}</Link>
      ) : (
        card // person 등은 링크 없이 표시
      )}
    </S.Movie>
  );
})}
        </S.MovieGrid>
      )}
            {/* 푸터 */}
      <Footer $isSignUp={false} $isWelcome={false} $isMain={true} />
    </S.Remain>
  );
}
