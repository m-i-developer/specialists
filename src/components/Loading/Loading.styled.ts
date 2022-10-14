import { Box } from '@mui/material'
import { styled } from '@mui/material/styles'

export const Loader = styled(Box)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  z-index: 10;
  backdrop-filter: blur(2px);
  border-radius: 32px;
  color: ${({ theme }) => theme.palette.primary.main};
`
