import { FloatingHeading, Author, Spinner, isWeb } from '@my/ui'

import { useARCamera } from '../../hooks/useARCamera'
import { usePostMessage } from '../../hooks/usePostMessage'

import { useEffect } from 'react'

import Canvas from './components/canvas'
import CoreScripts from './components/coreScripts'
import VoiceToText from './components/voiceToText'

const CANVAS_CAMERA_ID = 'WebARRocksFaceCanvasVideo'
const CANVAS_EFFECT_ID = 'WebARRocksFaceCanvasAR'

declare global {
  interface Window {
    ReactNativeWebView: {
      postMessage: (data: string) => void
    }
  }
}

export default function Page() {
  usePostMessage({
    onMessage: ({ data }) => {
      imagineTattoo(data)
    },
  })

  const { isTextureLoading, imagineTattoo } = useARCamera({
    canvasCameraId: CANVAS_CAMERA_ID,
    canvasEffectId: CANVAS_EFFECT_ID,
  })

  const handleVoice = (speech: string) => {
    imagineTattoo(speech.replaceAll(' ', '_'))
  }

  useEffect(() => {
    if (!isTextureLoading) {
      window?.ReactNativeWebView?.postMessage('isTextureLoading')
    }
  }, [isTextureLoading])

  return (
    <>
      <CoreScripts />

      <FloatingHeading />

      {isTextureLoading ? (
        <Spinner
          enterStyle={{
            opacity: 0,
            scale: 0,
          }}
          animation={'1000ms'}
          color={'$white1'}
          position="absolute"
          right={'$4'}
          top={'$4'}
          zIndex={2}
          size={'large'}
        />
      ) : null}
      <Author />

      {isWeb ? <VoiceToText disabled={isTextureLoading} onVoice={handleVoice} /> : null}

      <Canvas overlay id={CANVAS_EFFECT_ID} />
      <Canvas id={CANVAS_CAMERA_ID} />
    </>
  )
}
