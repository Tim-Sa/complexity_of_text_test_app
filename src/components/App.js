import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import { Button, Typography, message } from 'antd';

const { Title, Text } = Typography;

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
      // Собираем данные в нужном формате для отправки
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
        // Сбросить выбранные значения перед следующим текстом
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
        answers: testData.answers || [],  // Отправляем массив ответов
      });
  
      setDataSended(true);
      message.success('Ответы успешно сохранены! Благодарим Вас за участие.');
    } catch (error) {
      console.error('Ошибка при отправке данных:', error);
      message.error('Ошибка при отправке данных. Попробуйте снова.');
    }
  };
  

  const final = () => (
    <div style={centeredContainerStyle}>
      <div style={rectangleStyle}>
        <Title level={2}>Ответы успешно сохранены!</Title>
        <Text>Данные приняты! Благодарим Вас за участие.</Text>
      </div>
    </div>
  );

  const instructions = () => (
    <div style={centeredContainerStyle}>
      <div style={rectangleStyle}>
        <Title level={3}>Инструкция к прохождению теста</Title>
        <Text>
          Пожалуйста, оцените сложность восприятия каждого текста по двум шкалам: 
          на первой шкале — от 0 до {N_OPTIONS - 1} (где 0 означает «очень легко» и {N_OPTIONS - 1} — «очень сложно»), 
          и на второй шкале — от 0 до {N_OPTIONS - 1} (где 0 означает «очень негативно» и {N_OPTIONS - 1} — «очень позитивно»). 
          После оценки всех текстов нажмите кнопку "Отправить ответы".
        </Text>
        <div style={{ marginTop: '20px' }}>
          <Button type="primary" onClick={() => setShowInstructions(false)}>
            Начать тест
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <div style={mainContainerStyle}>
      {showInstructions ? (
        instructions()
      ) : dataSended ? (
        final()
      ) : (
        <div style={centeredContainerStyle}>
          <div style={rectangleStyle}>
            {/* Добавляем текст над прямоугольником */}
            <h4 style={{ fontWeight: 'bold', fontSize: '16px' }}>
              {`${currentIndex + 1} / ${texts.length} Пожалуйста, оцените восприятие следующего текста:`}
            </h4>
  
            <Text block style={{ 
              marginTop: '20px', 
              textAlign: 'justify', // Выравнивание по ширине
              lineHeight: '1.5',  // Увеличиваем расстояние между строками
              fontSize: '18px',   // Увеличиваем размер шрифта
            }}>
              {texts[currentIndex]}
            </Text>
  
            {/* Отделяем подсказку из текста */}
            <h4 style={{ marginTop: '20px' }}>Оцените сложность:</h4>
            <div style={{ marginTop: '10px' }}>
              {Array.from({ length: N_OPTIONS }).map((_, index) => (
                <Button 
                  key={`complexity-${index}`} 
                  style={{ 
                    marginRight: '10px', 
                    backgroundColor: selectedComplexity === index ? '#1890ff' : 'inherit',
                    color: selectedComplexity === index ? '#fff' : 'inherit'
                  }} 
                  onClick={() => setSelectedComplexity(index)}
                >
                  {index}
                </Button>
              ))}
            </div>
  
            <h4 style={{ marginTop: '20px' }}>Оцените "интересность":</h4>
            <div style={{ marginTop: '10px' }}>
              {Array.from({ length: N_OPTIONS }).map((_, index) => (
                <Button 
                  key={`emotion-${index}`} 
                  style={{ 
                    marginRight: '10px', 
                    backgroundColor: selectedEmotion === index ? '#1890ff' : 'inherit',
                    color: selectedEmotion === index ? '#fff' : 'inherit'
                  }} 
                  onClick={() => setSelectedEmotion(index)}
                >
                  {index}
                </Button>
              ))}
            </div>
  
            <Button type="primary" onClick={handleAnswer} style={{ marginTop: '20px' }}>
              Далее
            </Button>
          </div>
        </div>
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

const centeredContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
};

const rectangleStyle = {
  border: '1px solid #ddd',
  borderRadius: '8px',
  padding: '20px',
  width: '600px',
  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  backgroundColor: '#fff',
};

const generateUniqueId = () => {
  return `user_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
};

export default App;
