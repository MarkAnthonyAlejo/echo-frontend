// echo-frontend/src/hooks/useChat.ts
import { useState, useEffect } from 'react';
import { chatService } from '../services/api';

export interface Message {
  role: 'user' | 'ai';
  content: string;
}

export const useChat = () => {
  // 1. Initialize state from LocalStorage so history persists on page refresh
  const [history, setHistory] = useState<Message[]>(() => {
    const savedHistory = localStorage.getItem('echo_chat_history');
    return savedHistory ? JSON.parse(savedHistory) : [];
  });
  
  const [isLoading, setIsLoading] = useState(false);

  // 2. Synchronize LocalStorage whenever the history state changes
  useEffect(() => {
    localStorage.setItem('echo_chat_history', JSON.stringify(history));
  }, [history]);

  const sendMessage = async (prompt: string) => {
    if (!prompt.trim()) return;

    // Add User message immediately for UI responsiveness
    const userMsg: Message = { role: 'user', content: prompt };
    setHistory((prev) => [...prev, userMsg]);
    setIsLoading(true);

    try {
      const data = await chatService.sendMessage(prompt);
      
      const aiMsg: Message = { role: 'ai', content: data.response };
      setHistory((prev) => [...prev, aiMsg]);
    } catch (error) {
      console.error("Chat Error:", error);
      setHistory((prev) => [...prev, { 
        role: 'ai', 
        content: "Error: Could not reach the server. Please ensure the backend is running." 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  // 3. Update clearChat to also wipe the LocalStorage
  const clearChat = () => {
    setHistory([]);
    localStorage.removeItem('echo_chat_history');
  };

  return { history, isLoading, sendMessage, clearChat };
};