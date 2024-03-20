import React from 'react';

import { stub } from '@/utils/function';

export const userDocsColumns = ({ data, onClick = stub }) => ({
  userDocs: {
    data,
    columns: [
      {
        title: 'Name',
        dataIndex: 'username',
        key: 'username',
        render(username, record) {
          return (
              <div>
                <strong>{username}</strong><br/>
                {record.email}<br/>
              </div>
          );
        }
      },
      {
        title: 'Subject',
        dataIndex: 'subject',
        key: 'subject'
      },
      {
        title: 'Created At',
        dataIndex: 'created_date',
        key: 'created_date',
        width: 250,
        render(created_date) {
          const date = new Date(created_date);
          return (
              <div>
                {date.toLocaleDateString('en-US')} {date.toLocaleTimeString('en-US')}
              </div>
          );
        }
      },
      {
        title: 'Score',
        dataIndex: 'score',
        key: 'score',
        width: 70
      }
    ]
  }
});