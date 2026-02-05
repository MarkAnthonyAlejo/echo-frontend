// echo-frontend/src/App.tsx
import { useState } from 'react';
import { useChat } from './hooks/useChat';
import { Trash2, Send } from 'lucide-react';

function App() {
  const [input, setInput] = useState('');
  const { history, isLoading, sendMessage, clearChat } = useChat();

  const handleSend = () => {
    if (!input.trim()) return;
    sendMessage(input);
    setInput('');
  };

  return (
    /* CENTERING ENGINE: 
      'flex items-center justify-center' centers the child horizontally and vertically.
      'w-screen' ensures we use the full width of the monitor.
    */
    <div className="min-h-screen w-full bg-slate-50 flex flex-col items-center justify-center p-2 sm:p-4">
      
      {/* RESPONSIVE CONTAINER:
        'w-full' = 100% width on Mobile (iPhone)
        'md:max-w-3xl' = caps the width on Laptops/Desktops so it doesn't look stretched.
      */}
      <div className="w-full md:max-w-3xl bg-white rounded-xl sm:rounded-2xl shadow-2xl flex flex-col h-[95vh] sm:h-[85vh] overflow-hidden border border-slate-200">
        
        {/* Header - Scaled padding for mobile */}
        <header className="px-4 py-3 sm:px-6 sm:py-4 border-b border-slate-100 flex justify-between items-center bg-white">
          <div className="flex flex-col">
            <h1 className="text-xl sm:text-2xl font-black text-blue-600 tracking-tight leading-none">ECHO AI</h1>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Cognizant Assessment</span>
          </div>
          
          <button 
            onClick={clearChat}
            className="flex items-center gap-1 sm:gap-2 px-2 py-1.5 sm:px-3 sm:py-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
          >
            <Trash2 size={16} />
            <span className="hidden sm:inline text-sm font-semibold">Clear</span>
          </button>
        </header>

        {/* Chat Body - Dynamic padding */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 sm:space-y-6 bg-slate-50/50">
          {history.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-slate-400 text-center px-4">
              <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mb-3">💬</div>
              <p className="font-medium text-sm sm:text-base">Ready for your prompt. Start the conversation!</p>
            </div>
          ) : (
            history.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[90%] sm:max-w-[80%] px-4 py-3 rounded-2xl ${
                  msg.role === 'user' 
                    ? 'bg-blue-600 text-white rounded-tr-none' 
                    : 'bg-white text-slate-700 border border-slate-200 rounded-tl-none shadow-sm'
                }`}>
                  <p className="text-[10px] font-bold uppercase tracking-wider mb-1 opacity-70">{msg.role}</p>
                  <p className="text-sm sm:text-base leading-relaxed">{msg.content}</p>
                </div>
              </div>
            ))
          )}
          {isLoading && <div className="animate-pulse text-slate-400 text-xs font-bold pl-2">AI IS TYPING...</div>}
        </div>

        {/* Input Area - Sticks to bottom */}
        <footer className="p-3 sm:p-4 bg-white border-t border-slate-100">
          <div className="flex gap-2 sm:gap-3 items-center">
            <input 
              className="flex-1 bg-slate-100 border-none rounded-xl px-4 py-3 text-sm sm:text-base text-slate-700 focus:ring-2 focus:ring-blue-500 outline-none"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Message Echo AI..."
            />
            <button 
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 text-white p-3 rounded-xl shadow-md active:scale-95 transition-transform"
            >
              <Send size={20} />
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;