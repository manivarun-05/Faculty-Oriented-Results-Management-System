import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN'; // or default en_US

// Layouts
import MainLayout from './layouts/MainLayout';
import AuthLayout from './layouts/AuthLayout';

// Pages
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import Dashboard from './pages/Dashboard';
import StudentManagement from './pages/admin/StudentManagement';
import TeacherManagement from './pages/admin/TeacherManagement';
import ClassManagement from './pages/admin/ClassManagement';
import ResultsManagement from './pages/admin/ResultsManagement';

const App = () => {
    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: '#e84c30', // accent
                    colorInfo: '#2459a8', // blue
                    colorSuccess: '#2d7a4f', // green
                    colorWarning: '#d4a843', // gold
                    colorError: '#e84c30', // red-accent
                    borderRadius: 4,
                    fontFamily: "'Syne', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
                },
                components: {
                    Layout: {
                        headerBg: '#2a3240', // slate
                        headerColor: '#f5f0e8', // cream
                    },
                    Card: {
                        colorBorderSecondary: '#e0d8cc', // border
                    }
                }
            }}
        >
            <Router>
                <Routes>
                    {/* Auth Routes */}
                    <Route element={<AuthLayout />}>
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/register" element={<RegisterPage />} />
                    </Route>

                    {/* Main Routes (Protected implicitly for now) */}
                    <Route element={<MainLayout />}>
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/admin/students" element={<StudentManagement />} />
                        <Route path="/admin/teachers" element={<TeacherManagement />} />
                        <Route path="/admin/classes" element={<ClassManagement />} />
                        <Route path="/admin/results" element={<ResultsManagement />} />
                        <Route path="/" element={<Navigate to="/dashboard" />} />
                    </Route>

                    {/* Fallback */}
                    <Route path="*" element={<Navigate to="/dashboard" replace />} />
                </Routes>
            </Router>
        </ConfigProvider>
    );
};

export default App;
