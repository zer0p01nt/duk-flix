import type { Media, TMDBMovieRaw, TMDBTVRaw } from "@/types/TMDB.type";

export const mapMovie = (m: TMDBMovieRaw): Media => ({
  id: m.id,
  title: m.title ?? m.original_title ?? "제목 없음",
  poster_path: m.poster_path ?? null,
  backdrop_path: m.backdrop_path ?? null,
  media_type: "movie",
});

export const mapTV = (t: TMDBTVRaw): Media => ({
  id: t.id,
  title: t.name ?? t.original_name ?? "제목 없음",
  poster_path: t.poster_path ?? null,
  backdrop_path: t.backdrop_path ?? null,
  media_type: "tv",
});

export const posterURL = (
  path: string | null | undefined,
  size: "w154" | "w342" | "w500" = "w342"
) => (path ? `https://image.tmdb.org/t/p/${size}${path}` : "");
