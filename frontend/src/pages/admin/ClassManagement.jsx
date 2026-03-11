import React, { useState } from 'react';
import { Table, Card, Button, Space, Modal, Form, Select, Typography, Row, Col, Input, Tag, message, Popconfirm } from 'antd';
import { PlusSquareOutlined, EditOutlined, DeleteOutlined, InfoCircleOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;
const { Option } = Select;

const ClassManagement = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingClass, setEditingClass] = useState(null);
    const [form] = Form.useForm();
    
    // Engineering Semesters & Batches Mock Data
    const [data, setData] = useState([
        { id: '1', name: 'CSE-A', semester: 'VI', academic_year: '2023-24', intake: 60, coordinator: 'Dr. Sarah Connor' },
        { id: '2', name: 'CSE-B', semester: 'VI', academic_year: '2023-24', intake: 60, coordinator: 'Prof. James Bond' },
        { id: '3', name: 'CSE-C', semester: 'VI', academic_year: '2023-24', intake: 60, coordinator: 'Dr. John Doe' },
    ]);

    const handleAdd = () => {
        setEditingClass(null);
        form.resetFields();
        setIsModalOpen(true);
    };

    const handleEdit = (record) => {
        setEditingClass(record);
        form.setFieldsValue(record);
        setIsModalOpen(true);
    };

    const handleDelete = (id) => {
        setData(data.filter(item => item.id !== id));
        message.success('Section deleted successfully');
    };

    const handleModalSubmit = () => {
        form.validateFields().then(values => {
            if (editingClass) {
                // Update
                setData(data.map(item => item.id === editingClass.id ? { ...item, ...values } : item));
                message.success('Section updated successfully');
            } else {
                // Create
                const newClass = {
                    id: Date.now().toString(),
                    ...values
                };
                setData([...data, newClass]);
                message.success('New section created successfully');
            }
            setIsModalOpen(false);
        });
    };

    const columns = [
        { 
            title: 'Section Name', 
            dataIndex: 'name', 
            key: 'name',
            render: (text) => <Tag color="#2459a8" style={{ fontSize: '13px', fontWeight: 600, padding: '4px 12px', borderRadius: '4px' }}>{text}</Tag>
        },
        { 
            title: 'Semester', 
            dataIndex: 'semester', 
            key: 'semester',
            render: (val) => <Text strong style={{ color: '#595959' }}>SEM {val}</Text>
        },
        { title: 'Academic Year', dataIndex: 'academic_year', key: 'academic_year' },
        { title: 'Student Intake', dataIndex: 'intake', key: 'intake', render: (val) => <Text>{val}</Text> },
        { title: 'Batch Coordinator', dataIndex: 'coordinator', key: 'coordinator', render: (val) => <Text style={{ color: '#262626' }}>{val}</Text> },
        {
            title: 'Actions',
            key: 'actions',
            align: 'right',
            render: (_, record) => (
                <Space size="middle">
                    <Button 
                        icon={<EditOutlined />} 
                        onClick={() => handleEdit(record)}
                        style={{ color: '#1890ff', borderColor: '#1890ff' }}
                    />
                    <Popconfirm
                        title="Delete Section"
                        description="Are you sure you want to delete this section?"
                        onConfirm={() => handleDelete(record.id)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button icon={<DeleteOutlined />} danger />
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    return (
        <div style={{ padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '32px', borderLeft: '6px solid #e84c30', paddingLeft: '24px' }}>
                <div>
                    <Title level={2} style={{ margin: 0, fontWeight: 700 }}>Section & <span style={{ color: '#e84c30' }}>Batch Control</span></Title>
                    <Text type="secondary" style={{ fontSize: '14px' }}>Managing 3rd Year (Sem VI) Academic Sections</Text>
                </div>
                <Button 
                    type="primary" 
                    icon={<PlusSquareOutlined />} 
                    size="large" 
                    onClick={handleAdd}
                    style={{ background: '#e84c30', borderColor: '#e84c30', height: '48px', fontWeight: 600 }}
                >
                    Create New Section
                </Button>
            </div>

            <Card bordered={false} style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.05)', borderRadius: '12px' }}>
                <Table 
                    columns={columns} 
                    dataSource={data} 
                    rowKey="id" 
                    pagination={false} 
                    className="forms-table"
                />
            </Card>

            <Modal
                title={<Title level={4}>{editingClass ? 'Update Section' : 'Create New Section'}</Title>}
                open={isModalOpen}
                onOk={handleModalSubmit}
                onCancel={() => setIsModalOpen(false)}
                okText={editingClass ? 'Update' : 'Create'}
                okButtonProps={{ style: { background: '#e84c30', borderColor: '#e84c30' } }}
                width={600}
                centered
            >
                <Form 
                    form={form} 
                    layout="vertical" 
                    style={{ marginTop: '24px' }}
                >
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item name="name" label="Section Name" rules={[{ required: true }]}>
                                <Input placeholder="e.g. CSE-A" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item name="semester" label="Semester" rules={[{ required: true }]}>
                                <Select placeholder="Select Semester">
                                    <Option value="I">SEM I</Option>
                                    <Option value="II">SEM II</Option>
                                    <Option value="III">SEM III</Option>
                                    <Option value="IV">SEM IV</Option>
                                    <Option value="V">SEM V</Option>
                                    <Option value="VI">SEM VI</Option>
                                    <Option value="VII">SEM VII</Option>
                                    <Option value="VIII">SEM VIII</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item name="academic_year" label="Academic Year" rules={[{ required: true }]}>
                                <Input placeholder="e.g. 2023-24" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item name="intake" label="Student Intake" rules={[{ required: true }]}>
                                <Input type="number" placeholder="60" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Form.Item name="coordinator" label="Batch Coordinator" rules={[{ required: true }]}>
                        <Input placeholder="Enter Coordinator Name" />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default ClassManagement;
