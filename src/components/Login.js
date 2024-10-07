import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import authService from '../services/authService';

const Login = () => {
    const [loading, setLoading] = useState(false);
    
    const apiUrl = process.env.REACT_APP_API_URL;

    const onFinish = async (values) => {
        setLoading(true);
        try {
            await authService.login(apiUrl, values);
            message.success('Вы успешно вошли в систему');
        } catch (error) {
            message.error('Ошибка при входе в систему.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Form onFinish={onFinish} layout="vertical">
            <Form.Item name="username" label="Имя пользователя" rules={[{ required: true, message: 'Пожалуйста, введите имя пользователя!' }]}>
                <Input />
            </Form.Item>
            <Form.Item name="password" label="Пароль" rules={[{ required: true, message: 'Пожалуйста, введите пароль!' }]}>
                <Input.Password />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit" loading={loading}>
                    Войти
                </Button>
            </Form.Item>
        </Form>
    );
};

export default Login;
