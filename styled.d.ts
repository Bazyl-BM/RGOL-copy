import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    color: {
      beige: string;
      darkBeige: string;
      steel: string;
      orange: string;
      dark: string;
      black: string;
      brown: string;
    };
    mq: {
      tablet: string;
      desktop: string;
      bigDesktop: string;
      huge: string;
    };
  }
}
declare module '*.svg' {
  const content: any;
  export default content;
}
declare module '*.webp' {
  const value: any;
  export = value;
}
