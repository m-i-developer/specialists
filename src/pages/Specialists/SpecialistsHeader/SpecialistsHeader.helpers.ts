export const getWidth = (idx: number) => {
  if (idx === 0) {
    return '130px'
  }

  return idx === 3 ? '90px' : '75px'
}
