import { css } from "styled-components";
import { theme } from "./theme";

/**
 * 미디어 쿼리 헬퍼 객체
 * 반응형 스타일을 작성할 때 import해서 사용합니다
 * @example
 * // 컴포넌트 스타일 파일
 * const Container = styled.div`
 *    font-size: 1rem;
 *
 *  ${media.tablet`
 *     font-size: 1.2rem;
 *  `}
 * `;
 */

export const media = {
  laptop: (...args: Parameters<typeof css>) => css`
    @media (min-width: ${theme.breakpoints.laptop}) {
      ${css(...args)}
    }
  `,
  tablet: (...args: Parameters<typeof css>) => css`
    @media (min-width: ${theme.breakpoints.tablet}) {
      ${css(...args)}
    }
  `,
  mobile: (...args: Parameters<typeof css>) => css`
    @media (min-width: ${theme.breakpoints.mobile}) {
      ${css(...args)}
    }
  `,
};
