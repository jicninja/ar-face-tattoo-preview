import { Button } from 'tamagui'
import { useState, useCallback } from 'react'
import { Mic, CircleStop } from '@tamagui/lucide-icons'

type RecordButtonProps = {
  onPress: () => void
  onRelease: () => void
}

export const RecordButton = ({ onRelease, onPress }: RecordButtonProps) => {
  const [isRecording, setIsRecording] = useState(false)

  const handlePressIn = useCallback(() => {
    setIsRecording(true)
    onPress()
  }, [onPress])

  const handlePressOut = useCallback(() => {
    setIsRecording(false)
    onRelease()
  }, [onRelease])

  return (
    <Button
      backgroundColor={'$green10Dark'}
      width={'$8'}
      height={'$8'}
      size={'$7'}
      borderRadius={'$12'}
      onPressOut={handlePressOut}
      onPressIn={handlePressIn}
      icon={isRecording ? CircleStop : Mic}
    />
  )
}
