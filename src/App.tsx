import GlobalStyle from "@/styles/GlobalStyle";
import { ThemeProvider } from "styled-components";
import { theme } from "./styles/theme";
import { Route, Routes } from "react-router-dom";
import Welcome from "./pages/Welcome/Welcome";
import Login from "./pages/Login/Login";

function App(): React.JSX.Element {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Routes>
        <Route index element={<Welcome />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
