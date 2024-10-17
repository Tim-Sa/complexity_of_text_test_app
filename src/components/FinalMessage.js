import React from 'react';
import { Typography } from 'antd';

const { Title, Text } = Typography;

const FinalMessage = () => (
  <div className="centered-container">
    <div className="rectangle">
      <Title level={2}>Ответы успешно сохранены!</Title>
      <Text>Данные приняты! Благодарим Вас за участие.</Text>
    </div>
  </div>
);

export default FinalMessage;
