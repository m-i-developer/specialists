import React from 'react'
import { CheckCircle, HighlightOff } from '@mui/icons-material'

import colors from '../colors/colors.module.scss'

export const components = {
  MuiAlert: {
    defaultProps: {
      iconMapping: {
        error: <HighlightOff />,
        success: <CheckCircle />,
      },
    },
  },
  MuiLink: {
    styleOverrides: {
      root: {
        '&:hover': {
          cursor: 'pointer',
        },
        textDecoration: 'none',
      },
    },
  },
  MuiButton: {
    styleOverrides: {
      root: {
        borderRadius: '8px',
      },
    },
  },
  MuiOutlinedInput: {
    styleOverrides: {
      root: {
        borderRadius: '8px',
      },
    },
  },
  MuiTooltip: {
    styleOverrides: {
      tooltip: {
        backgroundColor: colors.tooltipBackground,
        borderRadius: '16px',
      },
    },
  },
  MuiFormLabel: {
    styleOverrides: {
      asterisk: {
        color: colors.webRed,
        '&$error': {
          color: colors.webRed,
        },
      },
    },
  },
  MuiCheckbox: {
    styleOverrides: {
      root: {
        color: colors.primary,
      },
    },
  },
}
