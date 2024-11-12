import { WebView } from 'react-native-webview'
import { StyleSheet } from 'react-native'

const URL = 'https://www.arfacetattoo.online/ar'

export const ARView = () => {
  return (
    <WebView
      originWhitelist={['*']}
      injectedJavaScript={INJECTED_JAVASCRIPT}
      onMessage={(event) => {
        const data = JSON.parse(event.nativeEvent.data)

        console.log('debug---->', data)
      }}
      style={styles.webview}
      source={{ uri: URL }}
    />
  )
}

const styles = StyleSheet.create({
  webview: {
    flex: 1,
  },
})
