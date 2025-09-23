import GlobalStyle from "@/styles/GlobalStyle";
import { ThemeProvider } from "styled-components";
import { theme } from "./styles/theme";
import { Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Welcome from "./pages/Welcome/Welcome";
import Login from "./pages/Login/Login";

// 검색페이지
import Search from "./pages/Search/Search";
import Home from "./pages/main/Mainpage";

const qc = new QueryClient();

function App(): React.JSX.Element {
  return (
    <QueryClientProvider client={qc}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Routes>
          <Route index element={<Welcome />} />
          <Route path='/login' element={<Login />} />
          <Route path="/search" element={<Search />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </ThemeProvider>
      {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider>
  );
}

export default App;
