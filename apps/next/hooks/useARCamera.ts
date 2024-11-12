import { useEffect, useRef, useState, useCallback } from 'react'
import axios from 'axios'

import { SHAPEFACE } from './constants'
import { useDebounce } from '@my/ui'

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
  const savedPrompt = useRef<string>()
  const [isTextureLoading, setIsTextureLoading] = useState<boolean>(false)

  const currentTexture = useRef<WebGLTexture>()

  const unOptimizedImagineTattoo = useCallback(async (prompt: string) => {
    if (isTextureLoading || isARLoading.current || !prompt || savedPrompt.current === prompt) {
      return
    }

    setIsTextureLoading(true)

    try {
      const { data } = await axios.get(`./api/imagine`, { params: { prompt }, timeout: 600000 })

      savedPrompt.current = prompt

      // Add a simple delay
      //await new Promise((resolve) => setTimeout(resolve, 200))

      currentTexture.current = await WebARRocksFaceShape2DHelper.get_create_glImageTexture()(
        data.image
      )
    } catch (err) {
      console.error(err)
    } finally {
      setIsTextureLoading(false)
    }
  }, [])

  const imagineTattoo = useDebounce(unOptimizedImagineTattoo, 100)

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

    const main = () => {
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
