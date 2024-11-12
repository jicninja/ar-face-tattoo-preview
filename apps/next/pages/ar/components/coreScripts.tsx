import Script from 'next/script'

const CoreScripts = () => (
  <>
    <Script
      src={'./js/WebARRocksFace.js'}
      strategy="beforeInteractive"
      type="text/javascript"
    ></Script>
    <Script
      src={'./js/WebARRocksFaceShape2DHelper.js'}
      strategy="beforeInteractive"
      type="text/javascript"
    ></Script>
    <Script
      src={'./js/WebARRocksLMStabilizer2.js'}
      strategy="beforeInteractive"
      type="text/javascript"
    ></Script>
    <Script
      src={'./js/WebARRocksResizer.js'}
      strategy="beforeInteractive"
      type="text/javascript"
    ></Script>
  </>
)

export default CoreScripts
