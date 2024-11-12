import { Stack, H6 } from 'tamagui'
import { Platform } from 'react-native'

export const Author = () => {
  return (
    <Stack
      opacity={0.5}
      zIndex={2}
      bottom={0}
      position={Platform.OS === 'web' ? 'fixed' : 'absolute'}
      right={0}
      padding={'$4'}
    >
      <H6>by Ignacio Castro</H6>
    </Stack>
  )
}
