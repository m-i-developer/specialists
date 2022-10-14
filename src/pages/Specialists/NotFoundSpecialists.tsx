import React from 'react'
import errorImg from 'assets/images/infoImg.png'
import * as S from './Specialists.styled'
import { useTranslation } from 'react-i18next'
import { Typography } from '@mui/material'

export const NotFoundSpecialists = () => {
  const { t } = useTranslation()

  return (
    <S.NotFoundContainer spacing={1}>
      <img alt='error' width='180' src={errorImg} />
      <Typography variant='h5'>{t('specialists.notFoundHeader')}</Typography>
      <Typography>{t('specialists.notFoundDescription')}</Typography>
    </S.NotFoundContainer>
  )
}
