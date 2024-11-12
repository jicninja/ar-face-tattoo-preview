import { useState, useEffect, useRef } from 'react'
import { Stack, H6, useDebounce } from 'tamagui'
import { RecordButton } from '@my/ui'
import Voice from '@react-native-voice/voice'

const VoiceToText = ({ onVoice }) => {
  const isReady = useRef(false)
  const [isListening, setIsListening] = useState(false)
  const [note, setNote] = useState('')

  const safeOnVoice = useDebounce(onVoice, 300)

  useEffect(() => {
    if (!isReady.current) {
      Voice.onSpeechResults = async (event: { value: string[] }) => {
        setNote(event.value[0])
      }
    }

    isReady.current = true

    return () => {
      Voice.destroy().then(Voice.removeAllListeners)
    }
  }, [])

  const startListening = async () => {
    setIsListening(true)
    try {
      await Voice.start('es-ES')
    } catch (error) {
      console.error(error)
    }
  }

  const stopListening = async () => {
    setIsListening(false)
    try {
      await Voice.stop()

      await new Promise((resolve) => setTimeout(resolve, 200))

      if (note.length) {
        safeOnVoice(note)
      }
    } catch (error) {
      console.error(error)
    }
  }

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

export { VoiceToText }
