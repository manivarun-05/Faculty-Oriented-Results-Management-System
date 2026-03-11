import React, { useState } from 'react';
import { Layout, Menu, Button, Space, Avatar, Dropdown } from 'antd';
import { 
    DashboardOutlined, 
    UserOutlined, 
    BookOutlined, 
    ScheduleOutlined, 
    BarChartOutlined, 
    MenuUnfoldOutlined, 
    MenuFoldOutlined,
    LogoutOutlined,
    TeamOutlined,
    FileTextOutlined,
    SafetyCertificateOutlined
} from '@ant-design/icons';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';

const { Header, Sider, Content } = Layout;

const MainLayout = () => {
    const [collapsed, setCollapsed] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    
    // Simulating user role for menu (admin, teacher, student)
    const userRole = 'admin'; // Testing

    const menuItems = [
        {
            key: '/dashboard',
            icon: <DashboardOutlined />,
            label: 'Dashboard',
            onClick: () => navigate('/dashboard')
        },
        // Admin only items
        ...(userRole === 'admin' ? [
            {
                key: '/admin/students',
                icon: <TeamOutlined />,
                label: 'Manage Students',
                onClick: () => navigate('/admin/students')
            },
            {
                key: '/admin/teachers',
                icon: <UserOutlined />,
                label: 'Manage Teachers',
                onClick: () => navigate('/admin/teachers')
            },
            {
                key: '/admin/classes',
                icon: <ScheduleOutlined />,
                label: 'Manage Classes',
                onClick: () => navigate('/admin/classes')
            },
            {
                key: '/admin/results',
                icon: <FileTextOutlined />,
                label: 'Results Ledger',
                onClick: () => navigate('/admin/results')
            }
        ] : []),
        // Teacher items
        ...(userRole === 'teacher' ? [
            {
                key: '/teacher/marks',
                icon: <FileTextOutlined />,
                label: 'Enter Marks',
                onClick: () => navigate('/teacher/marks')
            },
            {
                key: '/teacher/analytics',
                icon: <BarChartOutlined />,
                label: 'Class Analytics',
                onClick: () => navigate('/teacher/analytics')
            }
        ] : []),
        // Student items
        ...(userRole === 'student' ? [
            {
                key: '/student/results',
                icon: <FileTextOutlined />,
                label: 'My Results',
                onClick: () => navigate('/student/results')
            },
            {
                key: '/student/performance',
                icon: <BarChartOutlined />,
                label: 'Performance',
                onClick: () => navigate('/student/performance')
            }
        ] : []),
    ];

    const userMenu = {
        items: [
            {
                key: 'profile',
                icon: <UserOutlined />,
                label: 'Profile Settings',
            },
            {
                key: 'logout',
                icon: <LogoutOutlined />,
                label: 'Logout',
                onClick: () => navigate('/login')
            }
        ]
    };

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider trigger={null} collapsible collapsed={collapsed} theme="dark" width={260}>
                <div className="logo-container" style={{ 
                    padding: '24px 16px', 
                    height: '64px', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: collapsed ? 'center' : 'flex-start',
                    overflow: 'hidden'
                }}>
                    {collapsed ? (
                        <div style={{ 
                            background: 'linear-gradient(135deg, #e84c30 0%, #c0392b 100%)', 
                            width: '40px', 
                            height: '40px', 
                            borderRadius: '10px', 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifySelf: 'center',
                            justifyContent: 'center',
                            boxShadow: '0 4px 8px rgba(0,0,0,0.3)'
                        }}>
                            <SafetyCertificateOutlined style={{ fontSize: '24px', color: '#fff' }} />
                        </div>
                    ) : (
                        <div className="logo" style={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            gap: '12px',
                            fontFamily: "'Inter', sans-serif"
                        }}>
                            <div style={{ 
                                background: 'linear-gradient(135deg, #e84c30 0%, #c0392b 100%)', 
                                width: '36px', 
                                height: '36px', 
                                borderRadius: '8px', 
                                display: 'flex', 
                                alignItems: 'center', 
                                justifyContent: 'center',
                                boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
                            }}>
                                <SafetyCertificateOutlined style={{ fontSize: '20px', color: '#fff' }} />
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.1 }}>
                                <span style={{ fontSize: '18px', fontWeight: 800, color: '#fff', letterSpacing: '0.5px' }}>FORMS</span>
                                <span style={{ fontSize: '10px', fontWeight: 500, color: '#e84c30', textTransform: 'uppercase', letterSpacing: '1px' }}>Faculty Oriented</span>
                            </div>
                        </div>
                    )}
                </div>
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={[location.pathname]}
                    items={menuItems}
                />
            </Sider>
            <Layout>
                <Header style={{ padding: 0, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingRight: '24px', borderBottom: '1px solid #f0f0f0' }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Button
                            type="text"
                            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                            onClick={() => setCollapsed(!collapsed)}
                            style={{ fontSize: '16px', width: 64, height: 64 }}
                        />
                    </div>
                    <Space size="middle">
                        <Dropdown menu={userMenu}>
                            <Space style={{ cursor: 'pointer' }}>
                                <Avatar icon={<UserOutlined />} />
                                <span style={{ color: '#333', fontWeight: 600 }}>Admin</span>
                            </Space>
                        </Dropdown>
                    </Space>
                </Header>
                <Content style={{ margin: '24px 16px', padding: 24, minHeight: 280, borderRadius: 8 }}>
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
};

export default MainLayout;
