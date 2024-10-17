import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import { message } from 'antd';
import './App.css'; 
import Instructions from './Instructions'; 
import Final from './Final'; 
import Questionnaire from './Questionnaire';

const App = () => {
  const [texts, setTexts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userId] = useState(generateUniqueId());
  const [testData, setTestData] = useState({});
  const [dataSended, setDataSended] = useState(false);
  const [showInstructions, setShowInstructions] = useState(true);
  const [selectedComplexity, setSelectedComplexity] = useState(null);
  const [selectedEmotion, setSelectedEmotion] = useState(null);
  const N_OPTIONS = 8;
  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    async function fetchTexts() {
      try {
        const response = await axios.get(`${API_URL}/texts`);
        const shuffledTexts = response.data.map(item => item.text).sort(() => Math.random() - 0.5);
        setTexts(shuffledTexts);
      } catch (error) {
        console.error('Ошибка при получении текстов:', error);
      }
    }
    fetchTexts();
  }, [API_URL]);

  const handleAnswer = () => {
    if (selectedComplexity !== null && selectedEmotion !== null) {
      const answeredText = {
        text: texts[currentIndex],
        difficult: selectedComplexity,
        interest: selectedEmotion,
      };

      setTestData(prevData => ({
        ...prevData,
        answers: [...(prevData.answers || []), answeredText],
      }));

      const nextIndex = currentIndex + 1;
      if (nextIndex < texts.length) {
        setCurrentIndex(nextIndex);
        setSelectedComplexity(null);
        setSelectedEmotion(null);
      } else {
        handleSubmit();
      }
    } else {
      message.error('Пожалуйста, оцените и сложность, и эмоциональную окраску текста перед переходом к следующему.');
    }
  };

  const handleSubmit = async () => {
    try {
      const now = moment().format('YYYY-MM-DD HH:mm:ss');

      await axios.post(`${API_URL}/answers`, {
        userId: userId,
        createdAt: now,
        answers: testData.answers || [],
      });

      setDataSended(true);
      message.success('Ответы успешно сохранены! Благодарим Вас за участие.');
    } catch (error) {
      console.error('Ошибка при отправке данных:', error);
      message.error('Ошибка при отправке данных. Попробуйте снова.');
    }
  };

  return (
    <div style={mainContainerStyle}>
      {showInstructions ? (
        <Instructions setShowInstructions={setShowInstructions} N_OPTIONS={N_OPTIONS} />
      ) : dataSended ? (
        <Final />
      ) : (
        <Questionnaire 
          currentIndex={currentIndex}
          texts={texts}
          N_OPTIONS={N_OPTIONS}
          selectedComplexity={selectedComplexity}
          selectedEmotion={selectedEmotion}
          setSelectedComplexity={setSelectedComplexity}
          setSelectedEmotion={setSelectedEmotion}
          handleAnswer={handleAnswer}
        />
      )}
    </div>
  );
};

const mainContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '20px',
  height: '100vh',
  textAlign: 'center',
};

const generateUniqueId = () => {
  return `user_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
};

export default App;

