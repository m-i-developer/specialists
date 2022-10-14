import React, {
  useEffect,
  useRef,
  useState,
  ChangeEvent,
  MouseEvent,
  useMemo,
  useCallback,
  useContext,
} from 'react'
import * as S from './SpecialistsHeader.styled'
import { FilterList } from '@mui/icons-material'
import { Stack } from '@mui/material'
import {
  FilterAnchorEl,
  SpecialistsHeaderProps,
  VisibilityType,
} from './SpecialistsHeader.types'
import { SpecialistsFilter } from './SpecialistsFilter'
import { debounce } from 'lodash'
import { Context } from 'index'
import { observer } from 'mobx-react-lite'
import { SymptomsBlock } from './SymptomsBlock'
import { SortingBlock } from './SortingBlock'
import { SearchBlock } from './SearchBlock'
import { SymptomsBtn } from './SymptomsBtn'

export const SpecialistsHeader = observer(
  ({
    favoriteSpecialists,
    searchText,
    setSearchText,
    handleSortClick,
    setActiveSort,
    activeSort,
    sortState,
    sortTypes,
    filters,
    setFilters,
    isOnlyFavorites,
    setIsOnlyFavorites,
    applyFilters,
    clearFilters,
    hasActiveFilters,
    activeFilters,
    specialistsAmount,
    shouldApplyFilters,
    setShouldApplyFilters,
  }: SpecialistsHeaderProps) => {
    const { rootStore } = useContext(Context)
    const { specialistsStore } = rootStore

    const headerRef = useRef(null)
    const [chosenSymptoms, setChosenSymptoms] = useState<number[]>([])
    const [anchorEl, setAnchorEl] = useState<FilterAnchorEl>(null)
    const [visibilityType, setVisibilityType] =
      useState<VisibilityType>('sorting')

    useEffect(() => {
      if (!activeSort) {
        setActiveSort('relevant')
      }
    }, [activeSort, setActiveSort])

    const debouncedFiltation = useMemo(
      () =>
        debounce((val: string) => {
          specialistsStore.fetchSpecialists(val, activeFilters)
        }, 1000),
      [specialistsStore, activeFilters]
    )

    const handleSearchChange = useCallback(
      (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setSearchText(e.target.value)
        debouncedFiltation(e.target.value)
      },
      [setSearchText, debouncedFiltation]
    )

    const handleSearchVis = (
      e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>,
      closeSearch = false
    ) => {
      if (closeSearch && searchText) {
        debouncedFiltation('')
      }
      setSearchText('')
      setVisibilityType(visibilityType === 'sorting' ? 'search' : 'sorting')
    }

    const handleSymptomsBtnClick = () => {
      setVisibilityType(visibilityType === 'symptoms' ? 'sorting' : 'symptoms')
    }

    const handleFiltersClick = () => {
      setAnchorEl(anchorEl ? null : headerRef.current)
      setShouldApplyFilters(false)
    }

    const applyAndCloseFilters = () => {
      applyFilters()
      handleFiltersClick()
    }

    const handleClickOnlyFavorites = useCallback(() => {
      setShouldApplyFilters(true)
      setIsOnlyFavorites(!isOnlyFavorites)
    }, [isOnlyFavorites, setShouldApplyFilters, setIsOnlyFavorites])

    return (
      <S.Header ref={headerRef}>
        {visibilityType === 'symptoms' ? (
          <SymptomsBlock
            handleSymptomsBtnClick={handleSymptomsBtnClick}
            chosenSymptoms={chosenSymptoms}
            setChosenSymptoms={setChosenSymptoms}
          />
        ) : (
          <>
            <Stack direction='row' spacing={1} width='100%'>
              {visibilityType === 'search' && (
                <SearchBlock
                  handleClickOnlyFavorites={handleClickOnlyFavorites}
                  isOnlyFavorites={isOnlyFavorites}
                  favoriteSpecialists={favoriteSpecialists}
                  searchText={searchText}
                  handleSearchVis={handleSearchVis}
                  handleSearchChange={handleSearchChange}
                />
              )}

              {visibilityType === 'sorting' && (
                <SortingBlock
                  handleClickOnlyFavorites={handleClickOnlyFavorites}
                  shouldApplyFilters={shouldApplyFilters}
                  applyFilters={applyFilters}
                  isOnlyFavorites={isOnlyFavorites}
                  favoriteSpecialists={favoriteSpecialists}
                  sortTypes={sortTypes}
                  sortState={sortState}
                  activeSort={activeSort}
                  handleSearchVis={handleSearchVis}
                  handleSortClick={handleSortClick}
                />
              )}
            </Stack>

            <Stack spacing={2} direction='row' alignItems='center'>
              <S.IconButton
                onClick={handleFiltersClick}
                data-testid='filterListButton'
                sx={{ ml: 2 }}
              >
                {hasActiveFilters && <S.Point></S.Point>}
                <FilterList color='action' />
              </S.IconButton>

              <SymptomsBtn
                handleSymptomsBtnClick={handleSymptomsBtnClick}
                hasChosenSymptoms={!!chosenSymptoms.length}
              />
            </Stack>

            <SpecialistsFilter
              anchorEl={anchorEl}
              filters={filters}
              applyAndCloseFilters={applyAndCloseFilters}
              specialistsAmount={specialistsAmount}
              hasActiveFilters={hasActiveFilters}
              setFilters={setFilters}
              favoriteSpecialists={favoriteSpecialists}
              setAnchorEl={setAnchorEl}
              clearFilters={clearFilters}
            />
          </>
        )}
      </S.Header>
    )
  }
)
