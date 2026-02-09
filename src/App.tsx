import { useState, useEffect, useRef } from 'react';
import { useChat } from './hooks/useChat';
import { useTheme } from './hooks/useTheme'; 
import { Trash2, Send, Sun, Moon, Box } from 'lucide-react';

function App() {
  const [input, setInput] = useState('');
  const { history, isLoading, sendMessage, clearChat } = useChat();
  const { theme, toggleTheme } = useTheme();

  // Create a reference to the bottom of the message list
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Function to smoothly scroll to the bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Trigger scroll every time history updates or AI starts thinking
  useEffect(() => {
    scrollToBottom();
  }, [history, isLoading]);

  const handleSend = () => {
    if (!input.trim()) return;
    sendMessage(input);
    setInput('');
  };

  return (
    /* Outer wrapper stays centered */
    <div className="fixed inset-0 flex items-center justify-center p-4 transition-colors duration-300">
      
      {/* THE APP CARD */}
      <div className="w-full max-w-4xl h-[85vh] flex flex-col bg-white dark:bg-cognizant-midnight rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden transition-all">
        
        {/* Header */}
        <header className="flex items-center justify-between px-8 py-5 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-4">
            <Box className="text-cognizant-turquoise" size={32} />
            <div>
              <h1 className="text-2xl font-black text-cognizant-midnight dark:text-white uppercase tracking-tighter">
                Echo <span className="text-cognizant-turquoise">AI</span>
              </h1>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em]">Cognizant Research Lab</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <button 
              onClick={toggleTheme} 
              className="p-3 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 transition-all active:scale-90"
              aria-label="Toggle Theme"
            >
              {theme === 'light' ? <Moon size={22} /> : <Sun size={22} className="text-yellow-400" />}
            </button>
            <button 
              onClick={clearChat} 
              className="p-3 rounded-full hover:bg-red-50 text-slate-400 hover:text-red-500 transition-all"
              aria-label="Clear Chat"
            >
              <Trash2 size={22} />
            </button>
          </div>
        </header>

        {/* Scrollable Messages Area */}
        <div className="flex-1 overflow-y-auto p-8 space-y-6 bg-slate-50/30 dark:bg-slate-900/10 scroll-smooth">
          {history.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center opacity-20 dark:text-white">
              <Box size={80} className="mb-4" />
              <p className="text-sm font-bold uppercase tracking-widest">Systems Online</p>
            </div>
          ) : (
            history.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[75%] px-6 py-4 rounded-3xl shadow-sm ${
                  msg.role === 'user' 
                    ? 'bg-cognizant-midnight dark:bg-blue-900 text-white rounded-tr-none' 
                    : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-white border border-slate-100 dark:border-slate-700 rounded-tl-none'
                }`}>
                  <p className="text-sm leading-relaxed">{msg.content}</p>
                </div>
              </div>
            ))
          )}
          
          {/* Loading Animation */}
          {isLoading && (
             <div className="flex gap-2 p-2">
                <div className="w-2 h-2 bg-cognizant-turquoise rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-cognizant-turquoise rounded-full animate-bounce [animation-delay:0.2s]" />
                <div className="w-2 h-2 bg-cognizant-turquoise rounded-full animate-bounce [animation-delay:0.4s]" />
             </div>
          )}

          {/* This empty div acts as an anchor for the auto-scroll feature */}
          <div ref={messagesEndRef} />
        </div>

        {/* Input area */}
        <footer className="p-6 bg-white dark:bg-cognizant-midnight border-t border-slate-100 dark:border-slate-800">
          <div className="relative flex items-center">
            <input 
              className="w-full bg-slate-100 dark:bg-slate-800 border-none rounded-2xl px-6 py-4 text-base dark:text-white outline-none focus:ring-2 focus:ring-cognizant-turquoise transition-all pr-16"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Inquire with Echo AI..."
            />
            <button 
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              className="absolute right-2 bg-cognizant-turquoise hover:brightness-110 disabled:opacity-50 text-cognizant-midnight p-3 rounded-xl transition-all active:scale-95"
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