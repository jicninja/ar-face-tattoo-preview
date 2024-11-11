import { Logo } from '../atoms/Logo'
import { Stack, H5 } from 'tamagui'

export const FloatingHeading = () => {
  return (
    <Stack padding={'$4'}>
      <Stack width={196} aspectRatio={128 / 15} zIndex={2}>
        <Logo />
        <H5 color={'white'}>AR Face Tattoo</H5>
      </Stack>
    </Stack>
  )
}
