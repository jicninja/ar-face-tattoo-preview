import { Button, Stack, AnimatePresence, useEvent, isWeb } from 'tamagui'
import { useState, useEffect } from 'react'
import { Mic, CircleStop } from '@tamagui/lucide-icons'

type RecordButtonProps = {
  onPress: () => void
  onRelease: () => void
  disabled?: boolean
}

export const RecordButton = ({ onRelease, onPress, disabled }: RecordButtonProps) => {
  const [isRecording, setIsRecording] = useState(false)
  const [isLooping, setIsLooping] = useState(false)

  useEffect(() => {
    const recursive = async () => {
      if (isRecording) {
        setIsLooping(true)

        await new Promise((resolve) => setTimeout(resolve, 1000))
        setIsLooping(false)

        await new Promise((resolve) => setTimeout(resolve, 1000))
        recursive()
      }
    }

    recursive()

    if (!isRecording) {
      setIsLooping(false)
    }
  }, [isRecording])

  const handlePressIn = useEvent(() => {
    setIsRecording(true)
    onPress()
  })

  const handlePressOut = useEvent(() => {
    setIsRecording(false)
    onRelease()
  })

  return (
    <Stack position={'relative'}>
      <Button
        disabled={disabled}
        zIndex={'$zIndex.1'}
        backgroundColor={disabled ? '$gray1' : '$green10Dark'}
        width={'$8'}
        height={'$8'}
        padding={'$0'}
        size={'$9'}
        borderRadius={'$12'}
        onPressOut={handlePressOut}
        onPressIn={handlePressIn}
        icon={isRecording ? CircleStop : Mic}
      />
      <AnimatePresence>
        {isRecording && isLooping ? (
          <Stack
            position={isWeb ? 'fixed' : 'absolute'}
            borderWidth={'$1'}
            borderColor={'$white1'}
            width={'$8'}
            height={'$8'}
            borderRadius={'$12'}
            opacity={1}
            enterStyle={{
              scale: 1,
              opacity: 0,
            }}
            exitStyle={{
              opacity: 0,
              scale: 1.5,
            }}
            scale={isLooping ? 1.4 : 1}
            animation={isLooping ? '1000ms' : '100ms'}
          />
        ) : null}
      </AnimatePresence>
    </Stack>
  )
}
