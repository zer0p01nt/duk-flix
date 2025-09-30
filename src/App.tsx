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

const qc = new QueryClient();

function App(): React.JSX.Element {
  return (
    <QueryClientProvider client={qc}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Routes>
          <Route index element={<Welcome />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/search' element={<Search />} />
          <Route path='/password-reset' element={<PasswordReset />} />

          <Route path='/home' element={<Home />}>
            <Route path='movie/:movieId' element={<DetailPage />} />
          </Route>
          
        </Routes>
      </ThemeProvider>
      {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider>
  );
}

export default App;