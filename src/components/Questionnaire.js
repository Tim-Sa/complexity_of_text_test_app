import React from 'react';
import { Button, Typography } from 'antd';
import './App.css';

const { Text } = Typography;

const Questionnaire = ({ 
  currentIndex, texts, N_OPTIONS, 
  selectedComplexity, selectedEmotion, 
  setSelectedComplexity, setSelectedEmotion, handleAnswer 
}) => (
  <div style={mainContainerStyle}>
    <div style={centeredContainerStyle}>
      <div style={rectangleStyle}>
        <h4 style={{ fontWeight: 'bold', fontSize: '16px' }}>
          {`${currentIndex + 1} / ${texts.length} Пожалуйста, оцените восприятие следующего текста:`}
        </h4>

        <Text block style={{ 
          marginTop: '20px', 
          textAlign: 'justify',
          lineHeight: '1.5',
          fontSize: '18px',
        }}>
          {texts[currentIndex]}
        </Text>

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
  </div>
);

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

export default Questionnaire;
