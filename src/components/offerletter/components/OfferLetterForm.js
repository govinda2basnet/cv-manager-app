import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Select } from 'antd';

const { Option } = Select;

const OfferLetterForm = ({ onSubmit, initialData, isUpdate }) => {
    const [form] = Form.useForm();
    const [status, setStatus] = useState('');
  
    useEffect(() => {
      if (initialData) {
        form.setFieldsValue(initialData);
        setStatus(initialData.status);
      }
    }, [form, initialData]);
  
    const handleStatusChange = (value) => {
      setStatus(value);
      if (value === 'rejected') {
        form.setFieldsValue({ remarks: '' });
      }
    };
  
    const onFinish = (values) => {
      onSubmit(values);
      form.resetFields();
    };
  
    return (
      <Form form={form} onFinish={onFinish} layout="vertical">
        <Form.Item name="id" label="ID" rules={[{ required: true, message: 'Please enter the ID' }]}>
          <Input disabled={isUpdate} />
        </Form.Item>
        <Form.Item
          name="name"
          label="Name"
          rules={[{ required: true, message: 'Please enter the name' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="status" label="Status" rules={[{ required: true, message: 'Please select the status' }]}>
          <Select onChange={handleStatusChange}>
            <Option value="accepted">Accepted</Option>
            <Option value="rejected">Rejected</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="letterFile"
          label="Letter File"
          rules={[{ required: true, message: 'Please enter the letter file' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="remarks"
          label="Remarks"
          rules={[
            { required: status === 'rejected', message: 'Please enter remarks if status is rejected' },
          ]}
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            {isUpdate ? 'Update' : 'Create'}
          </Button>
        </Form.Item>
      </Form>
    );
  };
  
  export default OfferLetterForm;