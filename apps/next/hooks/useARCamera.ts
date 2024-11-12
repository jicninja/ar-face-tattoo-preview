import { useEffect, useRef, useState, useCallback } from 'react'
import axios from 'axios'

import { SHAPEFACE } from './constants'

declare global {
  var WebARRocksResizer: any
  var WebARRocksFaceShape2DHelper: any
}

type ArCameraProps = {
  canvasCameraId?: string
  canvasEffectId?: string
}

const useARCamera = ({
  canvasCameraId = 'WebARRocksFaceCanvasVideo',
  canvasEffectId = 'WebARRocksFaceCanvasAR',
}: ArCameraProps) => {
  const isARLoading = useRef<boolean>(true)
  const [isTextureLoading, setIsTextureLoading] = useState<boolean>(false)

  const currentTexture = useRef<WebGLTexture>()

  const imagineTattoo = useCallback(async (prompt: string) => {
    if (isTextureLoading || isARLoading.current || !prompt) {
      return
    }

    setIsTextureLoading(true)

    try {
      const { data } = await axios.get(`./api/imagine?prompt=${prompt}`)

      /*
      currentTexture.current = await WebARRocksFaceShape2DHelper.get_create_glImageTexture()(
        data.image
      )

      */
    } catch (err) {
      console.error(err)
    }

    setIsTextureLoading(false)
  }, [])

  useEffect(() => {
    if (!isARLoading.current) {
      return
    }

    let _canvasVideo: HTMLCanvasElement | null = null,
      _canvasAR: HTMLCanvasElement | null = null

    const start = async () => {
      try {
        // Init WebR
        await WebARRocksFaceShape2DHelper.init({
          NNCPath: './neuralNet/NN_FULLMAKEUP_5.json',
          canvasVideo: _canvasVideo,
          canvasAR: _canvasAR,
          shapes: [SHAPEFACE],
          updateCallback: async (spec: { textures: WebGLTexture[] }) => {
            if (isTextureLoading) {
              return 'pause'
            }

            if (currentTexture.current) {
              spec.textures = [currentTexture.current]
            }
          },
        })

        isARLoading.current = false
      } catch (err) {
        throw new Error(err as string)
      }
    }

    function main() {
      _canvasAR = document.getElementById(canvasEffectId) as HTMLCanvasElement
      _canvasVideo = document.getElementById(canvasCameraId) as HTMLCanvasElement

      WebARRocksResizer.size_canvas({
        canvas: _canvasVideo,
        overlayCanvas: [_canvasAR],
        callback: start,
        isFullScreen: true,
      })
    }

    // Init
    main()
  }, [])

  return {
    isTextureLoading,
    imagineTattoo,
  }
}

export { useARCamera }
