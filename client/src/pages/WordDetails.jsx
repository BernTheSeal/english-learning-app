import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getWordInfo, addWord } from '../redux/word/wordSlice';
import { useDispatch, useSelector } from 'react-redux';
import LoadingSpinner from '../components/LoadingSpinner';

const WordDetails = () => {
  const dispatch = useDispatch();
  const { word } = useParams();
  const { wordInfo, loading, error } = useSelector((store) => store.word);

  useEffect(() => {
    if (word) {
      dispatch(getWordInfo(word));
    }
  }, [word, dispatch]);

  const handleAddWord = (word, status) => {
    dispatch(addWord({ word, status }));
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div>There is no word</div>;
  }

  return (
    <div className="p-6 bg-gray-50 rounded-xl shadow-xl">
      {wordInfo &&
        wordInfo.length > 0 &&
        wordInfo.map((item, index) => (
          <div
            key={index}
            className="mb-10 bg-white p-6 rounded-lg shadow-md border border-gray-200"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-4xl font-bold text-gray-900">{item.word}</h2>
              <div className="flex space-x-4">
                <button
                  onClick={() => handleAddWord(item.word, 'justLearned')}
                  className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200"
                >
                  Add to Learned Words
                </button>
                <button
                  onClick={() => handleAddWord(item.word, 'alreadyLearned')}
                  className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition duration-200"
                >
                  Add to Known Words
                </button>
              </div>
            </div>
            <p className="text-lg text-gray-600 mt-1">{item.phonetic}</p>

            <div className="my-6">
              {item.phonetics.map((phonetic, idx) => (
                <div key={idx} className="flex items-center mb-4">
                  <span className="text-sm text-gray-700">{phonetic.text}</span>
                  {phonetic.audio && (
                    <a
                      href={phonetic.audio}
                      className="ml-3 text-blue-500 hover:text-blue-700 transition duration-200"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Listen
                    </a>
                  )}
                </div>
              ))}
            </div>

            {item.meanings && item.meanings.length > 0 && (
              <div className="space-y-6">
                {item.meanings.map((meaning, mIndex) => (
                  <div key={mIndex}>
                    <h3 className="text-2xl font-semibold text-gray-800">{meaning.partOfSpeech}</h3>
                    {meaning.definitions.map((def, dIndex) => (
                      <div key={dIndex} className="ml-6">
                        <p className="text-gray-800">
                          <strong>Definition:</strong> {def.definition}
                        </p>
                        {def.example && (
                          <p className="italic text-gray-500">
                            <strong>Example:</strong> {def.example}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            )}

            {item.synonyms && item.synonyms.length > 0 && (
              <div className="my-6">
                <strong className="text-lg font-medium text-gray-800">Synonyms:</strong>
                <ul className="list-disc ml-6 space-y-2">
                  {item.synonyms.map((synonym, sIndex) => (
                    <li
                      key={sIndex}
                      className="text-gray-700 hover:text-gray-900 transition duration-200"
                    >
                      {synonym}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
    </div>
  );
};

export default WordDetails;
