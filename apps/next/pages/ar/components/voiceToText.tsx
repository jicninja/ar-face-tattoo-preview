import { useState, useEffect, useRef } from 'react'
import { Stack, H6, RecordButton } from '@my/ui'

declare global {
  interface Window {
    SpeechRecognition: any
    webkitSpeechRecognition: any
  }
}

type VoiceToTextProps = {
  onVoice: (speech: string) => void
}

const VoiceToText = ({ onVoice }: VoiceToTextProps) => {
  const isReady = useRef(false)
  const [isListening, setIsListening] = useState(false)

  const recognitionRef = useRef<typeof window.SpeechRecognition>(null)
  const [note, setNote] = useState('')

  const startListening = () => {
    setIsListening(true)
    recognitionRef.current?.start()
  }

  const stopListening = async () => {
    recognitionRef.current?.stop()
    setIsListening(false)
  }

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

export default VoiceToText
