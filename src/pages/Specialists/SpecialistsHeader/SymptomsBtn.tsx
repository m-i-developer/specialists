import { Add, Done } from '@mui/icons-material'
import React from 'react'
import { useTranslation } from 'react-i18next'
import * as S from './SpecialistsHeader.styled'
import { SymptomsBtnProps } from './SpecialistsHeader.types'

export const SymptomsBtn = ({
  hasChosenSymptoms,
  handleSymptomsBtnClick,
}: SymptomsBtnProps) => {
  const { t } = useTranslation()

  const btnStyles = { backgroundColor: 'white', width: '161px' }

  return hasChosenSymptoms ? (
    <S.SymptomsButton
      sx={btnStyles}
      onClick={handleSymptomsBtnClick}
      variant='outlined'
      endIcon={<Done />}
      data-testid='symptomsBtn_hasSymptoms'
    >
      {t('specialists.mySymptoms')}
    </S.SymptomsButton>
  ) : (
    <S.SymptomsButton
      sx={btnStyles}
      onClick={handleSymptomsBtnClick}
      variant='outlined'
      endIcon={<Add />}
      data-testid='symptomsBtn_hasntSymptoms'
    >
      {t('specialists.mySymptoms')}
    </S.SymptomsButton>
  )
}
