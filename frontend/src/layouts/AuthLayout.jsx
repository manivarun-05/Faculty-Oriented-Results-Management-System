import React from 'react';
import { Layout, Row, Col, Card, Typography } from 'antd';
import { Outlet } from 'react-router-dom';
import { SafetyCertificateOutlined } from '@ant-design/icons';

const { Content } = Layout;
const { Text } = Typography;

const AuthLayout = () => {
    return (
        <Layout className="auth-layout" style={{ minHeight: '100vh', background: '#f8f9fa' }}>
            <Content>
                <Row justify="center" align="middle" style={{ minHeight: '100vh' }}>
                    <Col xs={22} sm={16} md={12} lg={7}>
                        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                             <div style={{ 
                                display: 'inline-flex', 
                                alignItems: 'center', 
                                justifyContent: 'center',
                                background: 'linear-gradient(135deg, #e84c30 0%, #c12711 100%)', 
                                width: '64px', 
                                height: '64px', 
                                borderRadius: '16px', 
                                marginBottom: '20px',
                                boxShadow: '0 8px 16px rgba(232, 76, 48, 0.25)'
                             }}>
                                <SafetyCertificateOutlined style={{ fontSize: '32px', color: '#fff' }} />
                             </div>
                             <h1 style={{ 
                                fontFamily: "'Inter', sans-serif", 
                                fontSize: '42px', 
                                fontWeight: 800, 
                                color: '#1a1a1a',
                                margin: 0,
                                letterSpacing: '-2px',
                                lineHeight: 1
                             }}>
                                FORMS
                             </h1>
                             <Text style={{ 
                                color: '#e84c30', 
                                fontSize: '11px', 
                                fontWeight: 700, 
                                textTransform: 'uppercase', 
                                letterSpacing: '3px',
                                display: 'block',
                                marginTop: '4px'
                             }}>
                                Faculty Oriented Results
                             </Text>
                             <Text style={{ color: '#8c8c8c', fontSize: '14px', marginTop: '12px', display: 'block' }}>
                                Professional Academic Analytics Portal
                             </Text>
                        </div>
                        <Card bordered={false} style={{ 
                            boxShadow: '0 20px 40px rgba(0,0,0,.05)', 
                            borderRadius: '16px',
                            padding: '12px'
                        }}>
                             <Outlet />
                        </Card>
                        <div style={{ textAlign: 'center', marginTop: '32px' }}>
                            <Text style={{ color: '#bfbfbf', fontSize: '12px' }}>
                                © 2026 Faculty Oriented Results Management System • Professional Version
                            </Text>
                        </div>
                    </Col>
                </Row>
            </Content>
        </Layout>
    );
};

export default AuthLayout;
