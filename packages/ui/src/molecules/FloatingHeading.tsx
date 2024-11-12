import { Logo } from '../atoms/Logo'
import { Stack, H5 } from 'tamagui'
import { Platform } from 'react-native'

export const FloatingHeading = () => {
  return (
    <Stack padding={'$4'} position={Platform.OS === 'web' ? 'fixed' : 'absolute'} zIndex={2}>
      <Stack width={196} aspectRatio={128 / 15}>
        <Logo />
        <H5 color={'white'}>AR Face Tattoo</H5>
      </Stack>
    </Stack>
  )
}
