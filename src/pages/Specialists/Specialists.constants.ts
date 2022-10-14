import { SortType } from 'pages/Specialists/SpecialistsHeader/SpecialistsHeader.types'

export const initialFilters = [
  {
    type: 'specialization',
    values: [
      { label: 'psychologist', value: false },
      {
        label: 'clinicalPsychologist',
        value: false,
      },
      { label: 'psychotherapist', value: false },
    ],
  },
  {
    type: 'price',
    values: [
      { label: '0-3000', value: false },
      { label: '3000-5000', value: false },
      { label: '5000-100000', value: false },
    ],
  },
  {
    type: 'experience',
    values: [
      { label: '1-3', value: false },
      { label: '3-5', value: false },
      { label: '5-120', value: false },
    ],
  },
  {
    type: 'rating',
    values: [
      { label: '3-6', value: false },
      { label: '4-6', value: false },
      { label: '5-6', value: false },
    ],
  },
  {
    type: 'gender',
    values: [
      { label: 'male', value: false },
      { label: 'female', value: false },
    ],
  },
  {
    type: 'dateOfBirth',
    values: [
      { label: '18-30', value: false },
      { label: '30-50', value: false },
      {
        label: '50-120',
        value: false,
      },
    ],
  },
  {
    type: 'city',
    values: [
      { label: 'Moscow', value: false },
      { label: 'Kirov', value: false },
      { label: 'Tomsk', value: false },
    ],
  },
  {
    type: 'maritalStatus',
    values: [
      {
        label: 'notMarried',
        value: false,
      },
      { label: 'married', value: false },
    ],
  },
  {
    type: 'hasChildren',
    values: [
      { label: 'has', value: false },
      { label: 'hasnt', value: false },
    ],
  },
]

export const sortTypes = [
  'relevant',
  'experience',
  'price',
  'rating',
] as SortType[]
