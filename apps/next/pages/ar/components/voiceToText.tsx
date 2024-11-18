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
  disabled?: boolean
}

const VoiceToText = ({ onVoice, disabled }: VoiceToTextProps) => {
  const [isListening, setIsListening] = useState(false)

  const recognitionRef = useRef<typeof window.SpeechRecognition>(null)
  const [note, setNote] = useState('')

  const startListening = () => {
    if (!isListening) {
      console.log('play')

      recognitionRef.current?.start()
    }
  }

  const stopListening = async () => {
    recognitionRef.current?.stop()
    setIsListening(false)
  }

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition

    recognitionRef.current = new SpeechRecognition()

    const recognition = recognitionRef.current as typeof SpeechRecognition

    recognition.lang = navigator.language || 'en-US'
    recognition.continuous = true

    recognition.onresult = (event: any) => {
      const transcript = event.results[event.resultIndex][0].transcript
      setNote(transcript)
    }

    recognition.onstart = () => {
      setIsListening(true)
    }

    recognition.onerror = (event: any) => {
      setIsListening(false)
      console.error('Error occurred in recognition: ' + event.error)
    }
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
      gap={'$4'}
    >
      {note ? <H6 fontSize={'$3'}>{note}</H6> : null}

      <RecordButton disabled={disabled} onPress={startListening} onRelease={stopListening} />
    </Stack>
  )
}

export default VoiceToText
