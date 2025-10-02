import Search from "../Search/Search";
import * as S from "./MyListPageStyle";
import * as M from "@/pages/main/MainpageStyle";
import { Link, Outlet } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { fetchMyListDocs } from "@/util/myList";
import { useAuth } from "@/hooks/useAuth";
import type { Media, TMDBMovieRaw, TMDBTVRaw } from "@/types/TMDB.type";
import { mapMovie, mapTV, posterURL } from "@/util/mapMedias";
import Footer from "@/components/Footer/Footer";

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    api_key: import.meta.env.VITE_TMDB_API_KEY,
    language: "ko-KR",
  },
});

const fetchMyListDetails = async (
  userId: string | undefined
): Promise<Media[]> => {
  if (!userId) return [];

  const myListDocs = await fetchMyListDocs(userId);

  const myListItemPromises = myListDocs.map((item) =>
    api
      .get<TMDBMovieRaw | TMDBTVRaw>(`/${item.media_type}/${item.id}`)
      .then((res) =>
        item.media_type === "movie"
          ? mapMovie(res.data as TMDBMovieRaw)
          : mapTV(res.data as TMDBTVRaw)
      )
      .catch((error) => {
        console.error("TMDB 상세 로드 오류:", error);
        return null;
      })
  );

  return (await Promise.all(myListItemPromises)).filter(
    (item): item is Media => item !== null
  );
};

export default function MyListPage(): React.JSX.Element {
  const { currentUser } = useAuth();
  const userId = currentUser?.uid;

  const { data: myListItems = [] } = useQuery({
    queryKey: ["myList", userId, "page"],
    queryFn: () => fetchMyListDetails(userId),
    enabled: !!userId, // 로그인된 경우에만 실행
  });
  return (
    <S.Container>
      <Search />
      <S.MainContainer>
        <S.Title>내가 찜한 리스트</S.Title>
        {myListItems.length === 0 ? (
          <div>찜한 콘텐츠가 없습니다.</div>
        ) : (
          <S.Wrapper>
            {myListItems.map((it) => {
              const poster = posterURL(it.poster_path, "w342");

              return (
                <Link
                  key={`${it.media_type}-${it.id}`}
                  to={`/my-list/${it.media_type}/${it.id}`}
                >
                  <M.Thumb $bg={poster || ""} title={it.title}>
                    <M.ThumbLabel>{it.title}</M.ThumbLabel>
                  </M.Thumb>
                </Link>
              );
            })}
          </S.Wrapper>
        )}
        <Outlet />
      </S.MainContainer>
      <Footer $isSignUp={false} $isWelcome={false} $isMain={true} />
    </S.Container>
  );
}
