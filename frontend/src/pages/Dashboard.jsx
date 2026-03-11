import React from 'react';
import { Row, Col, Card, Statistic, Table, Typography, Space, Badge, Button, Tag } from 'antd';
import { 
    TeamOutlined, 
    BookOutlined, 
    DashboardOutlined,
    SafetyCertificateOutlined,
    RiseOutlined
} from '@ant-design/icons';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, Legend } from 'recharts';
import { WarningOutlined, ThunderboltOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

const { Title, Text } = Typography;

const Dashboard = () => {
    // Stats from Dr. V.R.K Women's College B.Tech 1st Year Result Analysis
    const stats = [
        { title: 'Total Strength', value: 124, icon: <TeamOutlined />, color: '#2459a8' },
        { title: 'Students Appeared', value: 121, icon: <DashboardOutlined />, color: '#d4a843' },
        { title: 'Overall Pass %', value: '63.63%', icon: <RiseOutlined />, color: '#2d7a4f' },
        { title: 'Lab Results', value: '100%', icon: <SafetyCertificateOutlined />, color: '#e84c30' }
    ];

    // Branch-wise Performance Data
    const branchPerformance = [
        { name: 'EEE', strength: 10, appeared: 8, passed: 4, passRate: 50, color: '#e84c30' },
        { name: 'ECE', strength: 11, appeared: 11, passed: 6, passRate: 54.54, color: '#f39c12' },
        { name: 'CSE', strength: 35, appeared: 35, passed: 25, passRate: 71.4, color: '#2d7a4f' },
        { name: 'CSE(AI&ML)', strength: 28, appeared: 28, passed: 17, passRate: 60.71, color: '#2459a8' },
        { name: 'CSE-DS', strength: 23, appeared: 23, passed: 14, passRate: 60.86, color: '#3498db' },
        { name: 'AIDS', strength: 17, appeared: 16, passed: 11, passRate: 68.75, color: '#9b59b6' },
    ];

    const columns = [
        {
          title: 'HT No (Hall Ticket)',
          dataIndex: 'htNo',
          key: 'htNo',
          render: (text) => <Text strong>{text}</Text>,
        },
        {
          title: 'Subject',
          dataIndex: 'subject',
          key: 'subject',
          render: (text) => <Tag color="blue">{text}</Tag>
        },
        {
          title: 'Internal',
          dataIndex: 'internal',
          key: 'internal',
        },
        {
          title: 'External',
          dataIndex: 'external',
          key: 'external',
        },
        {
          title: 'Total',
          dataIndex: 'total',
          key: 'total',
          render: (total) => {
              let color = total >= 40 ? 'green' : 'orange';
              if (total < 35) color = 'red';
              return <Badge status="processing" color={color} text={total} />;
          }
        },
      ];

      const tableData = [
        { key: '1', htNo: '23H81A0513', subject: 'Computer Networks', internal: 35, external: 15, total: 50 },
        { key: '2', htNo: '23H81A0527', subject: 'Distributed Database', internal: 38, external: 17, total: 55 },
        { key: '3', htNo: '23H81A0534', subject: 'DevOps', internal: 35, external: 13, total: 48 },
        { key: '4', htNo: '23H81A0540', subject: 'Image Processing', internal: 28, external: 3, total: 31 },
        { key: '5', htNo: '23H81A0516', subject: 'Design Analysis of Algorithm', internal: 36, external: 11, total: 47 }
    ];

    const handleDownloadPlan = () => {
        const doc = new jsPDF();
        const institutionalRed = '#e84c30';
        const darkGrey = '#262626';
        
        // --- Header Section ---
        doc.setFillColor('#e84c30');
        doc.rect(0, 0, 210, 40, 'F');
        
        doc.setTextColor('#ffffff');
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(28);
        doc.text('FORMS', 15, 22);
        
        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        doc.text('FACULTY ORIENTED RESULTS MANAGEMENT SYSTEM', 15, 30);
        
        doc.setFontSize(12);
        doc.setFont('helvetica', 'bold');
        doc.text('ACADEMIC IMPROVEMENT PLAN - 2026', 195, 20, { align: 'right' });
        
        // --- College Info ---
        doc.setTextColor(darkGrey);
        doc.setFontSize(20);
        doc.setFont('helvetica', 'bold');
        doc.text("Dr. V.R.K Women's College", 15, 55);
        
        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor('#666666');
        doc.text('B.Tech 1st Year (Semester-I) • Detailed Analysis & Strategic Roadmap', 15, 62);
        
        // --- Line ---
        doc.setDrawColor('#e84c30');
        doc.setLineWidth(0.5);
        doc.line(15, 65, 195, 65);
        
        // --- 1. Executive Summary ---
        doc.setTextColor(darkGrey);
        doc.setFontSize(12);
        doc.setFont('helvetica', 'bold');
        doc.text('1. EXECUTIVE SUMMARY', 15, 78);
        
        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor('#444444');
        const summary = "Based on the internal audit of 121 students, the institution has achieved an overall pass percentage of 63.63%. While practical proficiency (Labs) is at 100%, theory performance in EEE and ECE branches requires immediate strategic intervention to meet the 75% institutional target for Semester-II.";
        const splitSummary = doc.splitTextToSize(summary, 180);
        doc.text(splitSummary, 15, 85);
        
        // --- 2. Performance Audit Table ---
        doc.setTextColor(darkGrey);
        doc.setFontSize(12);
        doc.setFont('helvetica', 'bold');
        doc.text('2. BRANCH-WISE PERFORMANCE AUDIT', 15, 105);
        
        const tableRows = branchPerformance.map(b => [
            b.name, 
            b.strength, 
            b.appeared, 
            b.passed, 
            `${b.passRate}%`,
            b.passRate >= 70 ? 'Benchmark' : b.passRate >= 60 ? 'Stable' : 'Action Required'
        ]);
        
        autoTable(doc, {
            startY: 110,
            head: [['Branch', 'Strength', 'Appeared', 'Passed', 'Pass %', 'Status']],
            body: tableRows,
            headStyles: { fillColor: [232, 76, 48], textColor: [255, 255, 255], fontStyle: 'bold' },
            bodyStyles: { textColor: [38, 38, 38] },
            alternateRowStyles: { fillColor: [250, 250, 250] },
            theme: 'grid'
        });
        
        let currentY = doc.lastAutoTable.finalY + 15;
        
        // --- 3. Critical Observations ---
        doc.setTextColor(darkGrey);
        doc.setFontSize(12);
        doc.setFont('helvetica', 'bold');
        doc.text('3. CRITICAL OBSERVATIONS', 15, currentY);
        
        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor('#444444');
        const obs = [
            "• CSE is currently the lead department with 71.4% pass proficiency.",
            "• EEE and ECE showing significant gaps in theoretical application vs lab performance.",
            "• Critical failure points identified in Mathematics-II and Electronic Devices."
        ];
        doc.text(obs, 15, currentY + 7);
        
        // --- 4. Strategic Intervention ---
        currentY += 25;
        doc.setTextColor(darkGrey);
        doc.setFontSize(12);
        doc.setFont('helvetica', 'bold');
        doc.text('4. SEMESTER-II STRATEGIC INTERVENTION', 15, currentY);
        
        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor('#444444');
        const plan = [
            "  - Implementation of Project 'LIFT' (0-Hour Remedial sessions for EEE/ECE).",
            "  - Bi-weekly internal assessments focused on University Exam patterns.",
            "  - Mentor-Mentee program linking CSE toppers with at-risk students."
        ];
        doc.text(plan, 15, currentY + 7);
        
        // --- Footer ---
        const pageHeight = doc.internal.pageSize.height;
        doc.setFontSize(9);
        doc.setTextColor('#999999');
        doc.text(`Generated by FORMS Intelligence Engine on ${new Date().toLocaleDateString()}`, 15, pageHeight - 10);
        doc.text("Official Academic Document - Confidential", 195, pageHeight - 10, { align: 'right' });
        
        doc.save('FORMS_Academic_Improvement_Plan.pdf');
    };

    return (
        <div className="dashboard-container" style={{ background: '#f8f9fa', padding: '24px' }}>
            <div style={{ marginBottom: '40px', borderLeft: '6px solid #e84c30', paddingLeft: '24px' }}>
                <Title style={{ 
                    fontSize: '48px', 
                    fontWeight: 700, 
                    margin: 0, 
                    color: '#262626',
                    fontFamily: "'Inter', sans-serif",
                    letterSpacing: '-1px'
                }}>
                    Dr. V.R.K <span style={{ color: '#e84c30', fontWeight: 300 }}>Women's College</span>
                </Title>
                <Text style={{ 
                    fontSize: '18px', 
                    color: '#8c8c8c', 
                    fontWeight: 400, 
                    display: 'block', 
                    marginTop: '8px',
                    textTransform: 'uppercase',
                    letterSpacing: '1px'
                }}>
                    B.Tech 1st Year (Semester-I) • Detailed Result Analysis 2025-26
                </Text>
            </div>

            <Row gutter={[16, 16]}>
                {stats.map((stat, index) => (
                    <Col xs={24} sm={12} lg={6} key={index}>
                        <Card bordered={false} hoverable>
                            <Statistic 
                                title={<span style={{ color: '#8a8a8a' }}>{stat.title}</span>} 
                                value={stat.value} 
                                prefix={React.cloneElement(stat.icon, { style: { color: stat.color } })}
                            />
                        </Card>
                    </Col>
                ))}
            </Row>

            <Row gutter={[16, 16]} style={{ marginTop: '32px' }}>
                <Col xs={24} lg={16}>
                    <Card title="Branch-wise Pass Percentage" bordered={false}>
                        <div style={{ height: 350, width: '100%' }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={branchPerformance}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                    <XAxis dataKey="name" axisLine={false} tickLine={false} />
                                    <YAxis axisLine={false} tickLine={false} label={{ value: 'Pass Rate %', angle: -90, position: 'insideLeft' }} />
                                    <Tooltip cursor={{ fill: '#f5f0e8' }} />
                                    <Legend />
                                    <Bar dataKey="passRate" name="Pass Rate %" radius={[4, 4, 0, 0]} barSize={40}>
                                        {branchPerformance.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </Card>
                </Col>
                <Col xs={24} lg={8}>
                    <Card title={<Space><ThunderboltOutlined style={{ color: '#f1c40f' }} /> Actionable Insights</Space>} bordered={false} style={{ height: '100%' }}>
                        <Space direction="vertical" style={{ width: '100%' }}>
                            <div style={{ padding: '12px', background: '#fff1f0', borderRadius: '8px', borderLeft: '4px solid #f5222d' }}>
                                <Space align="start">
                                    <WarningOutlined style={{ color: '#cf1322', marginTop: '4px' }} />
                                    <div>
                                        <Text strong>EEE Intervention Needed</Text><br />
                                        <Text type="secondary" style={{ fontSize: '12px' }}>EEE has the lowest pass rate (50%). Recommend extra bridge classes for core subjects.</Text>
                                    </div>
                                </Space>
                            </div>

                            <div style={{ padding: '12px', background: '#f6ffed', borderRadius: '8px', borderLeft: '4px solid #52c41a' }}>
                                <Space align="start">
                                    <CheckCircleOutlined style={{ color: '#389e0d', marginTop: '4px' }} />
                                    <div>
                                        <Text strong>CSE Benchmark Achieved</Text><br />
                                        <Text type="secondary" style={{ fontSize: '12px' }}>CSE dominates with 71.4% pass rate. Their study patterns should be modeled for ECE/EEE.</Text>
                                    </div>
                                </Space>
                            </div>

                            <div style={{ padding: '12px', background: '#e6f7ff', borderRadius: '8px', borderLeft: '4px solid #1890ff' }}>
                                <Space align="start">
                                    <RiseOutlined style={{ color: '#096dd9', marginTop: '4px' }} />
                                    <div>
                                        <Text strong>Improvement Target</Text><br />
                                        <Text type="secondary" style={{ fontSize: '12px' }}>Overall pass rate is 63.6%. Targeting 75% for Sem-II requires 15% improvement in ECE & CSE-DS.</Text>
                                    </div>
                                </Space>
                            </div>

                            <Button 
                                block 
                                type="primary" 
                                size="large" 
                                style={{ marginTop: '16px', background: '#e84c30', borderColor: '#e84c30', fontWeight: 600, height: '48px' }}
                                onClick={handleDownloadPlan}
                            >
                                Download Semester Improvement Plan
                            </Button>
                        </Space>
                    </Card>
                </Col>
            </Row>

            <Row style={{ marginTop: '32px' }}>
                <Col span={24}>
                    <Card title="Branch-wise Detailed Breakdown" bordered={false}>
                        <Table 
                            columns={[
                                { title: 'Branch', dataKey: 'name', render: (t, r) => <Text strong>{r.name}</Text> },
                                { title: 'Total Strength', dataKey: 'strength', render: (t, r) => r.strength },
                                { title: 'Appeared', dataKey: 'appeared', render: (t, r) => r.appeared },
                                { title: 'Passed', dataKey: 'passed', render: (t, r) => r.passed },
                                { title: 'Pass %', dataKey: 'passRate', render: (t, r) => <Tag color={r.passRate >= 70 ? 'green' : r.passRate >= 60 ? 'blue' : 'volcano'}>{r.passRate}%</Tag> },
                            ]} 
                            dataSource={branchPerformance} 
                            pagination={false} 
                            size="middle" 
                        />
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default Dashboard;
