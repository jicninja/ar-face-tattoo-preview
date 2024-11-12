import { useState, useEffect, useRef, useCallback } from 'react'
import { Stack, H6, useDebounce, RecordButton } from '@my/ui'

declare global {
  interface Window {
    SpeechRecognition: any
    webkitSpeechRecognition: any
  }
}

type VoiceToTextProps = {
  onSpeechEnds?: (speech: string) => void
}

const VoiceToText = ({ onSpeechEnds = () => {} }: VoiceToTextProps) => {
  const isReady = useRef(false)

  const recognitionRef = useRef<typeof window.SpeechRecognition>(null)
  const [note, setNote] = useState('')

  const safeCallback = useDebounce(onSpeechEnds, 200)

  const startListening = useCallback(() => {
    recognitionRef.current?.start()
  }, [])

  const stopListening = useCallback(async () => {
    recognitionRef.current?.stop()

    await new Promise((resolve) => setTimeout(resolve, 200))

    safeCallback?.(note)
  }, [])

  useEffect(() => {
    if (isReady.current) {
      return
    }
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition

    recognitionRef.current = new SpeechRecognition()

    const recognition = recognitionRef.current as typeof SpeechRecognition

    recognition.lang = 'en-US'
    recognition.continuous = true

    recognition.onresult = (event: any) => {
      const transcript = event.results[event.resultIndex][0].transcript
      setNote(transcript)
    }

    recognition.onerror = (event: any) => {
      console.error('Error occurred in recognition: ' + event.error)
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
