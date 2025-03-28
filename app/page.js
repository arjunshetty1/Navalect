'use client';

import React, { useState } from 'react';

export default function NavalismApp() {
  const [question, setQuestion] = useState('');
  const [advice, setAdvice] = useState('');
  const [explanation, setExplanation] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');

  // Call the API to get Naval-style wisdom
  const generateAdvice = async () => {
    if (!question.trim()) return;
    
    setIsThinking(true);
    setError('');
    setAdvice('');
    setExplanation('');
    
    try {
      const response = await fetch('/api/naval-wisdom', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate wisdom');
      }
      
      setAdvice(data.answer);
      
      // Generate explanation
      const explanationResponse = await fetch('/api/explain-wisdom', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ wisdom: data.answer }),
      });
      
      const explanationData = await explanationResponse.json();
      
      if (explanationResponse.ok) {
        setExplanation(explanationData.explanation);
      }
    } catch (err) {
      console.error('Error generating wisdom:', err);
      setError('Failed to channel Naval\'s wisdom. Please try again.');
    } finally {
      setIsThinking(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Prevent default to stop form submission behavior
      generateAdvice();
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(advice);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Sample suggestions
  const suggestions = [
    "How do I build wealth?",
    "What skills should I learn?",
    "How to be happy?",
    "Should I start a company?"
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-3xl w-full">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-serif font-bold tracking-tight text-gray-900 mb-2 uppercase">Navalect </h1>
          <p className="text-gray-500 font-serif italic">Wisdom for the sovereign individual</p>
        </div>
        
        {/* Main content */}
        <div className="space-y-12">
          {/* Input area - Fixed layout */}
          <div className="h-32"> {/* Fixed height container */}
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full px-0 py-4 bg-white text-gray-900 text-lg font-serif border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-gray-900 focus:outline-none placeholder-gray-400 transition-colors duration-200"
              placeholder="Ask about wealth, happiness, skills, life..."
            />
            
            <button
              onClick={generateAdvice}
              disabled={isThinking || !question.trim()}
              className={`w-full mt-4 md:py-4 py-2 font-serif md:text-lg text-md ${
                isThinking || !question.trim() 
                  ? 'text-gray-400 border-2 border-gray-200 cursor-not-allowed' 
                  : 'text-gray-900 border-2 border-gray-900 hover:bg-gray-900 hover:text-white'
              } transition-colors duration-200`}
            >
              {isThinking ? 'Distilling wisdom...' : 'ASK NAVAL'}
            </button>
          </div>
          
          {/* Suggestions */}
          <div className="space-y-2">
            <p className="text-gray-400 text-sm font-serif uppercase tracking-widest">Try asking about</p>
            <div className="flex flex-wrap gap-2">
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setQuestion(suggestion);
                    setAdvice('');
                    setError('');
                    setExplanation('');
                  }}
                  className="px-4 py-2 text-sm font-serif text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors duration-200 cursor-pointer"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
          
          {/* Response container - Always present with min-height to prevent layout shifts */}
          <div className="pt-8 border-t border-gray-100 min-h-[250px]">
            {isThinking ? (
              <div className="space-y-8">
                <div className="space-y-4">
                  <h2 className="text-lg font-serif font-bold text-gray-900">Naval would say:</h2>
                  <div className="h-6 bg-gray-100 rounded-md w-3/4 animate-pulse"></div>
                  <div className="h-6 bg-gray-100 rounded-md w-5/6 animate-pulse"></div>
                </div>
                
                <div className="space-y-3 pt-6 border-t border-gray-100">
                  <h2 className="text-lg font-serif font-bold text-gray-900">What this means:</h2>
                  <div className="bg-gray-50 p-6 border-l-4 border-gray-200">
                    <div className="h-5 bg-gray-100 rounded-md w-full animate-pulse mb-3"></div>
                    <div className="h-5 bg-gray-100 rounded-md w-5/6 animate-pulse mb-3"></div>
                    <div className="h-5 bg-gray-100 rounded-md w-4/6 animate-pulse"></div>
                  </div>
                </div>
              </div>
            ) : error ? (
              <div className="space-y-4">
                <h2 className="text-lg font-serif font-bold text-gray-900">Error:</h2>
                <p className="text-2xl font-serif text-red-500 leading-relaxed">{error}</p>
              </div>
            ) : advice ? (
              <div className="space-y-8">
                {/* Naval wisdom */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h2 className="text-lg font-serif font-bold text-gray-900">Naval would say:</h2>
                    <button
                      onClick={copyToClipboard}
                      className="text-xs px-3 py-1 font-serif text-gray-500 hover:text-gray-900 cursor-pointer transition-colors duration-200"
                    >
                      {copied ? 'COPIED' : 'COPY'}
                    </button>
                  </div>
                  <p className="text-2xl font-serif text-gray-800 leading-relaxed">{advice}</p>
                </div>
                
                {/* Explanation */}
                {explanation && (
                  <div className="space-y-3 pt-6 border-t border-gray-100">
                    <h2 className="text-lg font-serif font-bold text-gray-900">What this means:</h2>
                    <div className="bg-gray-50 p-6 border-l-4 border-gray-200">
                      <p className="text-lg font-serif text-gray-700 leading-relaxed">{explanation}</p>
                    </div>
                  </div>
                )}
              </div>
            ) : null}
          </div>
          
          {/* Quote footer */}
          <div className="pt-12 border-t border-gray-100">
            <p className="text-center text-gray-400 text-sm font-serif italic">
              "The purpose of life is to be happy by being the most authentic version of yourself."
            </p>
            <p className="text-center text-gray-400 text-xs mt-6">
              This tool is not affiliated with or endorsed by Naval Ravikant. 
              Simply inspired by his wisdom and philosophy.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}