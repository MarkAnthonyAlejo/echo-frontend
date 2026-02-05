import { useState } from 'react'

function App() {
  const [prompt, setPrompt] = useState('');

  const handleSend = () => {
    console.log("User wants to send:", prompt);
    // We will add the fetch logic here in the next step
  };

  return (
    <div style={{ padding: '40px', fontFamily: 'sans-serif' }}>
      <h1>Echo AI</h1>
      <div style={{ display: 'flex', gap: '10px' }}>
        <input 
          type="text" 
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Type your prompt here..."
          style={{ padding: '10px', width: '300px', borderRadius: '8px', border: '1px solid #ccc' }}
        />
        <button 
          onClick={handleSend}
          style={{ padding: '10px 20px', borderRadius: '8px', backgroundColor: '#007bff', color: 'white', border: 'none', cursor: 'pointer' }}
        >
          Send
        </button>
      </div>
    </div>
  )
}

export default App