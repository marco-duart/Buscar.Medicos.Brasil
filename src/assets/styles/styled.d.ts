import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    title: string;
    colors: {
      white: string;
      white100: string;
      white200: string;
      white300: string;
      lightRed: string;
      darkBlue: string;
      orange: string;
      yellowGreen: string;
      lightGreen100: string;
      lightGreen200: string;
      darkGreen: string;
      gray100: string;
      gray200: string;
      gray300: string;
      gray600: string;
      darkGray100: string;
    };
    fontSizes: {
      xsm: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
      xxl: string;
      xxxl: string;
    };
    radius: {
      xm: string;
      sm: string;
      md: string;
    };
    fontFamily: {
      Poppins: string;
      Sora: string;
    };
  }
}
