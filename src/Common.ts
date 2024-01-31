export const zeroFill = (md: number, num: number) => {
  return ( '00' + (md + num) ).slice( -2 )
}