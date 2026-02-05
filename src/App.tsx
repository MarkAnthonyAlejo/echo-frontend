import { useState } from 'react'

function App() {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!prompt) return;
    
    setIsLoading(true);
    try {
      // Talking to your Node server on port 5001
      const res = await fetch('http://localhost:5001/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt })
      });
      
      const data = await res.json();
      setResponse(data.response); // This will show the "Mock" message
    } catch (error) {
      console.error("Connection failed:", error);
      setResponse("Error: Could not reach the backend.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-blue-600">Echo AI</h1>
        
        <input 
          className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
          type="text" 
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Ask something..."
        />
        
        <button 
          onClick={handleSend}
          disabled={isLoading}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400 transition-colors"
        >
          {isLoading ? 'Thinking...' : 'Send Prompt'}
        </button>

        {response && (
          <div className="mt-6 p-4 bg-gray-50 border-l-4 border-blue-500 rounded text-gray-700">
            <strong>AI Response:</strong>
            <p className="mt-2">{response}</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default App