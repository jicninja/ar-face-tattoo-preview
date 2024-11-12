import { WebView } from 'react-native-webview'
import { StyleSheet } from 'react-native'
import { useRef } from 'react'
import { VoiceToText } from '../voiceToText'

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

  const sendDataToWebView = (message: string) => {
    webviewRef.current?.injectJavaScript(getInjectableJSMessage(message))
  }

  return (
    <>
      <VoiceToText onVoice={(text) => sendDataToWebView(text.replaceAll(' ', '_'))} />
      <WebView ref={webviewRef} javaScriptEnabled style={styles.webview} source={{ uri: URL }} />
    </>
  )
}

const styles = StyleSheet.create({
  webview: {
    flex: 1,
  },
})
