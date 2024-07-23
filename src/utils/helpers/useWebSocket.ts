/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

// interfaces
import { type SocketData, type AppState } from '../../interfaces'
import { WS_EVENT_TYPE } from '../constants'
import ENV from '../../.env'

// Generate a unique device ID
function generateBrowserRefId (): string {
  const randomNumber = Math.random().toString(36).substring(2, 15)
  const timestamp = new Date().getTime().toString(36)
  return `${randomNumber}-${timestamp}`
}

export const useWebSocket = () => {
  const [socket, setSocket] = useState<WebSocket | null>(null)
  const { userId, email } = useSelector((state: AppState) => state.user.storeUser).data
  const [browserRefId, setBrowserRefId] = useState(localStorage.getItem('browserRefId'))

  useEffect(() => {
    if (browserRefId == null) {
      const newId = generateBrowserRefId()
      setBrowserRefId(newId)
      localStorage.setItem('browserRefId', newId)
    }
  }, [browserRefId])

  const socketUrl = process.env.SOCKET_URL ?? 'wss://4sqrets2na.execute-api.us-east-1.amazonaws.com/dev'
  console.log(`SocketUrl: ${socketUrl}`)

  useEffect(() => {
    if (userId == null || email == null || browserRefId == null ||
      userId.trim() === '' || email.trim() === '' || browserRefId.trim() === '') return

    const newSocket =
      new WebSocket(`${socketUrl}?userId=${userId as string}&email=${email as string}&browserRefId=${browserRefId}`)
    setSocket(newSocket)

    newSocket.addEventListener('open', (event) => {
      console.log('WebSocket connection opened:', event)
    })

    newSocket.addEventListener('message', (event) => {
      try {
        const eventData: SocketData = JSON.parse(event.data)
        const { downloadableUrl, name, extension } = eventData.message
        let url: string | undefined =
          ENV.REDIRECT_URL + `/document-view/${extension}/${encodeURIComponent(downloadableUrl as string)}/${name}`
        if (eventData.message == null) return
        if (eventData?.message?.event?.type === WS_EVENT_TYPE.DOWNLOAD) {
          url = eventData.message.downloadableUrl
        }
        const popup = window.open(url, '_blank')
        if (popup != null) {
          popup.focus()
        }
      } catch (error) {
        console.error('Error parsing WebSocket message:', error)
      }
    })

    // 8 minutes heartbeat to maintain ws connection.
    const interval = setInterval(() => {
      newSocket.send('ping')
    }, 480000)

    return () => {
      clearInterval(interval)
      disconnectWebSocket(newSocket)
    }
  }, [userId, email])

  const disconnectWebSocket = (socket: WebSocket | null) => {
    if ((socket != null) && socket.readyState === WebSocket.OPEN) {
      socket.close()
    }
  }

  const handleDisconnectClick = () => {
    disconnectWebSocket(socket)
  }

  return {
    handleDisconnectClick
  }
}
