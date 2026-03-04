import React, { useState, useRef, useEffect } from 'react';
import api from '../services/api';

export function VertexAI({ symbol = null }) {
  const [messages, setMessages] = useState([
    { 
      role: 'assistant', 
      content: 'Hi! I\'m Vertex AI, your institutional-grade trading assistant. Ask me anything about markets, strategies, or portfolio analysis.' 
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Call the AI chat endpoint
      const response = await api.chatWithAI(input, symbol);
      
      const assistantMessage = {
        role: 'assistant',
        content: response.response || 'I apologize, but I couldn\'t generate a response.',
      };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('AI Chat Error:', error);
      const errorMessage = {
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.',
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-vertex-green font-bold text-lg">Vertex AI</h2>
        {symbol && (
          <span className="text-xs text-gray-400 bg-gray-800 px-2 py-1 rounded">
            Analyzing: {symbol}
          </span>
        )}
      </div>
      
      <div className="flex-1 overflow-y-auto mb-4 space-y-3 pr-2" style={{ maxHeight: 'calc(100vh - 300px)' }}>
        {messages.map((msg, idx) => (
          <div 
            key={idx} 
            className={`p-3 rounded-lg ${
              msg.role === 'user' 
                ? 'bg-vertex-green text-vertex-bg ml-8' 
                : 'bg-gray-800 text-white mr-8'
            }`}
          >
            <div className="text-xs opacity-70 mb-1">
              {msg.role === 'user' ? 'You' : 'Vertex AI'}
            </div>
            <div className="whitespace-pre-wrap">{msg.content}</div>
          </div>
        ))}
        {isLoading && (
          <div className="bg-gray-800 text-white p-3 rounded-lg mr-8">
            <div className="flex items-center space-x-2">
              <div className="animate-pulse">Thinking...</div>
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-vertex-green rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-vertex-green rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-vertex-green rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
          placeholder="Ask about markets, strategies, or analysis..."
          disabled={isLoading}
          className="flex-1 bg-gray-800 border border-vertex-green px-3 py-2 rounded text-white outline-none placeholder-gray-500 disabled:opacity-50"
        />
        <button
          onClick={handleSend}
          disabled={isLoading || !input.trim()}
          className="bg-vertex-green text-vertex-bg px-6 py-2 rounded font-bold hover:opacity-80 disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          {isLoading ? '...' : 'Send'}
        </button>
      </div>
    </div>
  );
}
