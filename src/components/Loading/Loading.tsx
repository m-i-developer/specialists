import { CircularProgress } from '@mui/material'
import { observer } from 'mobx-react-lite'
import React from 'react'
import * as S from './Loading.styled'

export const Loading = observer(() => {
  return (
    <S.Loader>
      <CircularProgress />
    </S.Loader>
  )
})
