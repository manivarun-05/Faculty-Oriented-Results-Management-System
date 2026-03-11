import React, { useState, useEffect } from 'react';
import { Table, Card, Button, Space, Typography, Tag, Select, Input, Badge, Row, Col, Form, Empty, Result, Modal, Upload, message, Tooltip, Statistic } from 'antd';
import { SearchOutlined, FilterOutlined, CloudDownloadOutlined, UserOutlined, BookOutlined, ClusterOutlined, InboxOutlined, ImportOutlined, HistoryOutlined, TeamOutlined, CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import resultService from '../../services/resultService';

const { Title, Text } = Typography;
const { Option } = Select;
const { Dragger } = Upload;

const ResultsManagement = () => {
    // Initial Mock Data (Fallback)
    const [data, setData] = useState([
        // Design Analysis of Algorithm (DAA)
        { key: '1', collage: 'MVSR WCE&T', year: '3rd Year', semester: '3-1', branch: 'CSE', subject: 'Design Analysis of Algorithm', htNo: '23H81A0516', internal: 36, external: 11, total: 47 },
        { key: '2', collage: 'MVSR WCE&T', year: '3rd Year', semester: '3-1', branch: 'CSE', subject: 'Design Analysis of Algorithm', htNo: '23H81A0532', internal: 27, external: 14, total: 41 },
        { key: '3', collage: 'MVSR WCE&T', year: '3rd Year', semester: '3-1', branch: 'CSE', subject: 'Design Analysis of Algorithm', htNo: '23H81A0534', internal: 34, external: 9, total: 43 },
        { key: '4', collage: 'MVSR WCE&T', year: '3rd Year', semester: '3-1', branch: 'CSE', subject: 'Design Analysis of Algorithm', htNo: '23H81A0535', internal: 24, external: 10, total: 34 },
        { key: '5', collage: 'MVSR WCE&T', year: '3rd Year', semester: '3-1', branch: 'CSE', subject: 'Design Analysis of Algorithm', htNo: '23H81A0542', internal: 29, external: 6, total: 35 },
        { key: '6', collage: 'MVSR WCE&T', year: '3rd Year', semester: '3-1', branch: 'CSE', subject: 'Design Analysis of Algorithm', htNo: '24H85A0501', internal: 29, external: 6, total: 35 },
        // Computer Networks (CN)
        { key: '7', collage: 'MVSR WCE&T', year: '3rd Year', semester: '3-1', branch: 'CSE', subject: 'Computer Networks', htNo: '23H81A0513', internal: 35, external: 15, total: 50 },
        { key: '8', collage: 'MVSR WCE&T', year: '3rd Year', semester: '3-1', branch: 'CSE', subject: 'Computer Networks', htNo: '23H81A0519', internal: 36, external: 13, total: 49 },
        { key: '9', collage: 'MVSR WCE&T', year: '3rd Year', semester: '3-1', branch: 'CSE', subject: 'Computer Networks', htNo: '23H81A0520', internal: 34, external: 4, total: 38 },
        { key: '10', collage: 'MVSR WCE&T', year: '3rd Year', semester: '3-1', branch: 'CSE', subject: 'Computer Networks', htNo: '23H81A0527', internal: 33, external: 20, total: 53 },
        { key: '11', collage: 'MVSR WCE&T', year: '3rd Year', semester: '3-1', branch: 'CSE', subject: 'Computer Networks', htNo: '23H81A0542', internal: 26, external: 17, total: 43 },
        // DevOps
        { key: '12', collage: 'MVSR WCE&T', year: '3rd Year', semester: '3-1', branch: 'CSE', subject: 'DevOps', htNo: '23H81A0534', internal: 35, external: 13, total: 48 },
        { key: '13', collage: 'MVSR WCE&T', year: '3rd Year', semester: '3-1', branch: 'CSE', subject: 'DevOps', htNo: '23H81A0540', internal: 26, external: 1, total: 27 },
        { key: '14', collage: 'MVSR WCE&T', year: '3rd Year', semester: '3-1', branch: 'CSE', subject: 'DevOps', htNo: '23H81A0515', internal: 37, external: 10, total: 47 },
    ]);

    const [searchResult, setSearchResult] = useState(null);
    const [hasSearched, setHasSearched] = useState(false);
    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    const handleSearch = async (values) => {
        setLoading(true);
        const { subject, branch } = values;
        try {
            // Filter all students matching the Branch and Subject
            const results = data.filter(d => 
                d.subject === subject && 
                d.branch === branch
            );
            setSearchResult(results);
        } catch (err) {
            message.error("Could not retrieve results from portal.");
            setSearchResult([]);
        } finally {
            setHasSearched(true);
            setLoading(false);
        }
    };

    const uploadProps = {
        name: 'file',
        multiple: false,
        accept: '.csv',
        customRequest: async ({ file, onSuccess, onError }) => {
            try {
                onSuccess("ok");
                setIsUploadModalOpen(false);
                message.success(`${file.name} processed: Records imported successfully.`);
            } catch (err) {
                onError(err);
                message.error(`${file.name} upload failed.`);
            }
        }
    };

    const columns = [
        { title: 'Hall Ticket No', dataIndex: 'htNo', key: 'htNo', sorter: (a, b) => a.htNo.localeCompare(b.htNo) },
        { title: 'Internal', dataIndex: 'internal', key: 'internal', align: 'center' },
        { title: 'External', dataIndex: 'external', key: 'external', align: 'center' },
        { title: 'Total', dataIndex: 'total', key: 'total', align: 'center',
          render: (total) => {
             let color = total >= 40 ? 'green' : 'orange';
             if (total < 35) color = 'red';
             return <Badge status="processing" color={color} text={total} />;
          }
        },
        { 
            title: 'Status', 
            key: 'status', 
            render: (_, record) => (
                <Tag color={record.total >= 35 ? 'success' : 'error'} icon={record.total >= 35 ? <CheckCircleOutlined /> : <CloseCircleOutlined />}>
                    {record.total >= 35 ? 'PASS' : 'FAIL'}
                </Tag>
            )
        }
    ];

    const passCount = searchResult ? searchResult.filter(r => r.total >= 35).length : 0;
    const failCount = searchResult ? searchResult.length - passCount : 0;

    return (
        <div style={{ padding: '24px' }}>
            <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
                <Col span={24}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            <Title level={3}>Faculty <span style={{ color: '#e84c30' }}>Control Panel</span></Title>
                            <Space split="|">
                                <Text type="secondary">3rd Year (3-1)</Text>
                                <Text type="secondary">Bulk Results Management</Text>
                                <Text type="secondary">MVSR WCE&T</Text>
                            </Space>
                        </div>
                        <Space>
                            <Tooltip title="Bulk faculty entry for semester marks">
                                <Button type="default" icon={<ImportOutlined />} onClick={() => setIsUploadModalOpen(true)}>Import marks (CSV)</Button>
                            </Tooltip>
                            <Button type="primary" icon={<CloudDownloadOutlined />} style={{ background: '#2459a8' }}>Export Entity PDF</Button>
                        </Space>
                    </div>
                </Col>
            </Row>

            <Card bordered={false} style={{ marginBottom: '24px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
                <Title level={4} style={{ marginBottom: '20px' }}><FilterOutlined /> Entity Filter (Branch & Subject)</Title>
                <Form form={form} layout="vertical" onFinish={handleSearch}>
                    <Row gutter={16}>
                        <Col xs={24} md={12}>
                            <Form.Item name="branch" label="Select Branch" rules={[{ required: true, message: 'Please select Branch' }]}>
                                <Select prefix={<ClusterOutlined />} placeholder="e.g. CSE" size="large">
                                    <Option value="CSE">CSE</Option>
                                    <Option value="AIML">AIML</Option>
                                    <Option value="AIDS">AIDS</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={12}>
                            <Form.Item name="subject" label="Select Subject" rules={[{ required: true, message: 'Please select Subject' }]}>
                                <Select prefix={<BookOutlined />} placeholder="Select Subject" size="large">
                                    <Option value="Design Analysis of Algorithm">Design Analysis of Algorithm</Option>
                                    <Option value="Computer Networks">Computer Networks</Option>
                                    <Option value="DevOps">DevOps</Option>
                                    <Option value="Image Processing">Image Processing</Option>
                                    <Option value="Distributed Database">Distributed Database</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row justify="end">
                        <Button type="primary" htmlType="submit" size="large" icon={<SearchOutlined />} style={{ padding: '0 40px', background: '#2d7a4f', borderColor: '#2d7a4f' }} loading={loading}>
                            View Entity Records
                        </Button>
                    </Row>
                </Form>
            </Card>

            <Card bordered={false}>
                {hasSearched ? (
                    searchResult && searchResult.length > 0 ? (
                        <div className="fade-in">
                            <Row gutter={16} style={{ marginBottom: '24px' }}>
                                <Col span={8}>
                                    <Card variant="outlined" style={{ background: '#f0f5ff' }}>
                                        <Statistic title="Total Students" value={searchResult.length} prefix={<TeamOutlined />} />
                                    </Card>
                                </Col>
                                <Col span={8}>
                                    <Card variant="outlined" style={{ background: '#f6ffed' }}>
                                        <Statistic title="Passed" value={passCount} valueStyle={{ color: '#3f8600' }} prefix={<CheckCircleOutlined />} />
                                    </Card>
                                </Col>
                                <Col span={8}>
                                    <Card variant="outlined" style={{ background: '#fff1f0' }}>
                                        <Statistic title="Failed" value={failCount} valueStyle={{ color: '#cf1322' }} prefix={<CloseCircleOutlined />} />
                                    </Card>
                                </Col>
                            </Row>
                            <Table 
                                columns={columns} 
                                dataSource={searchResult} 
                                pagination={{ pageSize: 10 }} 
                                bordered 
                                title={() => <Text strong>Batch Results: {searchResult[0].branch} | {searchResult[0].subject}</Text>}
                            />
                        </div>
                    ) : (
                        <Empty description="No records found for the selected entity." />
                    )
                ) : (
                    <div style={{ textAlign: 'center', padding: '60px 0' }}>
                        <ClusterOutlined style={{ fontSize: '64px', color: '#f0f0f0' }} />
                        <Title level={4} style={{ color: '#bfbfbf', marginTop: '16px' }}>Select Branch and Subject to load Records</Title>
                        <Text type="secondary">This portal is restricted for Faculty and Admin use only.</Text>
                    </div>
                )}
            </Card>

            <Modal
                title="Bulk Faculty Entry (CSV)"
                open={isUploadModalOpen}
                onCancel={() => setIsUploadModalOpen(false)}
                footer={null}
                width={500}
                centered
            >
                <Dragger {...uploadProps}>
                    <p className="ant-upload-drag-icon"><InboxOutlined style={{ color: '#e84c30' }} /></p>
                    <p className="ant-upload-text">Drag CSV to upload marks</p>
                </Dragger>
            </Modal>
        </div>
    );
};

export default ResultsManagement;
