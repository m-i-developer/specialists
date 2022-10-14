import { theme } from 'theme'
import { Close, Done } from '@mui/icons-material'
import { Chip } from '@mui/material'
import React, { MouseEvent } from 'react'
import { useTranslation } from 'react-i18next'
import * as S from './SpecialistsHeader.styled'
import { SymptomsBlockProps } from './SpecialistsHeader.types'

export const SymptomsBlock = ({
  chosenSymptoms,
  setChosenSymptoms,
  handleSymptomsBtnClick,
}: SymptomsBlockProps) => {
  const { t } = useTranslation()

  const btnStyles = {
    backgroundColor: theme.palette.primary.dark,
    ':hover': { backgroundColor: '#8B84D7' },
  }

  const symptoms = [
    t('specialists.irritability'),
    t('specialists.sleepDisturbance'),
    t('specialists.weakness'),
    t('specialists.shiver'),
    t('specialists.oppression'),
    t('specialists.decreasedLibido'),
    t('specialists.fears'),
    t('specialists.severeAnxiety'),
    t('specialists.energyReduction'),
    t('specialists.panicAttacks'),
    t('specialists.intrusiveThoughts'),
    t('specialists.depression'),
  ]

  const handleAddChip = (
    e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>,
    idx: number
  ) => {
    setChosenSymptoms([...chosenSymptoms, idx])
  }

  const handleDeleteChip = (
    e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>,
    idx: number
  ) => {
    setChosenSymptoms(chosenSymptoms.filter((chip) => chip !== idx))
  }

  return (
    <>
      <S.Chips>
        {symptoms.map((symptom, idx) => (
          <Chip
            sx={chosenSymptoms.includes(idx) ? btnStyles : {}}
            data-testid={
              chosenSymptoms.includes(idx)
                ? `chosenSymptom_${idx}`
                : `symptom_${idx}`
            }
            color='primary'
            onClick={
              chosenSymptoms.includes(idx)
                ? (e) => handleDeleteChip(e, idx)
                : (e) => handleAddChip(e, idx)
            }
            label={symptom}
            key={symptom}
            variant={chosenSymptoms.includes(idx) ? 'filled' : 'outlined'}
          />
        ))}
      </S.Chips>

      <S.SymptomsButtonWrapper>
        {chosenSymptoms.length ? (
          <S.SymptomsButton
            sx={btnStyles}
            data-testid='applySymptomsButton'
            onClick={handleSymptomsBtnClick}
            variant='contained'
            endIcon={<Done />}
          >
            {t('specialists.apply')}
          </S.SymptomsButton>
        ) : (
          <S.SymptomsButton
            sx={btnStyles}
            data-testid='cancelSymptomsButton'
            onClick={handleSymptomsBtnClick}
            variant='contained'
            endIcon={<Close />}
          >
            {t('specialists.cancel')}
          </S.SymptomsButton>
        )}
      </S.SymptomsButtonWrapper>
    </>
  )
}
