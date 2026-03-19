import React, { useState, useEffect, useRef } from 'react';
import './HelpBot.css';
import { useContent } from '../admin/AdminContext';

const HelpBot = () => {
  const { state, dispatch } = useContent();
  const [isOpen, setIsOpen] = useState(false);
  const [showLeadForm, setShowLeadForm] = useState(true);
  const [customerInfo, setCustomerInfo] = useState({ name: '', phone: '', company: '' });
  
  // Use session ID to identify the user
  const [sessionId] = useState(() => {
    let id = sessionStorage.getItem('amparo_chat_session');
    if (!id) {
      id = `session_${Math.random().toString(36).substr(2, 9)}`;
      sessionStorage.setItem('amparo_chat_session', id);
    }
    return id;
  });

  // Local state for chat messages since we moved away from AdminContext for Chat
  const [messages, setMessages] = useState([
    { type: 'bot', text: state.chatConfig?.welcomeMessage || "Hello! I'm AMPARO AI Assistant. How can I help you today?", date: new Date().toISOString() }
  ]);
  const [ticketExists, setTicketExists] = useState(false);

  // Check if session already has a ticket on the backend
  useEffect(() => {
    async function checkSession() {
      try {
        const response = await fetch(`/api/chat?sessionId=${sessionId}`);
        const data = await response.json();
        if (data.success && data.data) {
          setShowLeadForm(false);
          setTicketExists(true);
          setMessages(data.data.messages || messages);
        }
      } catch (err) {
        console.error('Failed to fetch session', err);
      }
    }
    checkSession();
  }, [sessionId]);

  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleLeadSubmit = (e) => {
    e.preventDefault();
    if (!customerInfo.name || !customerInfo.phone) return;
    setShowLeadForm(false);
  };

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    const userMsgText = inputValue;
    const userMessage = { type: 'user', text: userMsgText, date: new Date().toISOString() };
    
    // Optimistic UI update
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');

    try {
      // Save message to MongoDB
      await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId, 
          message: userMessage,
          customerInfo: ticketExists ? null : customerInfo
        })
      });
      setTicketExists(true);

      if (state.chatConfig?.autoReplyEnabled) {
        await new Promise(resolve => setTimeout(resolve, 800));
        const aiResponse = await generateAIResponse(userMsgText);
        const botMessage = { type: 'bot', text: aiResponse, date: new Date().toISOString() };
        
        setMessages(prev => [...prev, botMessage]);
        
        // Save bot reply to MongoDB
        await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            sessionId, 
            message: botMessage
          })
        });
      }
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage = { type: 'bot', text: "Sorry, I encountered an error recording your message.", date: new Date().toISOString() };
      setMessages(prev => [...prev, errorMessage]);
    }
  };

  const generateAIResponse = async (userInput) => {
    const input = userInput.toLowerCase();
    if (input.includes('hello') || input.includes('hi')) return "Hello! Welcome to AMPARO. How can I assist you with your security needs today?";
    if (input.includes('service')) return "AMPARO offers AI surveillance, smart alerts, and edge processing. Which specific service interests you?";
    if (input.includes('price')) return "Our pricing is flexible. For a customized quote, please contact our sales team.";
    return state.chatConfig?.defaultResponse || "Thank you for your question! For more details, please contact our team.";
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      handleSend();
    }
  };

  const toggleChat = () => setIsOpen(!isOpen);

  return (
    <>
      <button 
        className={`help-bot__toggle ${isOpen ? 'help-bot__toggle--open' : ''}`}
        onClick={toggleChat}
        aria-label="Chat with AI Assistant"
      >
        <div className="help-bot__toggle-inner">
          {isOpen ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          ) : (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
              <circle cx="12" cy="12" r="1"></circle>
              <circle cx="16" cy="12" r="1"></circle>
              <circle cx="8" cy="12" r="1"></circle>
            </svg>
          )}
        </div>
        <div className="help-bot__pulse"></div>
      </button>

      <div className={`help-bot__overlay ${isOpen ? 'help-bot__overlay--open' : ''}`}>
        <div className="help-bot__window">
          <div className="help-bot__header">
            <h3 className="help-bot__title">AMPARO AI Assistant</h3>
            <button className="help-bot__close" onClick={toggleChat}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12"/>
              </svg>
            </button>
          </div>

          {showLeadForm ? (
            <div className="help-bot__lead-form">
              <p className="lead-form-intro">Please let us know who you are to start the chat:</p>
              <form onSubmit={handleLeadSubmit}>
                <input 
                  type="text" 
                  placeholder="Full Name" 
                  required 
                  value={customerInfo.name}
                  onChange={e => setCustomerInfo({...customerInfo, name: e.target.value})}
                />
                <input 
                  type="tel" 
                  placeholder="Phone Number" 
                  required 
                  value={customerInfo.phone}
                  onChange={e => setCustomerInfo({...customerInfo, phone: e.target.value})}
                />
                <input 
                  type="text" 
                  placeholder="Company Name" 
                  value={customerInfo.company}
                  onChange={e => setCustomerInfo({...customerInfo, company: e.target.value})}
                />
                <button type="submit" className="lead-form-submit">Start Conversation</button>
              </form>
            </div>
          ) : (
            <>
              <div className="help-bot__messages">
                {messages.map((message, index) => (
                  <div key={index} className={`help-bot__message help-bot__message--${message.type}`}>
                    {message.text}
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              <div className="help-bot__input-container">
                <input
                  type="text"
                  className="help-bot__input"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me anything..."
                />
                <button className="help-bot__send" onClick={handleSend} disabled={!inputValue.trim()}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 2L11 13M22 2l-7 7-7 7"/>
                  </svg>
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default HelpBot;
