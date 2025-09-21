import { createGlobalStyle } from "styled-components";

/**
 * 간단한 css 설정만 추가해 둠
 */

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: Netflix Sans;
    src: url("/fonts/netflix-sans-core-variable-full.woff2") format('woff2');
  }


  html, body {
    box-sizing: border-box;
    width: 100%;
    margin: 0;
    padding: 0;
    font-family: Netflix Sans, Helvetica Neue, Segoe UI, Roboto, Ubuntu, sans-serif;
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
