import { useEffect } from 'react'

const usePostMessage = () => {
  useEffect(() => {
    const handleEvent = (message) => {
      alert(message.data)
    }

    document.addEventListener('message', handleEvent)

    return () => document.removeEventListener('message', handleEvent)
  }, [])
}

export { usePostMessage }
