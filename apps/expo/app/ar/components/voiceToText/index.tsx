import { useState, useEffect, useRef } from 'react'
import { Stack, H6, RecordButton } from '@my/ui'
import Voice from '@react-native-voice/voice'

const VoiceToText = ({ onVoice }) => {
  const isReady = useRef(false)
  const [isListening, setIsListening] = useState(false)
  const [note, setNote] = useState('')

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
    try {
      setIsListening(true)
      await Voice.start('en-US')
    } catch (error) {
      console.error(error)
    }
  }

  const stopListening = async () => {
    try {
      await Voice.stop()
      setIsListening(false)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    if (note && note.length && !isListening) {
      onVoice(note)
    }
  }, [note, isListening])

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
