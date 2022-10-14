import {
  Box,
  Checkbox,
  Collapse,
  Fade,
  FormControlLabel,
  FormGroup,
  List,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material'
import React, {
  useState,
  MouseEvent,
  ChangeEvent,
  useMemo,
  useCallback,
} from 'react'
import { SpecialistsFilterProps } from './SpecialistsHeader.types'
import * as S from './SpecialistsHeader.styled'
import { useTranslation } from 'react-i18next'
import { ChevronRightOutlined, ExpandMore } from '@mui/icons-material'

export const SpecialistsFilter = ({
  anchorEl,
  setAnchorEl,
  filters,
  setFilters,
  clearFilters,
  hasActiveFilters,
  applyAndCloseFilters,
  specialistsAmount,
}: SpecialistsFilterProps) => {
  const { t } = useTranslation()

  const [openedFilters, setOpenedFilters] = useState<number[]>([])

  const expandFilter = (
    e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>,
    idx: number
  ) => {
    setOpenedFilters([idx, ...openedFilters])
  }

  const collapseFilter = useCallback(
    (idx: number) => {
      setOpenedFilters(openedFilters.filter((filter) => filter !== idx))
    },
    [setOpenedFilters, openedFilters]
  )

  const handleChange = (
    e: ChangeEvent<HTMLInputElement>,
    prevValue: boolean,
    prevFilterIdx: number,
    prevValueIdx: number
  ) => {
    setFilters(
      filters.map((filter, filterIdx) =>
        filterIdx === prevFilterIdx
          ? {
              ...filter,
              values: filter.values.map((val, valIdx) =>
                valIdx === prevValueIdx
                  ? {
                      ...val,
                      value: !prevValue,
                    }
                  : val
              ),
            }
          : filter
      )
    )
  }

  const hasFilters =
    useMemo(() => {
      return filters.some((f) => f.values.some((val) => val.value))
    }, [filters]) || hasActiveFilters

  const collapseEmptyFilters = () => {
    const filtersWithSelectedVals: number[] = []
    filters.forEach((f, idx) => {
      if (f.values.some((val) => val.value)) {
        filtersWithSelectedVals.push(idx)
      }
    })
    setOpenedFilters(filtersWithSelectedVals)
  }

  const handleClose = () => {
    collapseEmptyFilters()
    setAnchorEl(null)
  }

  const handleApplyFilters = () => {
    collapseEmptyFilters()
    applyAndCloseFilters()
  }

  const handleClearFilters = () => {
    setOpenedFilters([])
    clearFilters()
  }

  return (
    <S.MenuWrapper
      elevation={8}
      data-testid='specialistsFilters'
      anchorEl={anchorEl}
      open={!!anchorEl}
      onClose={handleClose}
      TransitionComponent={Fade}
    >
      <S.MenuInner>
        <S.MenuHeader>
          <Typography>{t('specialistsFilter.filter')}</Typography>
          <S.Subheader direction='row' spacing={0.5}>
            <Typography>{t('specialistsFilter.found')}</Typography>
            <Typography>{specialistsAmount}</Typography>
            <Typography>{t('specialistsFilter.specialists')}</Typography>
          </S.Subheader>
          <S.DividerWithMargin />
        </S.MenuHeader>

        <List
          sx={{ padding: 0 }}
          component='nav'
          aria-labelledby='nested-list-subheader'
        >
          {filters.map((filter, filterIdx) => (
            <Box key={filter.type}>
              {openedFilters.includes(filterIdx) ? (
                <S.FilterButton
                  onClick={() => collapseFilter(filterIdx)}
                  data-testid={`${filter.type}_opened`}
                >
                  <ExpandMore />
                  <ListItemText
                    primary={t(`specialistsFilter.${filter.type}`)}
                  />
                </S.FilterButton>
              ) : (
                <S.FilterButton
                  onClick={(e) => expandFilter(e, filterIdx)}
                  data-testid={`${filter.type}_closed`}
                >
                  <ChevronRightOutlined />
                  <ListItemText
                    primary={t(`specialistsFilter.${filter.type}`)}
                  />
                </S.FilterButton>
              )}
              <Collapse
                in={openedFilters.includes(filterIdx)}
                timeout='auto'
                unmountOnExit
              >
                <FormGroup sx={{ pl: 5 }}>
                  {filter.values.map(({ value, label }, valueIdx) => (
                    <FormControlLabel
                      data-testid={`${label}_${value}`}
                      key={label}
                      control={
                        <Checkbox
                          onChange={(e) =>
                            handleChange(e, value, filterIdx, valueIdx)
                          }
                          checked={value}
                        />
                      }
                      label={t(`specialistsFilter.${label}`)}
                    />
                  ))}
                </FormGroup>
              </Collapse>
            </Box>
          ))}
        </List>

        <Stack>
          <S.DividerWithMargin />
          {hasFilters ? (
            <Stack direction='row' justifyContent='space-between'>
              <S.Button
                sx={{ ml: 2 }}
                onClick={handleClearFilters}
                data-testid='clearFiltersBtn'
              >
                {t('specialistsFilter.clear')}
              </S.Button>
              <S.Button
                data-testid='applyFiltersBtn'
                variant='contained'
                sx={{ mr: 2 }}
                onClick={handleApplyFilters}
              >
                {t('specialistsFilter.apply')}
              </S.Button>
            </Stack>
          ) : (
            <S.Button
              data-testid='applyFiltersBtn'
              variant='contained'
              disabled
              sx={{ mr: 2, alignSelf: 'flex-end' }}
            >
              {t('specialistsFilter.apply')}
            </S.Button>
          )}
        </Stack>
      </S.MenuInner>
    </S.MenuWrapper>
  )
}
