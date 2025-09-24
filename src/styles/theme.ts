/**
 * 반응형 전환되는 width 사이즈 객체
 */
const size = {
  laptop: "1280px",
  tablet: "960px",
  mobile: "600px",
};

/**
 * 앱 전역에 적용되는 theme 객체
 */
export const theme = {
  /**
   * 앱 전역에서 사용되는 색상 모음
   * theme를 import해서 쓰시면 됩니다
   * (import할 때 import { theme as t } 처럼 별칭을 쓰는 것도 가능합니다)
   * @example
   * // 컴포넌트 스타일 파일 내부
   * const Container = style.div`
   *  color: ${theme.color.primary};
   */
  color: {
    primary: "#E50914",
    primaryHover: "#C11119",
    black: "#141414",
    white: "#FFFFFF",
    gray: "#767676",
    red: "#eb3942",
    darkgray: "#333",
  },
  // breakpoints는 media 객체에서 import해서 쓰므로, 직접 쓰지는 않습니다
  breakpoints: size,
};

export type Theme = typeof theme;
