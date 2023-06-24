import React from 'react';
import { Table, Button, Popconfirm, message } from 'antd';


const OfferLetterTable = ({ data, onUpdate, onDelete }) => {
    const columns = [
        {
          title: 'Applicant ID',
          dataIndex: 'id',
          key: 'id',
        },
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
          dataIndex: 'letterFile',
          key: 'letterFile',
        },
        {
          title: 'Remarks',
          dataIndex: 'remarks',
          key: 'remarks',
        },
        {
          title: 'Action',
          key: 'action',
          render: (text, record) => (
            <span>
              <Button type="primary" onClick={() => onUpdate(record)}>
                Update
              </Button>
              <Popconfirm
                title="Are you sure you want to delete this record?"
                onConfirm={() => onDelete(record.id)}
                okText="Yes"
                cancelText="No"
              >
                <Button type="danger" style={{ marginLeft: 8 }}>
                  Delete
                </Button>
              </Popconfirm>
            </span>
          ),
        },
      ];
    
      return 
      <Table dataSource={data} columns={columns} />;
    };
    
    export default OfferLetterTable;