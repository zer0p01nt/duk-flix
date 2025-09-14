import { createGlobalStyle } from "styled-components";

/**
 * 간단한 css 설정만 추가해 둠
 */

const GlobalStyle = createGlobalStyle`

  /* theme 파일 대신 일단 :root에 css 변수 저장 */
  :root {
    --red1: rgb(229, 9, 20);
    --red1-hover: rgb(193, 17, 25);
  }

  html, body {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: sans-serif;
  }

  *,
  *::before,
  *::after {
    box-sizing: inherit;
    /* 모바일에서 클릭하면 배경 파래지지 않도록 */
    -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
  }

  ol, ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  a, button {
    cursor: pointer;
  }
`;

export default GlobalStyle;
