import { useEffect } from 'react'

type usePostMessageProps = {
  onMessage?: (data: MessageEvent) => void
}

const usePostMessage = ({ onMessage }: usePostMessageProps) => {
  useEffect(() => {
    const handleEvent: EventListener = (message) => {
      onMessage?.(message as MessageEvent)
    }

    document.addEventListener('message', handleEvent)

    return () => document.removeEventListener('message', handleEvent)
  }, [])
}

export { usePostMessage }
