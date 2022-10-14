import { Box, Grid } from '@mui/material'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import * as S from './Specialists.styled'
import { SpecialistCard } from 'components/SpecialistCard'
import {
  ActiveFilters,
  SortState,
  SpecialistCardType,
} from './Specialists.types'
import { SpecialistsHeader } from 'pages/Specialists/SpecialistsHeader'
import {
  Filter,
  SortType,
} from 'pages/Specialists/SpecialistsHeader/SpecialistsHeader.types'
import { Context } from 'index'
import { observer } from 'mobx-react-lite'
import { NotFoundSpecialists } from './NotFoundSpecialists'
import InfiniteScroll from 'react-infinite-scroll-component'
import { initialFilters, sortTypes } from './Specialists.constants'

export const Specialists = observer(() => {
  const { rootStore } = useContext(Context)
  const { specialistsStore } = rootStore
  const {
    specialists,
    specialistsRequested,
    hasMoreSpecialists,
    scrollLoaderVis,
  } = specialistsStore

  const [searchText, setSearchText] = useState('')
  const [favoriteSpecialists, setFavoriteSpecialists] = useState<number[]>([])
  const [activeSort, setActiveSort] = useState<SortType>('relevant')

  const [sortState, setSortState] = useState<SortState>('descend')
  const sortMethods = {
    ascend: {
      method: (a: SpecialistCardType, b: SpecialistCardType) =>
        activeSort && a[`${activeSort}`] > b[`${activeSort}`] ? 1 : -1,
    },
    descend: {
      method: (a: SpecialistCardType, b: SpecialistCardType) =>
        activeSort && a[`${activeSort}`] > b[`${activeSort}`] ? -1 : 1,
    },
  }

  const [isOnlyFavorites, setIsOnlyFavorites] = useState(false)
  const [filters, setFilters] = useState<Filter[]>(initialFilters)
  const [activeFilters, setActiveFilters] = useState<ActiveFilters>({})
  const [hasActiveFilters, setHasActiveFilters] = useState(false)
  const [shouldApplyFilters, setShouldApplyFilters] = useState(false)

  const handleSortClick = (
    e: React.MouseEvent<HTMLButtonElement, globalThis.MouseEvent>,
    idx: number
  ) => {
    const _sort = sortTypes[+idx]
    if (_sort !== activeSort) {
      setActiveSort(_sort)
      setSortState('descend')
    } else {
      setSortState(sortState === 'descend' ? 'ascend' : 'descend')
    }
  }

  useEffect(() => {
    if (!specialistsRequested) {
      specialistsStore.fetchSpecialists('', {}, false, true)
    }
  }, [specialistsStore, specialistsRequested])

  useEffect(() => {
    const { favoriteSpecialists, ...filtersWithoutFavorites } = activeFilters
    const vals = Object.values(filtersWithoutFavorites)
    if (activeFilters && vals.length) {
      setHasActiveFilters(vals.some((arr) => arr.length))
    }
  }, [activeFilters])

  const applyFilters = useCallback(() => {
    const result: ActiveFilters = {}
    filters.map(({ type, values }) => {
      return (result[`${type}`] = values
        .filter((vals) => vals.value)
        .flat()
        .map((val) => val.label))
    })
    if (favoriteSpecialists?.length) {
      result.favoriteSpecialists = isOnlyFavorites
        ? favoriteSpecialists.map((spec) => String(spec))
        : []
    }
    setActiveFilters(result)
    specialistsStore.setShouldSendRequest(true)
  }, [favoriteSpecialists, filters, isOnlyFavorites, specialistsStore])

  const clearFilters = () => {
    const result: ActiveFilters = {}
    filters.map((f) => (result[`${f.type}`] = []))
    if (favoriteSpecialists?.length) {
      result.favoriteSpecialists = isOnlyFavorites
        ? favoriteSpecialists.map((spec) => String(spec))
        : []
    }

    setActiveFilters(result)

    setFilters(
      filters.map((filter) => ({
        ...filter,
        values: filter.values.map((val) => ({
          ...val,
          value: false,
        })),
      }))
    )
    rootStore.specialistsStore.setShouldSendRequest(true)
  }

  useEffect(() => {
    if (shouldApplyFilters) {
      applyFilters()
      setShouldApplyFilters(false)
    }
  }, [isOnlyFavorites, applyFilters, favoriteSpecialists, shouldApplyFilters])

  useEffect(() => {
    if (specialistsStore.shouldSendRequest) {
      specialistsStore.fetchSpecialists(searchText, activeFilters)
    }
  }, [activeFilters, specialistsStore, searchText])

  const fetchMoreSpecialists = () => {
    if (hasMoreSpecialists) {
      specialistsStore.fetchSpecialists(searchText, activeFilters, true)
    }
  }

  const specialistHeaderProps = {
    favoriteSpecialists,
    searchText,
    setSearchText,
    setActiveSort,
    sortTypes,
    sortState,
    activeSort,
    handleSortClick,
    filters,
    setFilters,
    isOnlyFavorites,
    setIsOnlyFavorites,
    applyFilters,
    clearFilters,
    activeFilters,
    hasActiveFilters,
    shouldApplyFilters,
    setShouldApplyFilters,
  }

  return (
    <S.Container sx={{ mt: 6 }}>
      <SpecialistsHeader
        specialistsAmount={specialists.length}
        {...specialistHeaderProps}
      />
      <Box width='100%'>
        <InfiniteScroll
          dataLength={specialists?.length}
          next={fetchMoreSpecialists}
          hasMore={hasMoreSpecialists}
          loader={null}
        >
          <Grid container justifyContent='center' sx={{ mb: 4 }} spacing={3}>
            {[...specialists]
              ?.sort(sortMethods[`${sortState}`].method)
              .map((spec, idx) => (
                <Grid key={`${spec.uid}`} item xs={3}>
                  <SpecialistCard
                    isOnlyFavorites={isOnlyFavorites}
                    setIsOnlyFavorites={setIsOnlyFavorites}
                    applyFilters={applyFilters}
                    favoriteSpecialists={favoriteSpecialists}
                    setFavoriteSpecialists={setFavoriteSpecialists}
                    data={spec}
                    testId={idx}
                  />
                </Grid>
              ))}
          </Grid>
        </InfiniteScroll>
        {scrollLoaderVis && (
          <Box sx={{ mb: 3 }}>
            <S.Loader />
          </Box>
        )}
        {!specialists.length && specialistsRequested && <NotFoundSpecialists />}
      </Box>
    </S.Container>
  )
})
