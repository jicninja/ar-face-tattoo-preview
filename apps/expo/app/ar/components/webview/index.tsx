import { WebView } from 'react-native-webview'
import { StyleSheet } from 'react-native'
import { Stack } from 'tamagui'

const URL = 'https://www.arfacetattoo.online/ar'

export const ARView = () => {
  return (
    <Stack pointerEvents={'none'} flex={1}>
      <WebView style={styles.webview} source={{ uri: URL }} />
    </Stack>
  )
}

const styles = StyleSheet.create({
  webview: {
    flex: 1,
  },
})
