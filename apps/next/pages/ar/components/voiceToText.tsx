import { useState, useEffect, useRef, useCallback } from 'react'
import { Stack, H6, useDebounce, RecordButton } from '@my/ui'

const VoiceToText = () => {
  const isReady = useRef(false)
  const [note, setNote] = useState('')

  const startListening = useCallback(() => {}, [])

  const stopListening = useCallback(() => {}, [])

  useEffect(() => {
    if (!isReady.current) {
    }

    isReady.current = true
  }, [])

  return (
    <Stack
      zIndex={2}
      position={'absolute'}
      width={'100%'}
      alignItems={'center'}
      bottom={'$10'}
      gap={'$2'}
    >
      {note ? <H6 fontSize={'$1'}>{note}</H6> : null}

      <RecordButton onPress={startListening} onRelease={stopListening} />
    </Stack>
  )
}

export default VoiceToText
