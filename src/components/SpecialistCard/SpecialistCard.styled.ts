import { Button, Stack, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'

export const Card = styled(Stack)`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 16px 24px 16px;
  height: 336px;
  width: 238px;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.palette.background.paper};
`

export const Name = styled(Typography)`
  font-size: 16px;
  line-height: 24px;
  letter-spacing: 0.15px;

  p {
    word-break: break-word;
    text-align: center;
  }
`

export const Info = styled(Typography)`
  font-size: 12px;
  line-height: 15.6px;
  letter-spacing: 0.2px;
  maring-top: 16px;
  color: ${({ theme, datatype }) => datatype && theme.palette.text.secondary}
`

export const Hour = styled(Typography)`
  color: ${({ theme }) => theme.palette.text.secondary}
`

export const AddBtn = styled(Button)`
  position: absolute;
  top: 0;
  right: 0;
  width: 64px;
  height: 64px;
  border-radius: 0 12px 0 0;
`
