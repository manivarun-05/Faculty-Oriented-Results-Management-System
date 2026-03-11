import React, { useState } from 'react';
import { Table, Card, Button, Space, Modal, Form, Select, message, Typography, Badge, Row, Col, Input, Tag } from 'antd';
import { UserAddOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

const { Title } = Typography;
const { Option } = Select;

const TeacherManagement = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingTeacher, setEditingTeacher] = useState(null);
    const [form] = Form.useForm();

    const [data, setData] = useState([
        { id: '1', employee_id: 'FA-CSE-101', full_name: 'Dr. Sarah Connor', email: 'sarah.c@cse.college.edu', department: 'CSE', designation: 'HOD', contact: '+1122334455' },
        { id: '2', employee_id: 'FA-CSE-102', full_name: 'Prof. James Bond', email: 'james.b@cse.college.edu', department: 'CSE', designation: 'Associate Prof.', contact: '+6677889900' },
        { id: '3', employee_id: 'FA-IT-105', full_name: 'Dr. John Doe', email: 'john.d@it.college.edu', department: 'Information Tech', designation: 'Asst. Prof.', contact: '+9988776655' },
    ]);

    const showModal = (teacher = null) => {
        setEditingTeacher(teacher);
        if (teacher) form.setFieldsValue(teacher);
        else form.resetFields();
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setEditingTeacher(null);
    };

    const columns = [
        { title: 'Faculty ID', dataIndex: 'employee_id', key: 'employee_id' },
        { title: 'Faculty Name', dataIndex: 'full_name', key: 'full_name', sorter: (a, b) => a.full_name.localeCompare(b.full_name) },
        { 
            title: 'Designation', 
            dataIndex: 'designation', 
            key: 'designation',
            render: (text) => <Tag color="blue">{text}</Tag>
        },
        { 
            title: 'Department', 
            dataIndex: 'department', 
            key: 'department',
            filters: [
                { text: 'CSE', value: 'CSE' },
                { text: 'AIML', value: 'AIML' },
                { text: 'AIDS', value: 'AIDS' },
            ],
            onFilter: (value, record) => record.department.indexOf(value) === 0,
        },
        { title: 'Email', dataIndex: 'email', key: 'email' },
        {
            title: 'Actions',
            key: 'actions',
            render: (_, record) => (
                <Space size="middle">
                    <Button icon={<EditOutlined />} onClick={() => showModal(record)} />
                    <Button icon={<DeleteOutlined />} danger />
                </Space>
            ),
        },
    ];

    return (
        <div style={{ padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px', alignItems: 'center' }}>
                <div>
                    <Title level={3}>Faculty <span style={{ color: '#e84c30' }}>Directory</span></Title>
                    <Badge count={data.length} showZero color="#6b3fa0" offset={[10, 0]}>
                        <span style={{ color: '#8a8a8a' }}>Year 3 Teaching Faculty</span>
                    </Badge>
                </div>
                <Button type="primary" icon={<UserAddOutlined />} size="large" onClick={() => showModal()}>
                    Add New Faculty Member
                </Button>
            </div>

            <Card bordered={false}>
                <Table columns={columns} dataSource={data} rowKey="id" />
            </Card>

            <Modal
                title={editingTeacher ? 'Edit Profile' : 'Register New Faculty'}
                open={isModalOpen} onCancel={handleCancel} footer={null} width={640}
            >
                <Form form={form} layout="vertical" style={{ marginTop: '20px' }}>
                    <Row gutter={16}>
                        <Col span={12}><Form.Item name="full_name" label="Full Name" rules={[{ required: true }]}><Input /></Form.Item></Col>
                        <Col span={12}><Form.Item name="employee_id" label="Faculty ID (Unique)" rules={[{ required: true }]}><Input /></Form.Item></Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item name="designation" label="Designation" rules={[{ required: true }]}>
                                <Select>
                                    <Option value="HOD">HOD / Dept Head</Option>
                                    <Option value="Professor">Professor</Option>
                                    <Option value="Associate Prof.">Associate Prof.</Option>
                                    <Option value="Asst. Prof.">Assistant Prof.</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item name="department" label="Department" rules={[{ required: true }]}>
                                <Select placeholder="Select Branch/Dept">
                                    <Option value="CSE">CSE</Option>
                                    <Option value="AIML">AIML</Option>
                                    <Option value="AIDS">AIDS</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Form.Item style={{ textAlign: 'right', marginTop: '24px' }}>
                        <Space>
                            <Button onClick={handleCancel}>Cancel</Button>
                            <Button type="primary" htmlType="submit">Save Faculty Profile</Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default TeacherManagement;
