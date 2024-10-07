import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import authService from '../services/authService';

const Registration = () => {
    const [loading, setLoading] = useState(false);

    const onFinish = async (values) => {
        setLoading(true);
        try {
            await authService.register(values);
            message.success('Пользователь успешно зарегистрирован!');
        } catch (error) {
            message.error('Ошибка при регистрации.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Form onFinish={onFinish} layout="vertical">
            <Form.Item name="username" label="Имя пользователя" rules={[{ required: true, message: 'Пожалуйста, введите имя пользователя!' }]}>
                <Input />
            </Form.Item>
            <Form.Item name="email" label="Email" rules={[{ required: true, message: 'Пожалуйста, введите ваш email!' }]}>
                <Input />
            </Form.Item>
            <Form.Item name="name" label="Полное имя" rules={[{ required: true, message: 'Пожалуйста, введите ваше полное имя!' }]}>
                <Input />
            </Form.Item>
            <Form.Item name="password" label="Пароль" rules={[{ required: true, message: 'Пожалуйста, введите пароль!' }]}>
                <Input.Password />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit" loading={loading}>
                    Зарегистрироваться
                </Button>
            </Form.Item>
        </Form>
    );
};

export default Registration;
