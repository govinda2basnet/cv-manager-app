import React, { useState, useEffect } from 'react';
import { Button, Card, Form, Input, Select, Upload, Table, Space, Modal } from 'antd';
import { UploadOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import axios from 'axios';

const { confirm } = Modal;
const { Option } = Select;

const AssessmentTest = () => {
  const [form] = Form.useForm();
  const [showForm, setShowForm] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [assignments, setAssignments] = useState([]);
  const [applicants, setApplicants] = useState([]);

  useEffect(() => {
    fetchAssignments();
    fetchApplicants();
  }, []);

  const fetchAssignments = async () => {
    try {
      const response = await axios.get('http://localhost:3000/assessment');
      setAssignments(response.data);
    } catch (error) {
      console.error('Error fetching assignments:', error);
    }
  };

  const fetchApplicants = async () => {
    try {
      const response = await axios.get('http://localhost:3000/applicant');
      setApplicants(response.data);
    } catch (error) {
      console.error('Error fetching applicants:', error);
    }
  };

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
  
    if (e && e.fileList) {
      return e.fileList.map((file) => file.originFileObj);
    }
  
    return [];
  };
  

  const showUpdateForm = (assignment) => {
    form.setFieldsValue(assignment);
    setSelectedAssignment(assignment);
    setShowForm(true);
  };

  const handleAddAssignment = async (values) => {
    try {
      const response = await axios.post('http://localhost:3000/assessment', values);
      setAssignments([...assignments, response.data]);
      form.resetFields();
      setShowForm(false);
    } catch (error) {
      console.error('Error adding assignment:', error);
    }
  };

  const handleUpdateAssignment = async (values) => {
    try {
      const response = await axios.put(`http://localhost:3000/assessment/${selectedAssignment.id}`, values);
      const updatedAssignments = assignments.map((assignment) => {
        if (assignment.id === response.data.id) {
          return response.data;
        }
        return assignment;
      });
      setAssignments(updatedAssignments);
      form.resetFields();
      setShowForm(false);
      setSelectedAssignment(null);
    } catch (error) {
      console.error('Error updating assignment:', error);
    }
  };

  const handleDeleteAssignment = (id) => {
    confirm({
      title: 'Are you sure you want to delete this assignment?',
      icon: <ExclamationCircleOutlined />,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        deleteAssignment(id);
      },
      onCancel() {
        console.log('Delete cancelled');
      },
    });
  };

  const deleteAssignment = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/assessment/${id}`);
      const updatedAssignments = assignments.filter((assignment) => assignment.id !== id);
      setAssignments(updatedAssignments);
    } catch (error) {
      console.error('Error deleting assignment:', error);
    }
  };

  const renderForm = () => (
    <Modal
      open={showForm}
      title={selectedAssignment ? 'Update Assessment' : 'Add Assessment'}
      onCancel={() => setShowForm(false)}
      footer={[
        <Button key="cancel" onClick={() => setShowForm(false)}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" htmlType="submit" form="assessmentForm">
          {selectedAssignment ? 'Update' : 'Add'}
        </Button>,
      ]}
    >
      <Form
        id="assessmentForm"
        form={form}
        name="assessmentForm"
        onFinish={selectedAssignment ? handleUpdateAssignment : handleAddAssignment}
        initialValues={selectedAssignment}
      >
        <Form.Item name="applicantName" label="Applicant Name" rules={[{ required: true }]}>
          <Select placeholder="Select applicant">
            {applicants.map((applicant) => (
              <Option key={applicant.id} value={applicant.fullname}>
                {applicant.fullname}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name="title" label="Title" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="evaluation" label="Evaluation" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="assessmentDocument" label="Assessment Document">
          <Upload
            name="assessmentDocument"
            multiple={false}
            beforeUpload={() => false}
            fileList={form.getFieldValue('assessmentDocument')}
            onChange={(info) => {
              const fileList = info.fileList.slice(-1); // Limit to a single file
              form.setFieldsValue({ assessmentDocument: fileList });
            }}
          >
            <Button icon={<UploadOutlined />} disabled={selectedAssignment}>
              Upload
            </Button>
          </Upload>
        </Form.Item>
        <Form.Item name="applicantFile" label="Applicant File">
          <Upload
            name="applicantFile"
            multiple={false}
            beforeUpload={() => false}
            fileList={form.getFieldValue('applicantFile')}
            onChange={(info) => {
              const fileList = info.fileList.slice(-1); 
              form.setFieldsValue({ applicantFile: fileList });
            }}
          >
            <Button icon={<UploadOutlined />} disabled={selectedAssignment}>
              Upload
            </Button>
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  );

  const columns = [
    { title: 'Applicant Name', dataIndex: 'applicantName', key: 'applicantName' },
    { title: 'Title', dataIndex: 'title', key: 'title' },
    { title: 'Evaluation', dataIndex: 'evaluation', key: 'evaluation' },
    { title: 'Assessment Document', dataIndex: 'assessmentDocument', key: 'assessmentDocument', render: (text) => text.name },
    { title: 'Applicant File', dataIndex: 'applicantFile', key: 'applicantFile', render: (text) => text.name },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      render: (_, assignment) => (
        <Space size="middle">
          <Button type="primary" onClick={() => showUpdateForm(assignment)}>
            Update
          </Button>
          <Button type="danger" onClick={() => handleDeleteAssignment(assignment.id)}>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ margin: '50px' }}>
      <h1>Assignment Test</h1>
      <Button  type="primary" onClick={() => setShowForm(true)} style={{ marginBottom: 16, backgroundColor:"green" }}>
        Add Assessment
      </Button>
      <Table columns={columns} dataSource={assignments} rowKey="id" />
      {showForm && renderForm()}
    </div>
  );
};

export default AssessmentTest;
