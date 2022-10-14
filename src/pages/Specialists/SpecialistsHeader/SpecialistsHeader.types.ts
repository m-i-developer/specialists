import {
  ActiveFilters,
  SpecialistCardType,
} from 'pages/Specialists/Specialists.types'
import { Dispatch, SetStateAction, MouseEvent, ChangeEvent } from 'react'

export type SortType = 'relevant' | 'experience' | 'price' | 'rating'
export type VisibilityType = 'sorting' | 'search' | 'symptoms'
export type FilterAnchorEl = HTMLElement | null
export interface SpecialistsFilterProps {
  favoriteSpecialists: number[]
  applyAndCloseFilters: () => void
  hasActiveFilters: boolean
  specialistsAmount: number
  filters: Filter[]
  setFilters: Dispatch<SetStateAction<Filter[]>>
  anchorEl: FilterAnchorEl
  setAnchorEl: (anchorEL: FilterAnchorEl) => void
  clearFilters: () => void
}
export interface FilterValue {
  label: string
  value: boolean
}
export interface Filter {
  type: string
  values: FilterValue[]
}

export interface SpecialistsHeaderProps {
  shouldApplyFilters: boolean
  setShouldApplyFilters: Dispatch<SetStateAction<boolean>>
  favoriteSpecialists: number[]
  specialistsAmount: number
  searchText: string
  sortTypes: SortType[]
  activeSort: SortType | undefined
  sortState: string
  filters: Filter[]
  hasActiveFilters: boolean
  isOnlyFavorites: boolean
  setIsOnlyFavorites: Dispatch<SetStateAction<boolean>>
  setFilters: Dispatch<SetStateAction<Filter[]>>
  setActiveSort: Dispatch<SetStateAction<SortType>>
  setSearchText: (query: string) => void | SpecialistCardType[]
  applyFilters: () => void
  clearFilters: () => void
  activeFilters: ActiveFilters
  handleSortClick: (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>,
    idx: number
  ) => void
}
export interface SymptomsBlockProps {
  chosenSymptoms: number[]
  setChosenSymptoms: Dispatch<SetStateAction<number[]>>
  handleSymptomsBtnClick: () => void
}

export interface SortingBlockProps {
  shouldApplyFilters: boolean
  handleClickOnlyFavorites: () => void
  activeSort: SortType | undefined
  sortState: string
  sortTypes: SortType[]
  isOnlyFavorites: boolean
  favoriteSpecialists: number[]
  applyFilters: () => void
  handleSortClick: (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>,
    idx: number
  ) => void
  handleSearchVis: (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>,
    closeSearch?: boolean
  ) => void
}

export interface SearchBlockProps {
  handleClickOnlyFavorites: () => void
  isOnlyFavorites: boolean
  favoriteSpecialists: number[]
  searchText: string
  handleSearchChange: (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void
  handleSearchVis: (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>,
    closeSearch?: boolean
  ) => void
}

export interface SymptomsBtnProps {
  hasChosenSymptoms: boolean
  handleSymptomsBtnClick: () => void
}
