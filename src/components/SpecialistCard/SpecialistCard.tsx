import React, { useEffect, useCallback, useState } from 'react'
import * as S from './SpecialistCard.styled'
import { Box, Rating, Stack, Typography } from '@mui/material'
import { BookmarkAddOutlined, BookmarkAddedOutlined } from '@mui/icons-material'
import { useTranslation } from 'react-i18next'
import { ISpecialistCard } from './SpecialistCard.types'
import { getExperience } from './SpecialistCard.helpers'

export const SpecialistCard = ({
  data,
  testId,
  favoriteSpecialists,
  setFavoriteSpecialists,
  applyFilters,
  isOnlyFavorites,
  setIsOnlyFavorites,
}: ISpecialistCard) => {
  const { t } = useTranslation()

  const [shouldUpdateList, setShouldUpdateList] = useState(false)

  const handleAddToFavorite = () => {
    setFavoriteSpecialists([data.uid, ...favoriteSpecialists])
  }

  const handleDeleteFromFavorite = useCallback(() => {
    setFavoriteSpecialists(
      favoriteSpecialists.filter((uid) => uid !== data.uid)
    )
    setShouldUpdateList(true)
  }, [favoriteSpecialists, setShouldUpdateList, setFavoriteSpecialists, data])

  useEffect(() => {
    if (!favoriteSpecialists.length) {
      setIsOnlyFavorites(false)
    }
    if (isOnlyFavorites && shouldUpdateList) {
      applyFilters()
    }
  }, [
    shouldUpdateList,
    favoriteSpecialists,
    applyFilters,
    setIsOnlyFavorites,
    isOnlyFavorites,
  ])

  return (
    <S.Card spacing={2} data-testid={`specialist_${testId}`}>
      {favoriteSpecialists.includes(data.uid) ? (
        <S.AddBtn
          onClick={handleDeleteFromFavorite}
          data-testid='deleteFromFavoriteBtn'
          sx={{ color: '#E7929D' }}
        >
          <BookmarkAddedOutlined />
        </S.AddBtn>
      ) : (
        <S.AddBtn onClick={handleAddToFavorite} data-testid='addToFavoriteBtn'>
          <BookmarkAddOutlined />
        </S.AddBtn>
      )}
      <Box data-testid='specialist_photo'>
        <img width={128} height={128} src={data.photo} alt='avatar' />
      </Box>
      <Stack alignItems='center' spacing={1}>
        <Stack alignItems='center'>
          <S.Name data-testid='specialist_firstname'>{data.firstName}</S.Name>
          <S.Name data-testid='specialist_lastname'>{data.lastName}</S.Name>
        </Stack>
        <S.Info data-testid='specialist_specialization' datatype='secondary'>
          {t(`specialists.${data.specialization}`)}
        </S.Info>
      </Stack>

      <S.Info data-testid='specialist_experience'>
        {getExperience(data.experience as number)}
      </S.Info>
      <Stack direction='row' data-testid='specialist_price'>
        <Typography>{`${data.price} ₽ `}</Typography>
        <S.Hour>&nbsp;{`/ час `}</S.Hour>
      </Stack>
      <Rating
        size='small'
        data-testid='specialist_rating'
        value={data.rating}
        readOnly
        precision={0.5}
      />
    </S.Card>
  )
}
