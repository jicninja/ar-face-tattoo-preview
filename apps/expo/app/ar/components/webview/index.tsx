import { WebView } from 'react-native-webview'
import { StyleSheet } from 'react-native'
import { useRef } from 'react'
import { Button } from 'tamagui'

const URL = 'https://www.arfacetattoo.online/ar'

function getInjectableJSMessage(message) {
  return `
    (function() {
      document.dispatchEvent(new MessageEvent('message', {
        data: ${JSON.stringify(message)}
      }));
    })();
  `
}

export const ARView = () => {
  const webviewRef = useRef<WebView>(null)

  function sendDataToWebView() {
    webviewRef.current?.injectJavaScript(getInjectableJSMessage('Hello'))
  }

  return (
    <>
      <Button onPress={() => sendDataToWebView()}>Enviar mensaje</Button>

      <WebView
        ref={webviewRef}
        javaScriptEnabled
        onMessage={(event) => {
          const data = JSON.parse(event.nativeEvent.data)

          console.log('debug---->', data)
        }}
        style={styles.webview}
        source={{ uri: URL }}
      />
    </>
  )
}

const styles = StyleSheet.create({
  webview: {
    flex: 1,
  },
})
