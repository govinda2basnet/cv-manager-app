import React, { useEffect, useState } from 'react';
import { Row, Col, Statistic, Card, Progress } from 'antd';
import { PieChart, Pie, Cell } from 'recharts';
import { BarChartOutlined, UsergroupAddOutlined } from '@ant-design/icons';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';


import axios from 'axios';

export const Dashboard = () => {
  const [applicantCount, setApplicantCount] = useState(0);
  const [interviewerCount, setInterviewerCount] = useState(0);
  const [interviewStatus, setInterviewStatus] = useState([]);
  const data = [
    { status: 'Shortlisted', count: 1 },
    { status: '1st Interview', count: 2 },
    { status: '2nd Interview', count: 1 },
    { status: 'Pending', count: 1 },
    { status: 'Hired', count: 3 },
  ];

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const applicantResponse = await axios.get('http://localhost:3000/applicant');
      const interviewerResponse = await axios.get('http://localhost:3000/interviewerlist');

      const applicants = applicantResponse.data;
      const interviewers = interviewerResponse.data;

      setApplicantCount(applicants.length);
      setInterviewerCount(interviewers.length);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 1.2;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text x={x} y={y} fill="#8884d8" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div style={{marginLeft:"50px"}}>
      <h1>Dashboard</h1>
      <Row gutter={[16, 16]}>
        <Col span={8}>
          <Card>
            <Statistic title="Total Applicants" value={applicantCount} prefix={<BarChartOutlined />} />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic title="Total Interviewers" value={interviewerCount} prefix={<UsergroupAddOutlined />} />
          </Card>
        </Col>
        <Col span={8  }>
          <Card >
            <h3>Progress</h3>
            <Progress type="circle" percent={50} />
          </Card>
        </Col>
      </Row>
      <Row  gutter={[16, 16]}>
        <Col span={8}>
        <Col span={16}>
          <Card>
            <UsergroupAddOutlined style={{ fontSize: 80, color: '#1890ff' }} />
            <div style={{ textAlign: 'center', marginTop: 10 }}>
              <h3>Total Interviews</h3>
              <h2>2</h2>
            </div>
          </Card>
        </Col>  
        </Col>
        <Col span={8}>
          <Card>
            <h1>Applicant Status</h1>
            <BarChart width={500} height={300} data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="status" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#8884d8" />
            </BarChart>
          </Card>
        </Col>
        
      </Row>
     
    </div>
  );
};


