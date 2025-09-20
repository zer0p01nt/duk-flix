import GlobalStyle from "@/styles/GlobalStyle";
import { ThemeProvider } from "styled-components";
import { theme } from "./styles/theme";

function App(): React.JSX.Element {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <div>🦁프론트 1팀 클론코딩 레포지토리 입니다.🦁</div>
    </ThemeProvider>
  );
}

export default App;
