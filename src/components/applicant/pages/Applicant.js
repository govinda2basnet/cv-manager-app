import React, { useState, useEffect } from 'react';
import { Button, Modal, Input, Table, Space, Form, Select, Steps, Card } from 'antd';
import { Upload, message } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import axios from 'axios';

const { Step } = Steps;
const { Option } = Select;

export default function Applicant() {
  const [applicants, setApplicants] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingApplicant, setEditingApplicant] = useState(null);
  const [search, setSearch] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [newApplicant, setNewApplicant] = useState({
    fullname: '',
    phonenumber: '',
    email: '',
    level: '',
    references: '',
    technology: [],
    status: '',
    experience: '',
    expectedsalary: '',
    resume: '',
  });

  useEffect(() => {
    axios
      .get('http://localhost:3000/applicant')
      .then((response) => {
        setApplicants(response.data);
      })
      .catch((error) => {
        console.error('Error fetching applicants:', error);
      });
  }, []);

  const onViewApplicant = (record) => {
    Modal.info({
      title: 'Applicant Details',
      className: 'custom-modal',
  content: (
    <div>
      <p>
        <strong>ID:</strong> {record.id}
      </p>
      <p>
        <strong>Name:</strong> {record.fullname}
      </p>
      <p>
        <strong>Phone Number:</strong> {record.phonenumber}
      </p>
      <p>
        <strong>Email:</strong> {record.email}
      </p>
      <p>
        <strong>Level:</strong> {record.level}
      </p>
      <p>
        <strong>References:</strong> {record.references}
      </p>
      <p>
        <strong>Technology:</strong> <strong>Technology:</strong> {Array.isArray(record.technology) ? record.technology.join(', ') : ''}
      </p>
      <p>
        <strong>Status:</strong> {record.status}
      </p>
      <p>
        <strong>Experience:</strong> {record.experience}
      </p>
      <p>
        <strong>Expected Salary:</strong> {record.expectedsalary}
      </p>
      <div>
      <Steps current={getStepByStatus(record.status)} style={{ marginTop: '20px' }}>
          <Step title="Shortlisted" />
          <Step title="1st Interview" />
          <Step title="2nd Interview" />
          <Step title="Pending" />
          <Step title="Hired" />
        </Steps>
      </div>
      <div style={{ marginTop: '20px' }}>
        <Upload
          fileList={[
            {
              uid: '1',
              name: 'Resume.pdf',
              status: 'done',
              url: record.resume,
            },
          ]}
          showUploadList={{
            showDownloadIcon: true,
            downloadIcon: 'download ',
            downloadTooltipTitle: 'Download Resume',
          }}
        >
          <Button icon={<InboxOutlined />}>Upload/Download Resume</Button>
        </Upload>
      </div>
    </div>
  )
    });
  };

  const onDeleteApplicant = (record) => {
    axios
      .delete(`http://localhost:3000/applicant/${record.id}`)
      .then(() => {
        message.success('Applicant deleted successfully');
        setApplicants(applicants.filter((applicant) => applicant.id !== record.id));
      })
      .catch((error) => {
        console.error('Error deleting applicant:', error);
        message.error('Failed to delete applicant');
      });
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleEdit = (record) => {
    setIsEditing(true);
    setEditingApplicant(record);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditingApplicant(null);
  };

  const handleSave = () => {
    setIsEditing(false);
    axios
      .put(`http://localhost:3000/applicant/${editingApplicant.id}`, editingApplicant)
      .then(() => {
        message.success('Applicant updated successfully');
        setApplicants(
          applicants.map((applicant) =>
            applicant.id === editingApplicant.id ? editingApplicant : applicant
          )
        );
      })
      .catch((error) => {
        console.error('Error updating applicant:', error);
        message.error('Failed to update applicant');
      });
  };

  const handleCreate = () => {
    setIsCreating(false);
    axios
      .post('http://localhost:3000/applicant', newApplicant)
      .then((response) => {
        message.success('Applicant created successfully');
        setApplicants([...applicants, response.data]);
        setNewApplicant({
          fullname: '',
          phonenumber: '',
          email: '',
          level: '',
          references: '',
          technology: [],
          status: '',
          experience: '',
          expectedsalary: '',
          resume: '',
        });
      })
      .catch((error) => {
        console.error('Error creating applicant:', error);
        message.error('Failed to create applicant');
      });
  };

  const handleCancelCreate = () => {
    setIsCreating(false);
    setNewApplicant({
      fullname: '',
      phonenumber: '',
      email: '',
      level: '',
      references: '',
      technology: [],
      status: '',
      experience: '',
      expectedsalary: '',
      resume: '',
    });
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'fullname',
      key: 'fullname',
      render: (text, record) => (
        <Button type="link" onClick={() => onViewApplicant(record)}>
          {text}
        </Button>
      ),
    },
    {
      title: 'Phone Number',
      dataIndex: 'phonenumber',
      key: 'phonenumber',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      filters: [
        { text: 'Shortlisted', value: 'Shortlisted' },
        { text: '1st Interview', value: '1st Interview' },
        { text: '2nd Interview', value: '2nd Interview' },
        { text: 'Pending', value: 'Pending' },
        { text: 'Hired', value: 'Hired' },
      ],
      onFilter: (value, record) => record.status === value,
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        
        <Space size="middle">
          <Button type="primary" onClick={() => onViewApplicant(record)}>
            View
          </Button>
          <Button type="primary" onClick={() => handleEdit(record)}>
            Edit
          </Button>
          <Button type="primary" danger onClick={() => onDeleteApplicant(record)}>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  const filteredApplicants = applicants.filter((applicant) =>
    applicant.fullname.toLowerCase().includes(search.toLowerCase())
  );

  const getStepByStatus = (status) => {
    switch (status) {
      case 'Shortlisted':
        return 0;
      case '1st Interview':
        return 1;
      case '2nd Interview':
        return 2;
      case 'Pending':
        return 3;
      case 'Hired':
        return 4;
      default:
        return 0;
    }
  };

  return (
    <div>
      <Card title="Applicant Management" style={{ marginBottom: '20px' }}>
        <Button type="primary" onClick={() => setIsCreating(true)}>
          Create New Applicant
        </Button>
        <Input
          placeholder="Search by Name"
          style={{ width: '200px', marginLeft: '20px' }}
          value={search}
          onChange={handleSearchChange}
        />
      </Card>
      <Table dataSource={filteredApplicants} columns={columns} rowKey="id" />

      <Modal
        title={isCreating ? 'Create New Applicant' : 'Edit Applicant'}
        open={isCreating || isEditing}
        onOk={isCreating ? handleCreate : handleSave}
        onCancel={isCreating ? handleCancelCreate : handleCancelEdit}
      >
        <Form labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
          <Form.Item label="Name">
            <Input
              value={isCreating ? newApplicant.fullname : editingApplicant?.fullname}
              onChange={(e) =>
                isCreating
                  ? setNewApplicant({ ...newApplicant, fullname: e.target.value })
                  : setEditingApplicant({ ...editingApplicant, fullname: e.target.value })
              }
            />
          </Form.Item>
          <Form.Item label="Phone Number">
            <Input
              value={isCreating ? newApplicant.phonenumber : editingApplicant?.phonenumber}
              onChange={(e) =>
                isCreating
                  ? setNewApplicant({ ...newApplicant, phonenumber: e.target.value })
                  : setEditingApplicant({ ...editingApplicant, phonenumber: e.target.value })
              }
            />
          </Form.Item>
          <Form.Item label="Email">
            <Input
              value={isCreating ? newApplicant.email : editingApplicant?.email}
              onChange={(e) =>
                isCreating
                  ? setNewApplicant({ ...newApplicant, email: e.target.value })
                  : setEditingApplicant({ ...editingApplicant, email: e.target.value })
              }
            />
          </Form.Item>
          <Form.Item label="Level">
            <Input
              value={isCreating ? newApplicant.level : editingApplicant?.level}
              onChange={(e) =>
                isCreating
                  ? setNewApplicant({ ...newApplicant, level: e.target.value })
                  : setEditingApplicant({ ...editingApplicant, level: e.target.value })
              }
            />
          </Form.Item>
          <Form.Item label="References">
            <Input.TextArea
              value={isCreating ? newApplicant.references : editingApplicant?.references}
              onChange={(e) =>
                isCreating
                  ? setNewApplicant({ ...newApplicant, references: e.target.value })
                  : setEditingApplicant({ ...editingApplicant, references: e.target.value })
              }
            />
          </Form.Item>
          <Form.Item label="Technology">
            <Select
              mode="multiple"
              placeholder="Select technologies"
              value={isCreating ? newApplicant.technology : editingApplicant?.technology}
              onChange={(value) =>
                isCreating
                  ? setNewApplicant({ ...newApplicant, technology: value })
                  : setEditingApplicant({ ...editingApplicant, technology: value })
              }
            >
              <Option value="Java">Java</Option>
              <Option value="JavaScript">JavaScript</Option>
              <Option value="Python">Python</Option>
              <Option value="C#">C#</Option>
              <Option value="Ruby">Ruby</Option>
            </Select>
          </Form.Item>
          <Form.Item label="Status">
            <Input
              value={isCreating ? newApplicant.status : editingApplicant?.status}
              onChange={(e) =>
                isCreating
                  ? setNewApplicant({ ...newApplicant, status: e.target.value })
                  : setEditingApplicant({ ...editingApplicant, status: e.target.value })
              }
            />
          </Form.Item>
          <Form.Item label="Experience">
            <Input
              value={isCreating ? newApplicant.experience : editingApplicant?.experience}
              onChange={(e) =>
                isCreating
                  ? setNewApplicant({ ...newApplicant, experience: e.target.value })
                  : setEditingApplicant({ ...editingApplicant, experience: e.target.value })
              }
            />
          </Form.Item>
          <Form.Item label="Expected Salary">
            <Input
              value={isCreating ? newApplicant.expectedsalary : editingApplicant?.expectedsalary}
              onChange={(e) =>
                isCreating
                  ? setNewApplicant({ ...newApplicant, expectedsalary: e.target.value })
                  : setEditingApplicant({ ...editingApplicant, expectedsalary: e.target.value })
              }
            />
          </Form.Item>
          <Form.Item label="Resume">
            <Upload
              name="resume"
              accept=".pdf"
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              fileList={isCreating ? [] : editingApplicant?.resume ? [{ uid: '1', name: 'Resume.pdf', status: 'done' }] : []}
              onChange={(info) => {
                const { status } = info.file;
                if (status === 'done') {
                  message.success(`${info.file.name} file uploaded successfully.`);
                  const resumeURL = info.file.response.url;
                  if (isCreating) {
                    setNewApplicant({ ...newApplicant, resume: resumeURL });
                  } else {
                    setEditingApplicant({ ...editingApplicant, resume: resumeURL });
                  }
                } else if (status === 'error') {
                  message.error(`${info.file.name} file upload failed.`);
                }
              }}
            >
              <Button icon={<InboxOutlined />}>{isCreating ? 'Upload' : 'Change'} Resume</Button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
