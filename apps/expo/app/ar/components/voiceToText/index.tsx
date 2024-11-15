import { useState, useEffect, useRef } from 'react'
import { Stack, H6, RecordButton } from '@my/ui'
import Voice from '@react-native-voice/voice'
import { Platform, NativeModules } from 'react-native'

const deviceLanguage =
  Platform.OS === 'ios'
    ? NativeModules.SettingsManager.settings.AppleLocale ||
      NativeModules.SettingsManager.settings.AppleLanguages[0]
    : NativeModules.I18nManager.localeIdentifier

type VoiceToTextProps = {
  onVoice: (speech: string) => void
  disabled?: boolean
}

const VoiceToText = ({ onVoice, disabled }: VoiceToTextProps) => {
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

  const lang = deviceLanguage.replaceAll('_', '-')

  const startListening = async () => {
    try {
      setIsListening(true)
      await Voice.start(lang)
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
      gap={'$4'}
    >
      {note ? <H6 fontSize={'$3'}>{note}</H6> : null}

      <RecordButton disabled={disabled} onPress={startListening} onRelease={stopListening} />
    </Stack>
  )
}

export { VoiceToText }
