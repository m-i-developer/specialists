import { rest } from 'msw'
import { SPECIALISTS } from 'store/utils/apiConstants'
import avatar0 from 'assets/images/avatar0.jpg'
import avatar1 from 'assets/images/avatar1.jpg'
import avatar2 from 'assets/images/avatar2.jpg'

const unAuth = false
const successfullyRequested = true

const firstNames = [
  'Анатолий Валерьевич',
  'Диана Владимировна',
  'Константин Юрьевич',
]
const lastNames = ['Иванов', 'Петрова', 'Сидоров']
const specializations = [
  'psychologist',
  'clinicalPsychologist',
  'psychotherapist',
]
const experiences = [5, 3, 15]
const prices = [2500, 3000, 7500]
const ratings = [5, 3, 4]
const relevant = [2, 3, 1]
const genders = ['male', 'female', 'male']
const maritalStatus = ['notMarried', 'unset', 'married']
const hasChildren = ['unset', 'has', 'hasnt']
const city = ['Moscow', 'Kirov', 'Tomsk']
const dateOfBirth = [38, 24, 33]

const createDTO = () =>
  Array(20)
    .fill(true)
    .map((_bool) => {
      const index = Math.floor(Math.random() * 3)

      const getAvatarByIdx = (id) => {
        switch (id) {
          case 0:
            return avatar0
          case 1:
            return avatar1
          default:
            return avatar2
        }
      }

      const [firstName, fatherName] = firstNames[+index].split(' ')
      const lastName = lastNames[+index]

      const possibleNames = [
        `${firstName} ${fatherName} ${lastName}`.toLowerCase(),
        `${firstName} ${lastName} ${fatherName}`.toLowerCase(),
        `${lastName} ${firstName} ${fatherName}`.toLowerCase(),
        `${lastName} ${fatherName} ${firstName}`.toLowerCase(),
        `${fatherName} ${firstName} ${lastName}`.toLowerCase(),
        `${fatherName} ${lastName} ${firstName}`.toLowerCase(),
      ]

      return {
        id: index,
        photo: getAvatarByIdx(index),
        uid: Math.random(),
        firstName: `${firstName} ${fatherName}`,
        lastName,
        specialization: specializations[+index],
        experience: experiences[+index],
        price: prices[+index],
        rating: ratings[+index],
        gender: genders[+index],
        dateOfBirth: dateOfBirth[+index],
        city: city[+index],
        maritalStatus: maritalStatus[+index],
        hasChildren: hasChildren[+index],
        possibleNames,
        relevant: relevant[+index],
      }
    })

const getConditionsWithRange = (specData, activeFilters) => {
  const result = []
  const rangeFilters = {
    price: activeFilters?.price,
    experience: activeFilters?.experience,
    dateOfBirth: activeFilters?.dateOfBirth,
    rating: activeFilters?.rating,
  }
  Object.entries(rangeFilters).forEach(([filterName, val]) => {
    if (val?.length) {
      result.push(
        val.some((interval) => {
          const range = interval.split('-')
          return (
            +range[0] <= specData[`${filterName}`] &&
            specData[`${filterName}`] <= +range[1]
          )
        })
      )
    }
  })

  return result
}

const getFilters = (spec, filters) => {
  if (
    !Object.keys(filters).length ||
    Object.values(filters).every((arr) => !arr.length)
  ) {
    return true
  }
  const {
    id,
    uid,
    photo,
    firstName,
    lastName,
    possibleNames,
    relevant,
    ...possibleFilters
  } = spec

  const { price, experience, dateOfBirth, rating, ...simpleFilters } =
    possibleFilters
  const filtersWithRange = { price, experience, dateOfBirth, rating }

  const simpleConditions = []
  for (const simpleFilter in simpleFilters) {
    if (filters[`${simpleFilter}`]?.length) {
      const condition = filters[`${simpleFilter}`]?.includes(
        spec[`${simpleFilter}`]
      )
      simpleConditions.push(condition)
    }
  }

  if (filters?.favoriteSpecialists?.length) {
    simpleConditions.push(
      filters.favoriteSpecialists.includes(String(spec.uid))
    )
  }

  const conditionsWithRange = getConditionsWithRange(filtersWithRange, filters)

  return [...simpleConditions, ...conditionsWithRange].every((cond) => cond)
}

const result = createDTO()

export const specialistsHandlers = [
  rest.post(`${SPECIALISTS}`, async (req, res, ctx) => {
    const { searchText, activeFilters, isScroll } = await req.json()

    if (isScroll) {
      result.push(...createDTO())
    }

    const filteredSpecs = result.filter((spec) =>
      spec.possibleNames.some((name) => name.includes(searchText.toLowerCase()))
    )

    const getSpecs = () => {
      if (searchText === '') {
        return result.filter((spec) => getFilters(spec, activeFilters))
      }

      if (filteredSpecs.length) {
        return filteredSpecs.filter((spec) => getFilters(spec, activeFilters))
      }
      return []
    }

    if (unAuth) {
      return res(ctx.status(401))
    }

    if (successfullyRequested) {
      return res(
        ctx.status(200),
        ctx.json({
          specialists: getSpecs(),
        })
      )
    }
  }),
]
