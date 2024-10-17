import React from 'react';
import { Button, Typography } from 'antd';

const { Text } = Typography;

const TextRating = ({ currentIndex, texts, N_OPTIONS, onAnswer }) => (
  <div className="centered-container">
    <Text style={{ marginBottom: '10px' }}>
      {`${currentIndex + 1} / ${texts.length} Пожалуйста, оцените сложность восприятия следующего текста:`}
    </Text>
    <div className="rectangle">
      <Text style={{ textAlign: 'justify' }} block>{texts[currentIndex]}</Text>
      
      <Text strong style={{ marginTop: '20px' }}>Сложность восприятия текста:</Text>
      <div style={{ marginTop: '10px' }}>
        {Array.from({ length: N_OPTIONS }).map((_, index) => (
          <Button 
            key={index} 
            style={{ marginRight: '10px' }} 
            onClick={() => onAnswer('complexity', index.toString())} // Изменили функцию нажатия для первой шкалы
          >
            {index}
          </Button>
        ))}
      </div>

      <Text strong style={{ marginTop: '20px' }}>Способность текста вызвать интерес:</Text>
      <div style={{ marginTop: '10px' }}>
        {Array.from({ length: N_OPTIONS }).map((_, index) => (
          <Button 
            key={index + N_OPTIONS}  // чтобы ключи не пересекались
            style={{ marginRight: '10px' }} 
            onClick={() => onAnswer('interest', index.toString())} // Изменили функцию нажатия для второй шкалы
          >
            {index}
          </Button>
        ))}
      </div>
    </div>
  </div>
);

export default TextRating;
