import React from 'react';
import { Button, Typography } from 'antd';

const { Title, Text } = Typography;

const Instructions = ({ onStart }) => (
  <div className="centered-container">
    <div className="rectangle">
      <Title level={3}>Инструкция к прохождению теста</Title>
      <Text>
        Пожалуйста, оцените сложность восприятия каждого текста, нажимая на кнопки с числами от 0 до 7. 
        Где 0 означает «очень легко» и 7 — «очень сложно». 
        После оценки всех текстов нажмите кнопку "Отправить ответы".
      </Text>
      <div style={{ marginTop: '20px' }}>
        <Button type="primary" onClick={onStart}>
          Начать тест
        </Button>
      </div>
    </div>
  </div>
);

export default Instructions;
