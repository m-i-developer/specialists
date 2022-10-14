import { BookmarkBorderOutlined } from '@mui/icons-material'
import React from 'react'
import * as S from './SpecialistsHeader.styled'

export const FavoriteSpecialistsBtn = ({
  isOnlyFavorites,
  handleClickOnlyFavorites,
}: {
  handleClickOnlyFavorites: () => void
  isOnlyFavorites: boolean
}) => {
  return isOnlyFavorites ? (
    <S.FavoriteButton
      onClick={handleClickOnlyFavorites}
      sx={{ backgroundColor: '#8b84d71f' }}
      data-testid='favoriteSpecialistsBtnActive'
    >
      <BookmarkBorderOutlined color='primary' />
    </S.FavoriteButton>
  ) : (
    <S.FavoriteButton
      onClick={handleClickOnlyFavorites}
      data-testid='favoriteSpecialistsBtnInactive'
    >
      <BookmarkBorderOutlined color='action' />
    </S.FavoriteButton>
  )
}
