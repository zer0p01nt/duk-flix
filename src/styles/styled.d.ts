import "styled-components";
import { Theme } from "./theme";

/**
 * styled-components 테마 타입 확장
 */
declare module "styled-components" {
  export type DefaultTheme = Theme;
}
