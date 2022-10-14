import { ruRU } from '@mui/material/locale'
import { createTheme } from '@mui/material/styles'

import { palette } from './colors'
import { typography } from './typography'
import { components } from './components'
import type { ThemeOptions } from './theme.types'

const fontFamily = ['Inter', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'].join(
  ','
)

export const themeOptions: ThemeOptions = {
  palette,
  typography: {
    fontFamily,
    ...typography,
  },
  components,
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
}

export const theme = createTheme(themeOptions, ruRU)
