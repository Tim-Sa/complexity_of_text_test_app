import React from 'react';
import { Button, Typography } from 'antd';

const { Title, Text } = Typography;

const Instructions = ({ setShowInstructions, N_OPTIONS }) => (
  <div style={centeredContainerStyle}>
    <div style={rectangleStyle}>
      <Title level={3}>Инструкция к прохождению теста</Title>
      <Text>
        Пожалуйста, оцените сложность восприятия каждого текста по двум шкалам: 
        на первой шкале — от 0 до {N_OPTIONS - 1} (где 0 означает «очень легко» и {N_OPTIONS - 1} — «очень сложно»), 
        и на второй шкале — от 0 до {N_OPTIONS - 1} (где 0 означает «очень скучно» и {N_OPTIONS - 1} — «очень интересно»). 
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

export default Instructions;
