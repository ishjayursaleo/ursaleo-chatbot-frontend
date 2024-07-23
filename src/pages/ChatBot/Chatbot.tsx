import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'; // Import useParams to get URL parameters
import { type AppState } from '../../interfaces';
import { twinService } from '../../services/twinService';
import { triggerGoogleAnalyticPageView } from '../../utils/helpers/googleAnalytics';
import './Chatbot.scss';
import profileImage from './profile.png';

const ChatBot = () => {
  const { clientId, twinId, twinVersionId } = useParams()
  const [messages, setMessages] = useState<Array<{ sender: string, text: string }>>([]);
  const [input, setInput] = useState('');
  const [chatID, setChatID] = useState('');
  const [selectedTwin, setSelectedTwin] = useState<string | null>(null);
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [selectedTwinList, setSelectedTwinList] = useState<any[]>([]);
  const userData = useSelector((state: AppState) => state.user.storeUser);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Key for localStorage
  const storageKey = `chat_${chatID}`; //`chat_${clientId}_${chatID}`

  useEffect(() => {
    triggerGoogleAnalyticPageView('/chatbot', 'ChatBot', userData);
  }, [userData]);
    
  useEffect(() => {
    const storageKey = `chat_${chatID}`;  //`chat_${clientId}_${chatID}`
    // Load messages from localStorage
    const savedMessages = localStorage.getItem(storageKey);
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    } else {
      // Initialize with an empty message array if no saved messages are found
      setMessages([]);
    }
  }, [chatID]);

  useEffect(() => {
    const fetchTwinList = async () => {
      try {
        // if (!clientId) return;

        const selectedTwinParams = {
          clientId: clientId ? clientId : '5b691e07-d270-4816-88aa-f9a240b7f324',
          queryParams: {
            include: 'versions',
          },
        };
        const response = await twinService.getAllTwinList(selectedTwinParams);
        // const twinList = response?.data.data.filter(twin => twin?.versions.length > 0).map(twin => twin.name);
        // setSelectedTwinList(prev => [...twinList]);
        setSelectedTwinList(response?.data.data.filter(twin => twin?.versions.length > 0))
      } catch (error) {
        console.error('Error fetching twin list:', error);
      }
    };

    fetchTwinList();
  }, [clientId]);

  const sendMessageToBackend = async (message: string) => {
    try {
      const response = await fetch('http://52.21.129.119:8000/core/api/query-response/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: message }),
      });
      const data = await response.json();
      return data.openai_response.content; // Adjust this based on your actual response structure
    } catch (error) {
      console.error('Error sending message to backend:', error);
      return 'Sorry, there was an error processing your request.';
    }
  };

  const handleSendMessage = async () => {
    if (input.trim() !== '') {

      let newInput = input;
      setInput('');

      const newMessages = [...messages, { sender: 'user', text: newInput }];
      setMessages(newMessages);
      localStorage.setItem(storageKey, JSON.stringify(newMessages));

      const botResponse = await sendMessageToBackend(newInput);
      const updatedMessages = [...newMessages, { sender: 'bot', text: botResponse }];
      setMessages(updatedMessages);
      localStorage.setItem(storageKey, JSON.stringify(updatedMessages));

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
          {messages.slice().reverse().map((message, index) => (
            <div key={index} className={`chatbot-message ${message.sender}`}>{message.text}</div>
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
            style={{ paddingRight: '50px' }} // Adjust padding to make space for the button
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
