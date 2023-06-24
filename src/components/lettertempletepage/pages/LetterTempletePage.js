import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, message } from 'antd';
import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const API_URL = 'http://localhost:3000/lettertemplate';

const LetterTemplatePage = () => {
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  const [viewModalVisible, setViewModalVisible] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [confirmDeleteVisible, setConfirmDeleteVisible] = useState(false);
  const [deletingTemplate, setDeletingTemplate] = useState(null);

  useEffect(() => {
    fetchTemplates();
  }, []);

  const fetchTemplates = async () => {
    setLoading(true);
    try {
      const response = await axios.get(API_URL);
      setTemplates(response.data);
    } catch (error) {
      console.error('Error fetching templates:', error);
    } finally {
      setLoading(false);
    }
  };

  const createTemplate = async (values) => {
    try {
      await axios.post(API_URL, values);
      message.success('Template created successfully.');
      hideModal();
      fetchTemplates();
    } catch (error) {
      console.error('Error creating template:', error);
    }
  };

  const updateTemplate = async (id, values) => {
    try {
      await axios.put(`${API_URL}/${id}`, values);
      message.success('Template updated successfully.');
      hideModal();
      fetchTemplates();
    } catch (error) {
      console.error('Error updating template:', error);
    }
  };

  const deleteTemplate = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      message.success('Template deleted successfully.');
      fetchTemplates();
    } catch (error) {
      console.error('Error deleting template:', error);
    }
  };

  const showModal = () => {
    setVisible(true);
  };

  const hideModal = () => {
    setVisible(false);
    form.resetFields();
  };

  const showViewModal = () => {
    setViewModalVisible(true);
  };

  const hideViewModal = () => {
    setViewModalVisible(false);
  };

  const showConfirmDeleteModal = (template) => {
    setConfirmDeleteVisible(true);
    setDeletingTemplate(template);
  };

  const hideConfirmDeleteModal = () => {
    setConfirmDeleteVisible(false);
    setDeletingTemplate(null);
  };

  const onFinish = (values) => {
    const { id } = values;

    if (id) {
      updateTemplate(id, values);
    } else {
      createTemplate(values);
    }
  };

  const deleteTemplateConfirmed = () => {
    const { id } = deletingTemplate;
    deleteTemplate(id);
    hideConfirmDeleteModal();
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Template',
      dataIndex: 'template',
      key: 'template',
      render: (text, record) => (
        <a href="#" onClick={() => viewTemplate(record)}>
          View Template
        </a>
      ),
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      key: 'actions',
      render: (text, record) => (
        <div>
          <Button style={{margin:"10px"}} type="primary" onClick={() => editTemplate(record)}>
            Edit
          </Button>
          <Button type="primary" danger onClick={() => showConfirmDeleteModal(record)}>
            Delete
          </Button>
        </div>
      ),
    },
  ];

  const viewTemplate = (record) => {
    setSelectedTemplate(record);
    showViewModal();
  };

  const editTemplate = (record) => {
    showModal();
    form.setFieldsValue(record);
  };

  const renderLetter = () => {
    return (
      <div>
        <h2>{selectedTemplate.name}</h2>
        <div>{selectedTemplate.template.subject}</div>
        <div
          dangerouslySetInnerHTML={{
            __html: selectedTemplate.template.body,
          }}
        />
      </div>
    );
  };

  return (
    <div>
        <h1>Letter Templete</h1>
      <Button style={{margin:"25px",backgroundColor:"green"}} type="primary" onClick={showModal}>
        Create
      </Button>

      <Table
        dataSource={templates}
        columns={columns}
        loading={loading}
        rowKey="id"
      />

      <Modal
        title="Create Template"
        open={visible}
        onCancel={hideModal}
        footer={null}
      >
        <Form form={form} onFinish={onFinish}>
          <Form.Item name="id" hidden>
            <Input />
          </Form.Item>
          <Form.Item
            name={['name']}
            label="Name"
            rules={[{ required: true, message: 'Please enter the template name.' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={['template', 'subject']}
            label="Subject"
            rules={[{ required: true, message: 'Please enter the subject.' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={['template', 'body']}
            label="Body"
            rules={[{ required: true, message: 'Please enter the body.' }]}
          >
            <ReactQuill />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Save Template
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Letter Template"
        open={viewModalVisible}
        onCancel={hideViewModal}
        footer={null}
      >
        {selectedTemplate && renderLetter()}
      </Modal>

      <Modal
        title="Confirm Delete"
        open={confirmDeleteVisible}
        onCancel={hideConfirmDeleteModal}
        onOk={deleteTemplateConfirmed}
        okText="Delete"
        cancelText="Cancel"
      >
        Are you sure you want to delete the template?
      </Modal>
    </div>
  );
};

export default LetterTemplatePage;
