// echo-frontend/src/services/api.ts

const API_BASE_URL = 'http://localhost:5001/api';

export const chatService = {
  async sendMessage(prompt: string) {
    const response = await fetch(`${API_BASE_URL}/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt }),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    return response.json();
  }
};