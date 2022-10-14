import { Stack } from '@mui/material'
import React from 'react'
import * as S from './SpecialistsHeader.styled'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import SearchIcon from '@mui/icons-material/Search'
import { SortingBlockProps, SortType } from './SpecialistsHeader.types'
import { useTranslation } from 'react-i18next'
import { observer } from 'mobx-react-lite'
import { getWidth } from './SpecialistsHeader.helpers'
import { FavoriteSpecialistsBtn } from './FavoriteSpecialistsBtn'

export const SortingBlock = observer(
  ({
    handleSortClick,
    handleSearchVis,
    isOnlyFavorites,
    sortState,
    sortTypes,
    activeSort,
    favoriteSpecialists,
    handleClickOnlyFavorites,
  }: SortingBlockProps) => {
    const { t } = useTranslation()

    const getSortAttributes = (sortType: SortType) => {
      if (activeSort === sortType) {
        return sortState === 'ascend'
          ? {
              button: <ArrowUpwardIcon />,
              testId: `${sortType}_ascend`,
            }
          : {
              button: <ArrowDownwardIcon />,
              testId: `${sortType}_descend`,
            }
      }
      return {
        button: undefined,
        testId: sortType,
      }
    }

    return (
      <Stack direction='row' justifyContent='space-between' width='100%'>
        <Stack spacing={1} direction='row'>
          {sortTypes.map((sortType, idx) => (
            <S.SortButton
              data-testid={getSortAttributes(sortType).testId}
              color={activeSort === sortType ? 'primary' : 'inherit'}
              sx={{ width: getWidth(idx), minWidth: getWidth(idx) }}
              key={sortType}
              onClick={(e) => handleSortClick(e, idx)}
              endIcon={getSortAttributes(sortType).button}
            >
              {t(`specialists.${sortType}`)}
            </S.SortButton>
          ))}
        </Stack>

        <Stack direction='row' spacing={2}>
          {favoriteSpecialists.length ? (
            <FavoriteSpecialistsBtn
              isOnlyFavorites={isOnlyFavorites}
              handleClickOnlyFavorites={handleClickOnlyFavorites}
            />
          ) : (
            <></>
          )}
          <S.IconButton
            onClick={handleSearchVis}
            data-testid='showSortFieldButton'
          >
            <SearchIcon color='action' />
          </S.IconButton>
        </Stack>
      </Stack>
    )
  }
)
