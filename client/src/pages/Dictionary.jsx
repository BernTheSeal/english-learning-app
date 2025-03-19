import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Dictionary = () => {
  const [word, setWord] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setWord(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && word.trim() !== '') {
      navigate(`/dictionary/${word}`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 text-gray-900">
      <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-300 w-96">
        <h2 className="text-3xl font-semibold text-center mb-6">Dictionary</h2>
        <input
          type="text"
          placeholder="Enter a word"
          value={word}
          onChange={handleChange}
          onKeyDown={handleKeyPress} // Enter tuşu ile yönlendirme
          className="w-full p-4 rounded-md bg-gray-100 text-gray-900 border border-gray-400 focus:border-blue-500 outline-none transition"
        />
      </div>
    </div>
  );
};

export default Dictionary;
