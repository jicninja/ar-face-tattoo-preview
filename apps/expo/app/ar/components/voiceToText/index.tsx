import { useState, useEffect } from 'react'
import { View, Text, Button } from 'react-native'
import { Stack } from 'tamagui'
import Voice from '@react-native-voice/voice'

const VoiceToText = () => {
  const [isListening, setIsListening] = useState(false)
  const [note, setNote] = useState('')

  useEffect(() => {
    // Set up event listeners
    Voice.onSpeechResults = (event) => {
      setNote(event.value[0]) // Capture the recognized speech
      stopListening()
    }

    return () => {
      // Clean up listeners on unmount
      Voice.destroy().then(Voice.removeAllListeners)
    }
  }, [])

  const startListening = async () => {
    setIsListening(true)
    try {
      await Voice.start('en-US') // Start listening in English
    } catch (error) {
      console.error(error)
    }
  }

  const stopListening = async () => {
    setIsListening(false)
    try {
      await Voice.stop() // Stop listening
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Stack zIndex={2} style={{ padding: 20 }}>
      <Text style={{ fontSize: 20 }}>{isListening ? 'Listening...' : 'Say something!'}</Text>
      {note ? <Text style={{ fontSize: 18 }}>You said: {note}</Text> : null}
      <Button
        title={isListening ? 'Stop Listening' : 'Start Listening'}
        onPress={isListening ? stopListening : startListening}
      />
    </Stack>
  )
}

export { VoiceToText }
