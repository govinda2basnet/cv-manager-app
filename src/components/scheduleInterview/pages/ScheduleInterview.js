import React, { useState, useEffect } from 'react';
import { Button, Table, Modal, Input, DatePicker, TimePicker, Select } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import moment from 'moment';
import axios from 'axios';

export const ScheduleInterview = () => {
  const [interviews, setInterviews] = useState([]);
  const [applicants, setApplicants] = useState([]);
  const [interviewers, setInterviewers] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingInterview, setEditingInterview] = useState(null);
  const [formData, setFormData] = useState({
    applicantName: '',
    interviewerName: '',
    scheduledDate: '',
    scheduledTime: '',
  });
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const interviewsResponse = await axios.get('http://localhost:3000/interview');
      const applicantsResponse = await axios.get('http://localhost:3000/applicant');
      const interviewersResponse = await axios.get('http://localhost:3000/interviewerlist');

      setInterviews(interviewsResponse.data);
      setApplicants(applicantsResponse.data);
      setInterviewers(interviewersResponse.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const createInterview = async () => {
    try {
      const response = await axios.post('http://localhost:3000/interview', {
        applicantName: formData.applicantName,
        interviewerName: formData.interviewerName,
        scheduledDate: formData.scheduledDate,
        scheduledTime: formData.scheduledTime
      });
      setInterviews([...interviews, response.data]);
      setFormData({ applicantName: '', interviewerName: '', scheduledDate: '', scheduledTime: '' });
      setIsEditing(false);
    } catch (error) {
      console.error('Error creating interview:', error);
    }
  };

  const updateInterview = async () => {
    try {
      await axios.put(`http://localhost:3000/interview/${editingInterview.id}`, {
        applicantName: formData.applicantName,
        interviewerName: formData.interviewerName,
        scheduledDate: formData.scheduledDate,
        scheduledTime: formData.scheduledTime
      });
      const updatedInterviews = interviews.map((interview) =>
        interview.id === editingInterview.id ? { ...interview, ...formData } : interview
      );
      setInterviews(updatedInterviews);
      setFormData({ applicantName: '', interviewerName: '', scheduledDate: '', scheduledTime: '' });
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating interview:', error);
    }
  };

  const deleteInterview = async () => {
    try {
      await axios.delete(`http://localhost:3000/interview/${editingInterview.id}`);
      setInterviews(interviews.filter((interview) => interview.id !== editingInterview.id));
      setFormData({});
      setIsEditing(false);
    } catch (error) {
      console.error('Error deleting interview:', error);
    }
  };

  const onSaveInterview = () => {
    if (
      formData.applicantid &&
      formData.interviewerid &&
      formData.scheduledDate &&
      formData.scheduledTime
    ) {
      if (isEditing) {
        updateInterview();
      } else {
        createInterview();
      }
    }
  };

  const onCancelEdit = () => {
    setIsEditing(false);
    setEditingInterview(null);
    setFormData({});
  };

  const onEditInterview = (record) => {
    setIsEditing(true);
    setEditingInterview(record);
    setFormData({ ...record });
  };

  const onDeleteInterview = (record) => {
    Modal.confirm({
      title: 'Are you sure you want to delete the interview?',
      okText: 'Yes',
      okType: 'danger',
      onOk: deleteInterview,
    });
  };

  const onSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const filteredInterviews = interviews.filter((interview) =>
    interview.applicantName.toLowerCase().includes(search.toLowerCase())
  );

  const columns = [
    {
      title: 'Applicant Name',
      dataIndex: 'applicantName',
      key: 'applicantName',
    },
    {
      title: 'Interviewer Name',
      dataIndex: 'interviewerName',
      key: 'interviewerName',
    },
    {
      title: 'Scheduled Date',
      dataIndex: 'scheduledDate',
      key: 'scheduledDate',
      render: (date) => moment(date).format('YYYY-MM-DD'),
    },
    {
      title: 'Scheduled Time',
      dataIndex: 'scheduledTime',
      key: 'scheduledTime',
      render: (time) => moment(time, 'HH:mm:ss').format('h:mm A'),
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      render: (_, record) => (
        <>
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => onEditInterview(record)}
            style={{ marginRight: 8 }}
          >
            Edit
          </Button>
          <Button type="danger" icon={<DeleteOutlined />} onClick={() => onDeleteInterview(record)}>
            Delete
          </Button>
        </>
      ),
    },
  ];

  const openCreateModal = () => {
    setIsEditing(true);
    setEditingInterview(null);
    setFormData({
      applicantName: '',
      interviewerName: '',
      scheduledDate: '',
      scheduledTime: '',
    });
  };

  return (
    <div>
      <h1>Schedule Interview</h1>
      <div style={{ marginBottom: 16 }}>
        <Input.Search placeholder="Search by Applicant Name" onChange={onSearchChange} />
      </div>
      <Button type="primary" onClick={openCreateModal}>
        Create Interview
      </Button>
      <Table dataSource={filteredInterviews} columns={columns} rowKey="id" />

      <Modal
       visible={isEditing}
       title={isEditing ? 'Edit Interview' : 'Create Interview'}
       okText={isEditing ? 'Save' : 'Create'}
       cancelText="Cancel"
       onCancel={onCancelEdit}
       onOk={onSaveInterview}
       
      >
        <div>
          <label>Applicant Name:</label>
          <Select
            placeholder="Select Applicant"
            value={formData.applicantName}
            onChange={(value) => setFormData({ ...formData, applicantName: value })}
            style={{ width: '100%' }}
          >
            {applicants.map((applicant) => (
              <Select.Option key={applicant.id} value={applicant.fullname}>
                {applicant.fullname}
              </Select.Option>
            ))}
          </Select>
        </div>
        <div style={{ margin: '16px 0' }}>
          <label>Interviewer Name:</label>
          <Select
            placeholder="Select Interviewer"
            value={formData.interviewerName}
            onChange={(value) => setFormData({ ...formData, interviewerName: value })}
            style={{ width: '100%' }}
            mode="multiple"
          >
            {interviewers.map((interviewer) => (
              <Select.Option key={interviewer.id} value={interviewer.interviewername}>
                {interviewer.interviewername}
              </Select.Option>
            ))}
          </Select>
        </div>
        <div style={{ marginBottom: '16px' }}>
          <label>Scheduled Date:</label>
          <DatePicker
            value={formData.scheduledDate ? moment(formData.scheduledDate) : null}
            onChange={(date) => setFormData({ ...formData, scheduledDate: date })}
            style={{ width: '100%' }}
            format="YYYY-MM-DD"
          />
        </div>
        <div>
        <TimePicker
  value={formData.scheduledTime ? moment(formData.scheduledTime, 'HH:mm:ss') : null}
  onChange={(time) =>
    setFormData({ ...formData, scheduledTime: time ? time.format('HH:mm:ss') : '' })
  }
  style={{ width: '100%' }}
  format="HH:mm"
/>
        </div>
      </Modal>
    </div>
  );
};
