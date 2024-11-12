import { FloatingHeading, Author } from '@my/ui'

import { useARCamera } from '../../hooks/useARCamera'
import { usePostMessage } from '../../hooks/usePostMessage'

import Canvas from './components/canvas'
import CoreScripts from './components/coreScripts'

import { Spinner } from 'tamagui'

const CANVAS_CAMERA_ID = 'WebARRocksFaceCanvasVideo'
const CANVAS_EFFECT_ID = 'WebARRocksFaceCanvasAR'

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

  return (
    <>
      <CoreScripts />

      <FloatingHeading />

      {isTextureLoading ? (
        <Spinner
          color={'$white1'}
          position="absolute"
          right={'$4'}
          top={'$4'}
          zIndex={2}
          size={'large'}
        />
      ) : null}
      <Author />

      <Canvas overlay id={CANVAS_EFFECT_ID} />
      <Canvas id={CANVAS_CAMERA_ID} />
    </>
  )
}
