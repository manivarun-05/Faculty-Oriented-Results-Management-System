import React, { useState, useEffect } from 'react';
import { Table, Card, Button, Input, Space, Modal, Form, Select, Typography, Badge, Row, Col, message, Tag } from 'antd';
import { EditOutlined, DeleteOutlined, SearchOutlined, UserAddOutlined } from '@ant-design/icons';
import api from '../../services/api';

const { Title, Text } = Typography;
const { Option } = Select;

const StudentManagement = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingStudent, setEditingStudent] = useState(null);
    const [form] = Form.useForm();
    const [searchText, setSearchText] = useState('');

    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([
        { id: '1', roll_number: '23H81A0501', full_name: 'Mamatha', branch: 'CSE', subject: 'DAA' },
        { id: '2', roll_number: '23H81A0502', full_name: 'Aditi Anshu', branch: 'CSE', subject: 'DAA' },
        { id: '3', roll_number: '23H81A0503', full_name: 'Afrah Hussain', branch: 'CSE', subject: 'DAA' },
        { id: '4', roll_number: '23H81A0504', full_name: 'Athahar Begum', branch: 'CSE', subject: 'DAA' },
        { id: '5', roll_number: '23H81A0505', full_name: 'Atufa Sultana', branch: 'CSE', subject: 'DAA' },
        { id: '6', roll_number: '23H81A0506', full_name: 'Ayesha Saba Noor', branch: 'CSE', subject: 'DAA' },
        { id: '7', roll_number: '23H81A0507', full_name: 'Azra Yasmeen', branch: 'CSE', subject: 'DAA' },
        { id: '8', roll_number: '23H81A0508', full_name: 'B.Shailaja', branch: 'CSE', subject: 'DAA' },
        { id: '9', roll_number: '23H81A0509', full_name: 'Bilqees Asif Ahmed', branch: 'CSE', subject: 'DAA' },
        { id: '10', roll_number: '23H81A0510', full_name: 'Navya Sri', branch: 'CSE', subject: 'DAA' },
        { id: '11', roll_number: '23H81A0511', full_name: 'D.kalpana', branch: 'CSE', subject: 'DAA' },
        { id: '12', roll_number: '23H81A0512', full_name: 'Ruthika', branch: 'CSE', subject: 'DAA' },
        { id: '13', roll_number: '23H81A0513', full_name: 'E. Sanjana', branch: 'CSE', subject: 'DAA' },
        { id: '14', roll_number: '23H81A0514', full_name: 'Fouziya Begum', branch: 'CSE', subject: 'DAA' },
        { id: '15', roll_number: '23H81A0515', full_name: 'G.Shravanthi', branch: 'CSE', subject: 'DAA' },
        { id: '16', roll_number: '23H81A0516', full_name: 'J. Deekshitha', branch: 'CSE', subject: 'DAA' },
        { id: '17', roll_number: '23H81A0517', full_name: 'Khathiga', branch: 'CSE', subject: 'DAA' },
        { id: '18', roll_number: '23H81A0518', full_name: 'Kurakula Yamuna', branch: 'CSE', subject: 'DAA' },
        { id: '19', roll_number: '23H81A0519', full_name: 'k. Nandini', branch: 'CSE', subject: 'DAA' },
        { id: '20', roll_number: '23H81A0520', full_name: 'Madasu Anjali', branch: 'CSE', subject: 'DAA' },
        { id: '21', roll_number: '23H81A0521', full_name: 'Manafa Bint Ashfaq Ahmed', branch: 'CSE', subject: 'DAA' },
        { id: '22', roll_number: '23H81A0522', full_name: 'Maviya sayeeda', branch: 'CSE', subject: 'DAA' },
        { id: '23', roll_number: '23H81A0523', full_name: 'M. Manisha', branch: 'CSE', subject: 'DAA' },
        { id: '24', roll_number: '23H81A0524', full_name: 'Mubeena Begum', branch: 'CSE', subject: 'DAA' },
        { id: '25', roll_number: '23H81A0525', full_name: 'Muskaan', branch: 'CSE', subject: 'DAA' },
        { id: '26', roll_number: '23H81A0526', full_name: 'Nishath Begum', branch: 'CSE', subject: 'DAA' },
        { id: '27', roll_number: '23H81A0527', full_name: 'P.Nikitha', branch: 'CSE', subject: 'DAA' },
        { id: '28', roll_number: '23H81A0528', full_name: 'R Jyothi', branch: 'CSE', subject: 'DAA' },
        { id: '29', roll_number: '23H81A0529', full_name: 'Saara adeeb', branch: 'CSE', subject: 'DAA' },
        { id: '30', roll_number: '23H81A0530', full_name: 'Saba Tahreen', branch: 'CSE', subject: 'DAA' },
        { id: '31', roll_number: '23H81A0531', full_name: 'Sadiya Samee', branch: 'CSE', subject: 'DAA' },
        { id: '32', roll_number: '23H81A0532', full_name: 'Sameera', branch: 'CSE', subject: 'DAA' },
        { id: '33', roll_number: '23H81A0533', full_name: 'Samreen', branch: 'CSE', subject: 'DAA' },
        { id: '34', roll_number: '23H81A0534', full_name: 'Saniya Ibrar', branch: 'CSE', subject: 'DAA' },
        { id: '35', roll_number: '23H81A0535', full_name: 'Shaistha Sayeeda', branch: 'CSE', subject: 'DAA' },
        { id: '36', roll_number: '23H81A0536', full_name: 'Syed Mahiya', branch: 'CSE', subject: 'DAA' },
        { id: '37', roll_number: '23H81A0538', full_name: 'Thasleem Kausar', branch: 'CSE', subject: 'DAA' },
        { id: '38', roll_number: '23H81A0540', full_name: 'V.kavya', branch: 'CSE', subject: 'DAA' },
        { id: '39', roll_number: '23H81A0541', full_name: 'V. Poornima', branch: 'CSE', subject: 'DAA' },
        { id: '40', roll_number: '23H81A0542', full_name: 'V.V Kavya', branch: 'CSE', subject: 'DAA' },
        { id: '41', roll_number: '23H81A0543', full_name: 'Zainab Shireen', branch: 'CSE', subject: 'DAA' },
        { id: '42', roll_number: '23H81A0544', full_name: 'Ragha Sudha', branch: 'CSE', subject: 'DAA' },
        { id: '43', roll_number: '23H81A0545', full_name: 'Tejaswini', branch: 'CSE', subject: 'DAA' },
    ]);

    useEffect(() => {
        fetchStudents();
    }, []);

    const fetchStudents = async () => {
        setLoading(true);
        try {
            const response = await api.get('/students');
            if (response.data.success) {
                const mappedData = response.data.data.map(s => ({
                    id: s.id,
                    roll_number: s.reg_number,
                    full_name: s.full_name,
                    branch: s.Class?.name || 'CSE',
                    subject: 'Current Semester'
                }));
                setData(mappedData);
            }
        } catch (error) {
            console.error('Error fetching students:', error);
            // message.error('Failed to connect to database. Showing local data.');
        } finally {
            setLoading(false);
        }
    };

    const showModal = (student = null) => {
        setEditingStudent(student);
        if (student) form.setFieldsValue(student);
        else form.resetFields();
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setEditingStudent(null);
    };

    const onFinish = (values) => {
        if (editingStudent) {
            setData(data.map(item => item.id === editingStudent.id ? { ...item, ...values } : item));
            message.success('Student Profile Updated');
        } else {
            setData([...data, { id: Date.now().toString(), ...values }]);
            message.success('Student Registered Successfully');
        }
        setIsModalOpen(false);
    };

    const columns = [
        { 
            title: 'ROLL NO', 
            dataIndex: 'roll_number', 
            key: 'roll_number', 
            width: 150,
            render: (text) => <Text strong>{text}</Text>
        },
        { 
            title: 'NAME', 
            dataIndex: 'full_name', 
            key: 'full_name',
            sorter: (a, b) => a.full_name.localeCompare(b.full_name) 
        },
        { 
            title: 'BRANCH', 
            dataIndex: 'branch', 
            key: 'branch',
            render: (branch) => (
                <Tag color={branch === 'CSE' ? 'blue' : branch === 'AIML' ? 'purple' : 'cyan'}>
                    {branch}
                </Tag>
            )
        },
        { 
            title: 'SUBJECT', 
            dataIndex: 'subject', 
            key: 'subject' 
        },
        {
            title: 'ACTIONS',
            key: 'actions',
            width: 120,
            render: (_, record) => (
                <Space size="middle">
                    <Button type="text" icon={<EditOutlined style={{ color: '#2459a8' }} />} onClick={() => showModal(record)} />
                    <Button type="text" danger icon={<DeleteOutlined />} onClick={() => message.info('Delete feature active')} />
                </Space>
            ),
        },
    ];

    const filteredData = data.filter(item => 
        item.full_name.toLowerCase().includes(searchText.toLowerCase()) || 
        item.roll_number.toLowerCase().includes(searchText.toLowerCase())
    );

    return (
        <div style={{ padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px', alignItems: 'center' }}>
                <div>
                    <Title level={2}>Students</Title>
                    <Text type="secondary">Manage student records for MVSR WCE&T</Text>
                </div>
                <div style={{ display: 'flex', gap: '12px' }}>
                    <Input 
                        placeholder="Search..." 
                        prefix={<SearchOutlined />} 
                        onChange={e => setSearchText(e.target.value)}
                        style={{ width: 250 }}
                    />
                    <Button type="primary" icon={<UserAddOutlined />} size="large" onClick={() => showModal()} style={{ background: '#2d7a4f', borderColor: '#2d7a4f' }}>
                        Add Student
                    </Button>
                </div>
            </div>

            <Card bordered={false} bodyStyle={{ padding: 0 }}>
                <Table 
                    columns={columns} 
                    dataSource={filteredData} 
                    rowKey="id" 
                    pagination={{ pageSize: 10 }}
                    loading={loading}
                />
            </Card>

            <Modal
                title={<Title level={4} style={{ margin: 0 }}>{editingStudent ? 'Edit Student' : 'Add Student'}</Title>}
                open={isModalOpen} 
                onCancel={handleCancel} 
                footer={null} 
                width={500}
                centered
            >
                <Form form={form} layout="vertical" onFinish={onFinish} style={{ marginTop: '24px' }}>
                    <Form.Item 
                        name="roll_number" 
                        label={<Text strong style={{ fontSize: '12px', color: '#8a8a8a' }}>ROLL NUMBER</Text>} 
                        rules={[{ required: true }]}
                    >
                        <Input placeholder="e.g. 23H81A0516" size="large" />
                    </Form.Item>

                    <Form.Item 
                        name="full_name" 
                        label={<Text strong style={{ fontSize: '12px', color: '#8a8a8a' }}>FULL NAME</Text>} 
                        rules={[{ required: true }]}
                    >
                        <Input placeholder="John Doe" size="large" />
                    </Form.Item>

                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item 
                                name="branch" 
                                label={<Text strong style={{ fontSize: '12px', color: '#8a8a8a' }}>BRANCH</Text>} 
                                rules={[{ required: true }]}
                            >
                                <Select placeholder="Select Branch" size="large">
                                    <Option value="CSE">CSE</Option>
                                    <Option value="AIML">AIML</Option>
                                    <Option value="AIDS">AIDS</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item 
                                name="subject" 
                                label={<Text strong style={{ fontSize: '12px', color: '#8a8a8a' }}>SUBJECT</Text>} 
                                rules={[{ required: true }]}
                            >
                                <Select placeholder="Select Subject" size="large">
                                    <Option value="Design Analysis of Algorithm">DAA</Option>
                                    <Option value="Computer Networks">CN</Option>
                                    <Option value="DevOps">DevOps</Option>
                                    <Option value="Image Processing">IP</Option>
                                    <Option value="Distributed Database">DDB</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>

                    <Form.Item style={{ textAlign: 'right', marginTop: '32px', marginBottom: 0 }}>
                        <Space size="middle">
                            <Button onClick={handleCancel} size="large" style={{ width: '100px' }}>
                                Cancel
                            </Button>
                            <Button type="primary" htmlType="submit" size="large" style={{ width: '100px', background: '#2d7a4f', borderColor: '#2d7a4f' }}>
                                Save
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default StudentManagement;
