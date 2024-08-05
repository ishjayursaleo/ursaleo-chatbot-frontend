import React, { useState, useEffect, useLayoutEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { type AppState } from '../../interfaces'
import { twinService } from '../../services/twinService'
import { triggerGoogleAnalyticPageView } from '../../utils/helpers/googleAnalytics'
import './Chatbot.scss'
import robotIcon from '../../assets/img/robot.png'

const ChatBot = () => {
  const { clientId } = useParams()
  const [messages, setMessages] = useState<Array<{ sender: string, text: string }>>([])
  const [input, setInput] = useState('')
  const [chatID, setChatID] = useState('')
  const [selectedTwin, setSelectedTwin] = useState<string | null>(null)
  const [isMenuVisible, setIsMenuVisible] = useState(false)
  const [selectedTwinList, setSelectedTwinList] = useState<any[]>([])
  const [loading, setLoading] = useState(false) // New state for loading
  const userData = useSelector((state: AppState) => state.user.storeUser)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Key for localStorage
  const storageKey = `chat_${clientId ?? 'defaultClientId'}_${chatID ?? 'defaultChatID'}`

  useEffect(() => {
    triggerGoogleAnalyticPageView('/chatbot', 'ChatBot', userData)
  }, [userData])

  useEffect(() => {
    const savedMessages = localStorage.getItem(storageKey)
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages))
    } else {
      setMessages([])
    }
  }, [chatID])

  useEffect(() => {
    const fetchTwinList = async () => {
      try {
        const selectedTwinParams = {
          clientId: clientId ?? '',
          queryParams: {
            include: 'versions'
          }
        }
        const response = await twinService.getAllTwinList(selectedTwinParams)
        setSelectedTwinList(response?.data.data.filter(twin => twin?.versions.length > 0))
      } catch (error) {
        console.error('Error fetching twin list:', error)
      }
    }

    fetchTwinList()
  }, [clientId])

  const sendMessageToBackend = async (message: string) => {
    try {
      const response = await fetch('http://52.21.129.119:8000/core/api/document-response/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ query: message })
      })
      const data = await response.json()
      return data.openai_response.content
    } catch (error) {
      console.error('Error sending message to backend:', error)
      return 'Sorry, there was an error processing your request.'
    }
  }

  const formatMessage = (message: string) => {
    return message
      .replace(/\n\n-/g, '<br><br>&bull')
      .replace(/\n-/g, '<br>&bull')
      .replace(/\n\n/g, '<br><br>')
      .replace(/\n/g, '<br>')
  }

  const handleSendMessage = async () => {
    if (input.trim() !== '') {
      setLoading(true) // Set loading to true when sending message

      const newInput = input
      setInput('')
      const newMessages = [...messages, { sender: 'user', text: newInput }]
      setMessages(newMessages)
      localStorage.setItem(storageKey, JSON.stringify(newMessages))

      const botResponse = await sendMessageToBackend(newInput)
      const formattedResponse = formatMessage(botResponse)
      const updatedMessages = [...newMessages, { sender: 'bot', text: formattedResponse }]
      setMessages(updatedMessages)
      localStorage.setItem(storageKey, JSON.stringify(updatedMessages))

      setLoading(false) // Set loading to false when response is received
    }
  }

  const handleTwinSelect = (twin: { clientId: string, twinId: string, name: string }) => {
    setSelectedTwin(twin.name)
    setChatID(twin.twinId)
    setIsMenuVisible(false)
  }

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSendMessage()
    }
  }

  useLayoutEffect(() => {
    const messagesContainer = document.querySelector('.chatbot-messages')
    if (messagesContainer) {
      messagesContainer.scrollTop = 0
    }
  }, [messages])

  return (
    <div className="chatbot">
      <div className="chatbot-menu">
        <h3>Select a Twin</h3>
        <button onClick={() => setIsMenuVisible(!isMenuVisible)}>
          {selectedTwin ? selectedTwin : 'Select Twin'}
        </button>
        {isMenuVisible && (
          <ul>
            {selectedTwinList.map((twin, index) => (
              <li
                key={index}
                className={twin.name === selectedTwin ? 'active' : ''}
                onClick={() => {
                  handleTwinSelect({ clientId: twin.clientId, twinId: twin.id, name: twin.name })
                }}
              >
                {twin.name}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="chatbot-content">
        <div className="chatbot-messages">
          {loading && (
            <div>
            <div className="loading-indicator">
              <div className="spinner">
                <div className="bouncing-ellipses">
                  <div className="ellipsis"></div>
                  <div className="ellipsis"></div>
                  <div className="ellipsis"></div>
                </div>
              </div>
              <p>Your Response is Generating. Please Wait...</p>
              </div>
              </div>
          )}
          {messages.slice().reverse().map((message, index) => (
            <div key={index} style={{ display: 'flex', justifyContent: message.sender === 'bot' ? 'flex-start' : 'flex-end' }}>
              {message.sender === 'bot' && (
                <span className="chatbot-img" style={{ marginRight: '1px' }}>
                  <img src={robotIcon} alt="Robot Icon" />
                </span>
              )}
              <div className={`chatbot-message ${message.sender}`} style={{ display: 'flex', alignItems: 'center' }}>
                {message.sender === 'bot' ? (
                  <div dangerouslySetInnerHTML={{ __html: message.text }} />
                ) : (
                  message.text
                )}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <div className="chatbot-input">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type a message..."
            style={{ paddingRight: '50px' }}
          />
          <button onClick={handleSendMessage}>Send</button>
        </div>
      </div>
      <div className="chatbot-profile">
        <img src={robotIcon} alt="Profile" />
      </div>
    </div>
  )
}

export default ChatBot
