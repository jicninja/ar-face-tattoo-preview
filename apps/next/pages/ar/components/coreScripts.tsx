import Script from 'next/script'

const CoreScripts = () => (
  <>
    <Script src={'./js/WebARRocksFace.js'} async type="text/javascript"></Script>
    <Script src={'./js/WebARRocksFaceShape2DHelper.js'} async type="text/javascript"></Script>
    <Script src={'./js/WebARRocksLMStabilizer2.js'} async type="text/javascript"></Script>
    <Script src={'./js/WebARRocksResizer.js'} async type="text/javascript"></Script>
  </>
)

export default CoreScripts
