import React, { useState, useEffect } from 'react';
import { Button, Modal, Input, Table, Space, Form } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import axios from 'axios';

export const InterviewerList = () => {
  const [interviewers, setInterviewers] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingInterviewer, setEditingInterviewer] = useState(null);
  const [search, setSearch] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [newInterviewer, setNewInterviewer] = useState({ interviewername: '',email:" ", position: '' });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get('http://localhost:3000/interviewerlist')
      .then((response) => {
        setInterviewers(response.data);
      })
      .catch((error) => {
        console.error('Error fetching interviewers:', error);
      });
  };

  const createInterviewer = () => {
    axios
      .post('http://localhost:3000/interviewerlist', newInterviewer)
      .then((response) => {
        setInterviewers([...interviewers, response.data]);
        setIsCreating(false);
        setNewInterviewer({ interviewername: '', position: '' });
      })
      .catch((error) => {
        console.error('Error creating interviewer:', error);
      });
  };

  const updateInterviewer = () => {
    axios
      .put(`http://localhost:3000/interviewerlist/${editingInterviewer.id}`, editingInterviewer)
      .then(() => {
        const updatedInterviewers = interviewers.map((interviewer) =>
          interviewer.id === editingInterviewer.id ? editingInterviewer : interviewer
        );
        setInterviewers(updatedInterviewers);
        setIsEditing(false);
        setEditingInterviewer(null);
      })
      .catch((error) => {
        console.error('Error updating interviewer:', error);
      });
  };

  const deleteInterviewer = (interviewer) => {
    axios
      .delete(`http://localhost:3000/interviewerlist/${interviewer.id}`)
      .then(() => {
        const filteredInterviewers = interviewers.filter((item) => item.id !== interviewer.id);
        setInterviewers(filteredInterviewers);
        alert('Interviewer deleted successfully.');
      })
      .catch((error) => {
        console.error('Error deleting interviewer:', error);
      });
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Interviewer Name',
      dataIndex: 'interviewername',
      key: 'name',
    },
    {
      title: 'Position',
      dataIndex: 'position',
      key: 'position',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button type="primary" onClick={() => onViewInterviewer(record)}>
            View
          </Button>
          <Button type="primary" onClick={() => onEditInterviewer(record)}>
            Edit
          </Button>
          <Button type="primary" danger onClick={() => onDeleteInterviewer(record)}>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  const onViewInterviewer = (record) => {
    Modal.info({
      title: 'Interviewer Details',
      content: (
        <div>
          <p>
            <strong>ID:</strong> {record.id}
          </p>
          <p>
            <strong>Interviewer Name:</strong> {record.interviewername}
          </p>
          <p>
            <strong>Position:</strong> {record.position}
          </p>
        </div>
      ),
    });
  };

  const onEditInterviewer = (record) => {
    setEditingInterviewer({ ...record });
    setIsEditing(true);
  };

  const onSaveInterviewer = () => {
    if (isCreating) {
      createInterviewer();
    } else {
      updateInterviewer();
    }
  };

  const onDeleteInterviewer = (record) => {
    Modal.confirm({
      title: 'Delete Interviewer',
      content: 'Are you sure you want to delete this interviewer?',
      okText: 'Delete',
      okType: 'danger',
      onOk: () => deleteInterviewer(record),
    });
  };

  const onCancelEdit = () => {
    setIsEditing(false);
    setIsCreating(false); 
    setEditingInterviewer(null);
    setNewInterviewer({ interviewername: '', position: '', email: '' }); 
  };
  

  const onSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const filteredInterviewers = interviewers.filter(
    (interviewer) =>
      interviewer.interviewername.toLowerCase().includes(search.toLowerCase()) ||
      interviewer.position.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Interviewer List</h1>
      <div>
        <Button style={{ marginLeft: '50px' ,background:"green"}} type="primary" onClick={() => setIsCreating(true)}>
          Create Interviewer
        </Button>
      </div>
      <Table style={{ margin: '50px 50px 50px 50px' }} columns={columns} dataSource={filteredInterviewers} />

      <Modal
  title={isCreating ? 'Create Interviewer' : 'Edit Interviewer'}
  visible={isEditing || isCreating}
  onOk={onSaveInterviewer}
  onCancel={onCancelEdit}
  okText="Save"
  cancelText="Cancel"
>
  <Input
    placeholder="Interviewer Name"
    value={isCreating ? newInterviewer.interviewername : editingInterviewer?.interviewername}
    onChange={(e) => {
      if (isCreating) {
        setNewInterviewer({ ...newInterviewer, interviewername: e.target.value });
      } else {
        setEditingInterviewer({ ...editingInterviewer, interviewername: e.target.value });
      }
    }}
  />
  <Input
    placeholder="Email" 
    value={isCreating ? newInterviewer.email : editingInterviewer?.email}
    onChange={(e) => {
      if (isCreating) {
        setNewInterviewer({ ...newInterviewer, email: e.target.value });
      } else {
        setEditingInterviewer({ ...editingInterviewer, email: e.target.value });
      }
    }}
  />
  <Input
    placeholder="Position"
    value={isCreating ? newInterviewer.position : editingInterviewer?.position}
    onChange={(e) => {
      if (isCreating) {
        setNewInterviewer({ ...newInterviewer, position: e.target.value });
      } else {
        setEditingInterviewer({ ...editingInterviewer, position: e.target.value });
      }
    }}
  />
</Modal>

    </div>
  );
};
