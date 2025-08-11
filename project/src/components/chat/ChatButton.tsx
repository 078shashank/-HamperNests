import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';

const ChatButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
        aria-label="Open chat"
      >
        <MessageCircle className="w-6 h-6" />
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 w-80 bg-white rounded-lg shadow-xl overflow-hidden flex flex-col" style={{ height: '500px' }}>
      {/* Header */}
      <div className="bg-blue-600 text-white px-4 py-3 flex justify-between items-center">
        <h3 className="font-medium">Customer Support</h3>
        <button 
          onClick={() => setIsOpen(false)}
          className="text-white hover:text-gray-200"
          aria-label="Close chat"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
      
      {/* Chat content */}
      <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
        <div className="text-center py-8">
          <MessageCircle className="w-12 h-12 mx-auto text-gray-300 mb-2" />
          <h4 className="text-lg font-medium text-gray-700">How can we help you?</h4>
          <p className="text-gray-500 text-sm mt-1">Our team is here to assist you</p>
        </div>
      </div>
      
      {/* Input */}
      <div className="p-3 border-t border-gray-200 bg-white">
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Type your message..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-l-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-r-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
            type="button"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatButton;
