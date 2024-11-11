import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'

const IMAGE_WIDTH = 512
const IMAGE_HEIGHT = 512

type ResponseData = {
  image: string
  prompt: string
}

const queryImage = async (url: string) => {
  try {
    const image = await axios.get(url, { responseType: 'arraybuffer' })
    return 'data:image/jpeg;base64,' + Buffer.from(image.data).toString('base64')
  } catch (err) {
    throw new Error(err as string)
  }
}

export const config = {
  api: {
    responseLimit: false,
  },
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
  if (req.method === 'GET') {
    const { prompt } = req.query

    if (!prompt || !prompt?.length) {
      res.status(404).end('Invalid Prompt')
    }

    const finalPrompt = 'tattoo design illustration ' + prompt + ' on white background'

    const imageUrl = `https://pollinations.ai/p/${encodeURIComponent(finalPrompt)}?width=${IMAGE_WIDTH}&height=${IMAGE_HEIGHT}`

    const image = await queryImage(imageUrl)

    res.status(200).json({ image, prompt: finalPrompt })
  } else {
    res.setHeader('Allow', ['GET'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
