import GlobalStyle from "@/styles/GlobalStyle";
import { ThemeProvider } from "styled-components";
import { theme } from "./styles/theme";
import { Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

// 페이지 import
import Welcome from "./pages/Welcome/Welcome";
import Login from "./pages/Login/Login";
import Search from "./pages/Search/Search";
import Home from "./pages/main/Mainpage";
import SignUp from "./pages/SignUp/SignUp";
import PasswordReset from "./pages/PasswordReset/PasswordReset";
import DetailPage from "./pages/DetailPage/DetailPage";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

const qc = new QueryClient();

function App(): React.JSX.Element {
  return (
    <QueryClientProvider client={qc}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <AuthProvider>
          <Routes>
            {/* 로그인 없어도 접근 가능한 경로 */}
            <Route index element={<Welcome />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='/password-reset' element={<PasswordReset />} />

            {/* 로그인해야만 접근 가능한 경로 */}
            <Route element={<ProtectedRoute />}>
              {/* tv 프로그램은 인식이 안돼서 수정 */}
              <Route path='/home' element={<Home />}>
                <Route path=':mediaType/:mediaId' element={<DetailPage />} />
              </Route>
              {/* 상세페이지 검색 페이지에 중첩 될 수 잇도록 변경*/}
              <Route path="/search" element={<Search />}>
                <Route path=":mediaType/:mediaId" element={<DetailPage />} />
              </Route>
            </Route>
          </Routes>
        </AuthProvider>
      </ThemeProvider>
      {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider>
  );
}

export default App;
