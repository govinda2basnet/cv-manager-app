import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Space,Form,Input,Card } from 'antd';
import { EyeOutlined, EditOutlined, DeleteOutlined ,PlusOutlined} from '@ant-design/icons';

export default function ExperienceList({props}){
  const [modalVisible, setModalVisible] = useState(false);
  const [data, setData] = useState([]);
  const [selectedData, setSelectedData] = useState({});
  const [experienceForm] = Form.useForm();
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
          <Button type="primary" icon={<PlusOutlined />} onClick={() => setModalVisible(true)}>
            Add Experience
          </Button>
          <Button icon={<EyeOutlined />} onClick={() => handleView(record)}>
            View
          </Button>
          <Button icon={<EditOutlined />} onClick={() => handleEdit(record)}>
            Edit
          </Button>
          <Button icon={<DeleteOutlined />} onClick={() => handleDelete(record)}>
            Delete
          </Button>
        </Space>
      ),
    },
  ];
  const handleView = (record) => {
    setSelectedData(record);
    setModalVisible(true);
  };

  const handleEdit = (record) => {
    setSelectedData(record);
    setModalVisible(false);
  };
  const handleDelete = (record) => {
    
    const updatedData = dataSource.filter((item) => item.id !== record.id);
    setData(updatedData);
  };
  
  const handleCancel = () => {
    setModalVisible(false);
  };
  
  const handleCreateExperience = () => {
    experienceForm.validateFields().then((values) => {
      const newExperience = {
        companyName: values.companyName,
        position: values.position,
        startDate: values.startDate,
        endDate: values.endDate,
        responsibilities: values.responsibilities,
        certificates: values.certificates,
      };
      setSelectedData((prevData) => ({
        ...prevData,
        experiences: [...(prevData.experiences || []), newExperience],
      }));

      experienceForm.resetFields();
      setModalVisible(false);
    });
  };
  // useEffect(() => {
  //   setData(props);
  // }, []);
  
  return ( 
    <>
      <h2 style={{textAlign:"center"}}>Experiences</h2>
      
      <Table style={{margin:'50px 50px 50px 50px'}} dataSource={dataSource} columns={columns} />
      
      <Modal
        title="View Applicant"
        open={modalVisible }
        onCancel={handleCancel}
        
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
                <p>Technology: {selectedData.technology}</p>
                <p>Expected Salary: {selectedData.expectedSalary}</p>
                <p>Level: {selectedData.level}</p>
                <p>References: {selectedData.references}</p>
                <p>Status: {selectedData.status}</p>
                <p>Resume: {selectedData.resume}</p>
                </div>
            ))}
        </Card>
      </Modal>
      <Modal
        title="Create Experience"
        open={modalVisible }
        onCancel={handleCancel}
        onOk={handleCreateExperience}
      >
        <Form form={experienceForm} layout="vertical">
          <Form.Item
            name="companyName"
            label="Company Name"
            rules={[{ required: true, message: 'Please enter the company name' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="position"
            label="Position"
            rules={[{ required: true, message: 'Please enter the position' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="startDate"
            label="Start Date"
            rules={[{ required: true, message: 'Please enter the start date' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="endDate"
            label="End Date"
            rules={[{ required: true, message: 'Please enter the end date' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="responsibilities"
            label="Responsibilities"
            rules={[{ required: true, message: 'Please enter the responsibilities' }]}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item
            name="certificates"
            label="Certificates"
            rules={[{ required: true, message: 'Please enter the certificates' }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}