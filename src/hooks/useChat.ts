// echo-frontend/src/hooks/useChat.ts
import { useState } from 'react';
import { chatService } from '../services/api';

export interface Message {
  role: 'user' | 'ai';
  content: string;
}

export const useChat = () => {
  const [history, setHistory] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async (prompt: string) => {
    if (!prompt.trim()) return;

    // 1. Add User message to history
    const userMsg: Message = { role: 'user', content: prompt };
    setHistory((prev) => [...prev, userMsg]);
    setIsLoading(true);

    try {
      // 2. Call the service
      const data = await chatService.sendMessage(prompt);
      
      // 3. Add AI message to history
      const aiMsg: Message = { role: 'ai', content: data.response };
      setHistory((prev) => [...prev, aiMsg]);
    } catch (error) {
      console.error("Chat Error:", error);
      setHistory((prev) => [...prev, { role: 'ai', content: "Error: Could not reach the server." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => setHistory([]);

  return { history, isLoading, sendMessage, clearChat };
};