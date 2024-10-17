import React from 'react';
import { Typography } from 'antd';

const { Title, Text } = Typography;

const Final = () => (
  <div style={centeredContainerStyle}>
    <div style={rectangleStyle}>
      <Title level={2}>Ответы успешно сохранены!</Title>
      <Text>Данные приняты! Благодарим Вас за участие.</Text>
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

export default Final;
