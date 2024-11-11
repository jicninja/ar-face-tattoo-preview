import { Stack } from 'expo-router'
import { ARView } from './components/webview'

export default function Screen() {
  return (
    <>
      <Stack.Screen
        options={{
          title: 'AR Face Tattoo',
          animation: 'slide_from_right',
          gestureEnabled: false,
        }}
      />
      <ARView />
    </>
  )
}
