import { SpecialistCardType } from 'pages/Specialists/Specialists.types'

export interface ISpecialistCard {
  favoriteSpecialists: number[]
  setFavoriteSpecialists: (favoriteSpecialists: number[]) => void
  data: SpecialistCardType
  testId: number
  applyFilters: () => void
  isOnlyFavorites: boolean
  setIsOnlyFavorites: (isOnlyFavotires: boolean) => void
}
