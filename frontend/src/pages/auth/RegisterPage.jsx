import { Form, Input, Button, Select, message } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import { useNavigate, Link } from 'react-router-dom';

const { Option } = Select;

const RegisterPage = () => {
    const navigate = useNavigate();

    const onFinish = (values) => {
        console.log('Register values:', values);
        message.success('Registration Successful! Please login.');
        navigate('/login');
    };

    return (
        <Form
            name="register_form"
            onFinish={onFinish}
            layout="vertical"
            size="large"
        >
            <Form.Item
                name="email"
                rules={[
                    { required: true, message: 'Please input your Email!' },
                    { type: 'email', message: 'Invalid email format' }
                ]}
            >
                <Input prefix={<MailOutlined />} placeholder="Email Address" />
            </Form.Item>
            <Form.Item
                name="role"
                initialValue="student"
                rules={[{ required: true, message: 'Please select a role!' }]}
            >
                <Select placeholder="Registering as...">
                    <Option value="student">Student</Option>
                    <Option value="teacher">Teacher</Option>
                    <Option value="admin">Administrator</Option>
                </Select>
            </Form.Item>
            <Form.Item
                name="password"
                rules={[{ required: true, message: 'Please input your Password!' }]}
            >
                <Input.Password prefix={<LockOutlined />} placeholder="Password" />
            </Form.Item>
            <Form.Item
                name="confirm"
                dependencies={['password']}
                hasFeedback
                rules={[
                    { required: true, message: 'Please confirm your password!' },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                            }
                            return Promise.reject(new Error('Passwords did not match!'));
                        },
                    }),
                ]}
            >
                <Input.Password prefix={<LockOutlined />} placeholder="Confirm Password" />
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit" block>
                    Register
                </Button>
            </Form.Item>
            
            <div style={{ textAlign: 'center' }}>
                Already have an account? <Link to="/login">Login here</Link>
            </div>
        </Form>
    );
};

export default RegisterPage;
