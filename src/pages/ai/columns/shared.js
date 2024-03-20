import { stub } from '@/utils/function';
import React from 'react';

import styles from '../ai.module.less';
import { TagOutlined } from '@ant-design/icons';

export const sharedColumns = ({ data, onClick = stub }) => ({
  shared: {
    data,
    columns: [
      {
        title: 'Name',
        dataIndex: 'username',
        key: 'username',
        width: 200,
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
        title: 'URL',
        dataIndex: 'url',
        key: 'url',
        render(url) {
          return url ? (
              <div className={styles.link}
                   onClick={() => {
                     onClick();
                   }}>
                <TagOutlined/>{url?.substring(0, 40)}...
              </div>
          ) : null
        }
      },
      {
        title: 'Score',
        dataIndex: 'score',
        key: 'score',
        width: 70
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
      }
    ]
  }
});