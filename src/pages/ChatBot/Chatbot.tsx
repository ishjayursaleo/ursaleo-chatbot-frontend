import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { type AppState } from '../../interfaces';
import { twinService } from '../../services/twinService';
import { triggerGoogleAnalyticPageView } from '../../utils/helpers/googleAnalytics';
import './Chatbot.scss'; // Ensure this includes the new CSS
import profileImage from './robot-profile.png';
import robotIcon from './robot-icon.png';

const ChatBot = () => {
  const { clientId } = useParams<{ clientId: string }>();
  const [messages, setMessages] = useState<Array<{ sender: string, text: string }>>([]);
  const [input, setInput] = useState('');
  const [chatID, setChatID] = useState('');
  const [selectedTwin, setSelectedTwin] = useState<string | null>(null);
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [selectedTwinList, setSelectedTwinList] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const userData = useSelector((state: AppState) => state.user.storeUser);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const storageKey = `chat_${clientId}_${chatID}`;
  console.log("new client ID", clientId);

  useEffect(() => {
    triggerGoogleAnalyticPageView('/chatbot', 'ChatBot', userData);
  }, [userData]);

  useEffect(() => {
    const savedMessages = localStorage.getItem(storageKey);
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    } else {
      setMessages([]);
    }
  }, [chatID]);

  useEffect(() => {
    const fetchTwinList = async () => {
      try {
        const selectedTwinParams = {
          clientId: clientId || '5b691e07-d270-4816-88aa-f9a240b7f324',
          queryParams: {
            include: 'versions',
          },
        };

        const response = await twinService.getAllTwinList(selectedTwinParams);
        setSelectedTwinList(response?.data.data.filter(twin => twin?.versions.length > 0));
      } catch (error) {
        console.error('Error fetching twin list:', error);
      }
    };

    fetchTwinList();
  }, [clientId]);

  const sendMessageToBackend = async (message: string, onDataReceived: (data: string) => void) => {
    try {
      const response = await fetch('http://52.21.129.119:8000/core/api/document-responses/', {  //should remove 's' form end
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: message }),
      });

      if (!response.body) {
        throw new Error('ReadableStream not supported by this browser.');
      }

      console.log('Response:', response);
      console.log('Response.body:', response.body);

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let result = '';

      const processChunk = async () => {
        const { done, value } = await reader.read();
        if (done) {
          onDataReceived(result + decoder.decode());
          return;
        }
        const chunk = decoder.decode(value, { stream: true });
        result += chunk;
        onDataReceived(chunk);
        setTimeout(processChunk, 100); // Introduce a delay of 100ms between processing each chunk
      };

      processChunk();
    } catch (error) {
      console.error('Error sending message to backend:', error);
      onDataReceived('Sorry, there was an error processing your request.');
    }
  };

  const formatMessage = (message: string) => {
    return message
      .replace(/\n\n-/g, '<br><br>&bull;')
      .replace(/\n-/g, '<br>&bull;')
      .replace(/\n\n/g, '<br><br>')
      .replace(/\n/g, '<br>');
  };

  const handleSendMessage = async () => {
    if (input.trim() !== '') {
      setLoading(true);

      const newInput = input;
      setInput('');
      const newMessages = [...messages, { sender: 'user', text: newInput }];
      setMessages(newMessages);
      localStorage.setItem(storageKey, JSON.stringify(newMessages));

      await sendMessageToBackend(newInput, (partialResponse) => {
        const formattedResponse = formatMessage(partialResponse);
        setMessages((prevMessages) => {
          const lastMessage = prevMessages[prevMessages.length - 1];
          if (lastMessage && lastMessage.sender === 'bot') {
            const updatedMessages = [...prevMessages];
            updatedMessages[updatedMessages.length - 1] = { sender: 'bot', text: lastMessage.text + formattedResponse };
            return updatedMessages;
          } else {
            return [...prevMessages, { sender: 'bot', text: formattedResponse }];
          }
        });
        localStorage.setItem(storageKey, JSON.stringify(messages));
      });

      setLoading(false);
    }
  };

  const handleTwinSelect = (twin: { clientId: string, twinId: string, name: string }) => {
    setSelectedTwin(twin.name);
    setChatID(twin.twinId);
    setIsMenuVisible(false);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSendMessage();
    }
  };

  useLayoutEffect(() => {
    const messagesContainer = document.querySelector('.chatbot-messages');
    if (messagesContainer) {
      messagesContainer.scrollTop = 0;
    }
  }, [messages]);

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
                  handleTwinSelect({ clientId: twin.clientId, twinId: twin.id, name: twin.name });
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
              <p>Please Wait...</p>
              </div>
            </div>
          )}
          {messages.slice().reverse().map((message, index) => (
            <div key={index} className={`chatbot-message ${message.sender}`}>
              {message.sender === 'bot' && <img src={robotIcon} alt="Robot Icon" />}
              {message.sender === 'bot' ? (
                <div dangerouslySetInnerHTML={{ __html: message.text }} />
              ) : (
                message.text
              )}
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
        <img src={profileImage} alt="Profile" />
      </div>
    </div>
  );
};

export default ChatBot;
