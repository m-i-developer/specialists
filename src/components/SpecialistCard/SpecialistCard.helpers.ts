export const getExperience = (exp: number) => {
  const ending = exp % 10

  switch (true) {
    case ending === 1:
      return `Опыт ${exp} год`
    case ending > 1 && ending < 5:
      return `Опыт ${exp} года`
    default:
      return `Опыт ${exp} лет`
  }
}
