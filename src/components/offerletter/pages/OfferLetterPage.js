import React, { useState, useEffect } from 'react';
import { Table, Form, Input, Button, Select, message, Modal } from 'antd';
import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const { Option } = Select;

const OfferLetterPage = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editId, setEditId] = useState(null);
  const [expandedLetter, setExpandedLetter] = useState('');
  const [applicants, setApplicants] = useState([]);
  const [editorState, setEditorState] = useState('');

  useEffect(() => {
    fetchOfferLetters();
    fetchApplicants();
  }, []);

  const fetchOfferLetters = async () => {
    try {
      const response = await axios.get('http://localhost:3000/offerletters');
      setData(response.data);
    } catch (error) {
      console.error('Error fetching offer letters:', error);
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

  const createOfferLetter = async (values) => {
    try {
      const response = await axios.post('http://localhost:3000/offerletters', {
        ...values,
        file: editorState,
      });
      setData((prevData) => [...prevData, response.data]);
      message.success('Offer letter created successfully');
      setModalVisible(false);
    } catch (error) {
      console.error('Error creating offer letter:', error);
    }
  };

  const updateOfferLetter = async (values) => {
    try {
      const response = await axios.put(`http://localhost:3000/offerletters/${editId}`, {
        ...values,
        file: editorState,
      });
      setData((prevData) => {
        const newData = [...prevData];
        const editedItemIndex = newData.findIndex((item) => item.id === editId);
        newData[editedItemIndex] = response.data;
        return newData;
      });
      setEditId(null);
      message.success('Offer letter updated successfully');
      setModalVisible(false);
    } catch (error) {
      console.error('Error updating offer letter:', error);
    }
  };

  const deleteOfferLetter = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/offerletters/${id}`);
      setData((prevData) => prevData.filter((item) => item.id !== id));
      message.success('Offer letter deleted successfully');
    } catch (error) {
      console.error('Error deleting offer letter:', error);
    }
  };

  const handleCreate = () => {
    form.validateFields().then((values) => {
      if (editId !== null) {
        updateOfferLetter(values);
      } else {
        createOfferLetter(values);
      }
      form.resetFields();
      setEditorState('');
    });
  };

  const handleEdit = (record) => {
    setEditId(record.id);
    form.setFieldsValue({
      id: record.id,
      name: record.name,
      status: record.status,
      remarks: record.remarks,
    });
    setEditorState(record.file);
    setModalVisible(true);
  };

  const handleDelete = (record) => {
    Modal.confirm({
      title: 'Delete Offer Letter',
      content: 'Are you sure you want to delete this offer letter?',
      onOk: () => deleteOfferLetter(record.id),
    });
  };

  const columns = [
    {
      title: 'Applicant Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Letter File',
      dataIndex: 'file',
      key: 'file',
      render: (_, record) => (
        <>
          {record.file.length > 200 ? (
            <>
              {expandedLetter === record.id ? (
                <Modal
                  open={true}
                  footer={null}
                  onCancel={() => setExpandedLetter('')}
                >
                  <p>{record.file}</p>
                </Modal>
              ) : (
                <Button type="link" onClick={() => setExpandedLetter(record.id)}>
                  View Full
                </Button>
              )}
            </>
          ) : (
            record.file
          )}
        </>
      ),
    },
    {
      title: 'Remarks',
      dataIndex: 'remarks',
      key: 'remarks',
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      key: 'actions',
      render: (_, record) => (
        <>
          <Button type="primary" onClick={() => handleEdit(record)}>
            Edit
          </Button>
          <Button style={{ marginLeft: '10px' }} type="primary" danger onClick={() => handleDelete(record)}>
            Delete
          </Button>
        </>
      ),
    },
  ];

  return (
    <div style={{ margin: '50px' }}>
      <h1>Offer Letter</h1>
      <Button style={{ marginBottom: '20px' }} type="primary" onClick={() => setModalVisible(true)}>
        Create Offer Letter
      </Button>
      <Table dataSource={data} columns={columns} />

      <Modal
        title={editId !== null ? 'Edit Offer Letter' : 'Create Offer Letter'}
        open={modalVisible}
        onOk={handleCreate}
        onCancel={() => {
          setModalVisible(false);
          form.resetFields();
          setEditorState('');
        }}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="name" label="Applicant Name" rules={[{ required: true }]}>
            <Select showSearch placeholder="Select an applicant">
              {applicants.map((applicant) => (
                <Option key={applicant.id} value={applicant.fullname}>
                  {applicant.fullname}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="status" label="Status" rules={[{ required: true }]}>
            <Select>
              <Option value="Shortlisted">Shortlisted</Option>
              <Option value="1st interview">1st Interview</Option>
              <Option value="2nd interview">2nd Interview</Option>
              <Option value="pending">Pending</Option>
              <Option value="hired">Hired</Option>
            </Select>
          </Form.Item>
          <Form.Item name="file" label="Letter File" rules={[{ required: true }]}>
            <ReactQuill value={editorState} onChange={setEditorState} />
          </Form.Item>
          
            <Form.Item name="remarks" label="Remarks" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
        
        </Form>
      </Modal>
    </div>
  );
};

export default OfferLetterPage;
