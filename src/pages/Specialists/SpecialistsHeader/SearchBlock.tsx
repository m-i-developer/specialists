import { Close } from '@mui/icons-material'
import { Stack, TextField } from '@mui/material'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { FavoriteSpecialistsBtn } from './FavoriteSpecialistsBtn'
import * as S from './SpecialistsHeader.styled'
import { SearchBlockProps } from './SpecialistsHeader.types'

export const SearchBlock = ({
  isOnlyFavorites,
  favoriteSpecialists,
  handleClickOnlyFavorites,
  searchText,
  handleSearchChange,
  handleSearchVis,
}: SearchBlockProps) => {
  const { t } = useTranslation()

  return (
    <Stack
      direction='row'
      spacing={1}
      width='100%'
      justifyContent='space-between'
    >
      <Stack direction='row' width='65%'>
        <TextField
          data-testid='sortField'
          fullWidth
          value={searchText}
          onChange={handleSearchChange}
          size='small'
          label={t('specialists.searchLabel')}
        ></TextField>
        <S.IconButton
          onClick={(e) => handleSearchVis(e, true)}
          data-testid='closeSortFieldButton'
        >
          <Close color='primary' />
        </S.IconButton>
      </Stack>

      {favoriteSpecialists.length ? (
        <FavoriteSpecialistsBtn
          isOnlyFavorites={isOnlyFavorites}
          handleClickOnlyFavorites={handleClickOnlyFavorites}
        />
      ) : (
        <></>
      )}
    </Stack>
  )
}
