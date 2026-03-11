import { Form, Input, Button, Checkbox, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate, Link } from 'react-router-dom';

const LoginPage = () => {
    const navigate = useNavigate();

    const onFinish = (values) => {
        console.log('Login values:', values);
        // Simulation login
        if (values.email && values.password) {
            message.success('Login Successful!');
            navigate('/dashboard');
        } else {
            message.error('Invalid Credentials');
        }
    };

    return (
        <Form
            name="login_form"
            onFinish={onFinish}
            layout="vertical"
            size="large"
            style={{ marginTop: '8px' }}
        >
            <Form.Item
                name="email"
                label={<span style={{ fontWeight: 600, color: '#595959', fontSize: '13px' }}>ACCOUNT EMAIL</span>}
                rules={[
                    { required: true, message: 'Please input your Email!' },
                    { type: 'email', message: 'Invalid email format' }
                ]}
            >
                <Input prefix={<UserOutlined style={{ color: '#bfbfbf' }} />} placeholder="Enter your institutional email" style={{ borderRadius: '8px' }} />
            </Form.Item>
            
            <Form.Item
                name="password"
                label={<span style={{ fontWeight: 600, color: '#595959', fontSize: '13px' }}>SECRET PASSWORD</span>}
                rules={[{ required: true, message: 'Please input your Password!' }]}
            >
                <Input.Password prefix={<LockOutlined style={{ color: '#bfbfbf' }} />} placeholder="••••••••" style={{ borderRadius: '8px' }} />
            </Form.Item>
            
            <Form.Item style={{ marginBottom: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Form.Item name="remember" valuePropName="checked" noStyle>
                        <Checkbox style={{ fontSize: '13px', color: '#8c8c8c' }}>Auto-login on this device</Checkbox>
                    </Form.Item>
                    <a href="" style={{ fontSize: '13px', color: '#e84c30', fontWeight: 500 }}>Reset Password?</a>
                </div>
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit" block style={{ 
                    height: '50px', 
                    borderRadius: '8px', 
                    background: '#e84c30', 
                    borderColor: '#e84c30',
                    fontSize: '16px',
                    fontWeight: 600,
                    boxShadow: '0 4px 12px rgba(232, 76, 48, 0.15)'
                }}>
                    Sign In to Portal
                </Button>
            </Form.Item>
            
            <div style={{ textAlign: 'center', marginTop: '16px', color: '#8c8c8c' }}>
                Don't have an account? <Link to="/register" style={{ color: '#262626', fontWeight: 600 }}>Create Faculty ID</Link>
            </div>
        </Form>
    );
};

export default LoginPage;
