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

const centeredContainerStyle = { /* стили такие же */ };
const rectangleStyle = { /* стили такие же */ };

export default Final;
