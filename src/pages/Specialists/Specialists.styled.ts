import { Box, CircularProgress, Stack } from '@mui/material'
import { styled } from '@mui/material/styles'

export const Container = styled(Box)({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  width: '1152px',
  justifyContent: 'center',
  alignItems: 'center',
})

export const Loader = styled(CircularProgress)`
  color: #e7929d;
  margin-left: calc(50% - 20px);
  margin-bottom: 12px;
`

export const NotFoundContainer = styled(Stack)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;

  p {
    width: 500px;
    text-align: center;
    color: ${({ theme }) => theme.palette.text.secondary};
  }
`
