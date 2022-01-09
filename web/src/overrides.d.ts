import {
  Palette,
  PaletteColor,
  PaletteColorOptions,
} from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface PaletteBlack {
    main: string;
    emphasisHigh: string;
    emphasisMedium: string;
    inactive: string;
  }

  interface Palette {
    black: PaletteBlack;
  }

  interface PaletteOptions {
    black: PaletteBlack;
  }
}
