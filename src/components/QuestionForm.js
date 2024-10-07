import React, { useEffect, useState } from 'react';
import { Radio, Button, message } from 'antd';
import apiService from '../services/apiService';

const QuestionForm = () => {
    const [texts, setTexts] = useState([]);
    const [currentTextIndex, setCurrentTextIndex] = useState(0);
    const [answers, setAnswers] = useState({});
    
    const apiUrl = process.env.REACT_APP_API_URL;

    useEffect(() => {
        const fetchTexts = async () => {
            const response = await apiService.getTexts(apiUrl); // Загрузка текстов
            setTexts(response);
        };
        fetchTexts();
    }, []);

    const handleAnswer = (value) => {
        setAnswers({ ...answers, [texts[currentTextIndex].text]: value });
        setCurrentTextIndex(currentTextIndex + 1);
    };

    const handleSubmit = async () => {
        try {
            await apiService.submitAnswers(apiUrl, answers); // Отправка данных
            message.success('Ответы успешно сохранены!');
        } catch (error) {
            message.error('Ошибка при сохранении ответов.');
        }
    };

    return (
        <div>
            {currentTextIndex < texts.length ? (
                <>
                    <h3>{texts[currentTextIndex].text}</h3>
                    <Radio.Group onChange={(e) => handleAnswer(e.target.value)}>
                        {[...Array(8)].map((_, i) => (
                            <Radio key={i} value={i}>{i}</Radio>
                        ))}
                    </Radio.Group>
                    <Button type="secondary" onClick={() => setCurrentTextIndex(currentTextIndex + 1)}>Далее</Button>
                </>
            ) : (
                <Button type="primary" onClick={handleSubmit}>Отправить ответы</Button>
            )}
        </div>
    );
};

export default QuestionForm;
