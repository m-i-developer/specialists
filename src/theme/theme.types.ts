import {
  ThemeOptions as MUIThemeOptions,
  Theme as MUITheme,
} from '@mui/material/styles'
import { palette } from './colors'
import { typography } from './typography'

export type Palette = {
  [Key in keyof typeof palette]: typeof palette[Key]
}

export type Typography = keyof typeof typography

export interface ThemeOptions extends Omit<MUIThemeOptions, 'palette'> {
  palette: Palette
}

export interface Theme {
  theme: MUITheme
}

declare module '@mui/material/styles' {
  interface PaletteOptions extends Palette {}
}
