export type Media = {
  id: number;
  title?: string;
  poster_path?: string | null;
  backdrop_path?: string | null;
  media_type?: "movie" | "tv";
};

export type RowData = {
  id: string;
  title: string;
  items: Media[];
};

export type TMDBMovieRaw = {
  id: number;
  title?: string;
  original_title?: string;
  poster_path?: string | null;
  backdrop_path?: string | null;
};

export type TMDBTVRaw = {
  id: number;
  name?: string;
  original_name?: string;
  poster_path?: string | null;
  backdrop_path?: string | null;
};

export type TMDBListResponse<T> = {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
};
