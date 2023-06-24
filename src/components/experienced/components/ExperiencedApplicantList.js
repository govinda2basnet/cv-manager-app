import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Space,Form,Input,Card } from 'antd';
import { EyeOutlined } from '@ant-design/icons';

export default function ExperiencedApplicantList({props}){
  const [modalVisible, setModalVisible] = useState(false);
  const [data, setData] = useState([]);
  const [selectedData, setSelectedData] = useState({});
  const [form] = Form.useForm();

  console.log(props,'data')

  const dataSource = props

  
  
  const columns = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'name',
    },
    {
      title: 'Full Name',
      dataIndex: 'fullName',
      key: '',
    },
    {
      title: 'PhoneNumber',
      dataIndex: 'phoneNumber',
      key: '',
    },
    
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <Space size="middle">
          <Button icon={<EyeOutlined />} onClick={() => handleView(record)}>
            View
          </Button>
        </Space>
      ),
    },
  ];
  const handleView = (record) => {
    setSelectedData(record);
    setModalVisible(true);
  };
  const handleCancel = () => {
    setModalVisible(false);
  };
  
    
 
  return ( 
    <>
      <h2 style={{textAlign:"center"}}>Applicant with Experiences</h2>
      
      <Table style={{margin:'50px 50px 50px 50px'}} dataSource={dataSource} columns={columns} />
      
        
      <Modal
        title="View Applicant"
        open={modalVisible }
        onCancel={handleCancel}
        footer={null}
      >
        <Card title={selectedData.fullName}>
          <p>Phone Number: {selectedData.phoneNumber}</p>
          <p>Email: {selectedData.email}</p>
          <p>Experiences:</p>
          {selectedData.experiences &&
            selectedData.experiences.map((experience, index) => (
              <div key={index} style={{ border: '1px solid black', padding: '1rem', borderRadius: '1rem', backgroundColor: 'rgb(228, 242, 249)', marginTop: '1rem' }}>
                <div>Company Name: {experience.companyName}</div>
                <div>Position: {experience.position}</div>
                <div>Start Date: {experience.startDate}</div>
                <div>End Date: {experience.endDate}</div>
                <div>Responsibilities: {experience.responsibilities}</div>
                <div>Certificates: {experience.certificates}</div>
              </div>
            ))}
            <p>Technology: {selectedData.technology}</p>
            <p>Expected Salary: {selectedData.expectedSalary}</p>
            <p>Level: {selectedData.level}</p>
            <p>References: {selectedData.references}</p>
            <p>Status: {selectedData.status}</p>
            <p>Resume: {selectedData.resume}</p>
            
        </Card>
      </Modal>
    </>
  )
}