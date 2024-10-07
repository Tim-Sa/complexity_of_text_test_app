import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import Registration from './components/Registration';
import Login from './components/Login';
import QuestionForm from './components/QuestionForm';
import Final from './components/Final';

const { Header, Content } = Layout;

function App() {

    const menuItems = [
        {
            key: 'login',
            label: <Link to="/login">Login</Link>,
        },
        {
            key: 'register',
            label: <Link to="/register">Register</Link>,
        },
    ];

    return (
        <Router>
            <Layout className="layout">
                <Header className="header">
                    <Menu theme="dark" mode="horizontal" items={menuItems} />
                </Header>
                <Content style={{ padding: '50px' }}>
                    <Routes>
                        <Route path="/register" element={<Registration />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/questions" element={<QuestionForm />} />
                        <Route path="/final" element={<Final />} />
                        <Route path="/" element={<h1>Welcome</h1>} />
                    </Routes>
                </Content>
            </Layout>
        </Router>
    );
}

export default App;
