export interface SpecialistCardType {
  uid: number
  firstName: string
  lastName: string
  photo: string
  specialization: string
  price: number
  experience: number
  dateOfBirth: number
  hasChildren?: string
  maritalStatus?: string
  gender: string
  city: string
  rating: number
  possibleNames: string[]
  relevant: number
  [k: string]: string | number | JSX.Element | string[] | undefined
}

export type SortState = 'ascend' | 'descend'
export interface ActiveFilters {
  [k: string]: string[]
}
export interface FiltersWithRange {
  [k: string]: number
}
