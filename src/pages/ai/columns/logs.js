import React from 'react';
import { TagOutlined } from '@ant-design/icons';

import { stub } from '@/utils/function';

import styles from '@/pages/ai/ai.module.less';

export const logsColumns = ({ data, onClick = stub }) => ({
  logs: {
    data,
    columns: [
      {
        title: 'Name',
        dataIndex: 'username',
        key: 'username',
        width: 70
      },
      {
        title: 'Action',
        dataIndex: 'action',
        key: 'action',
        width: 70,
        render(action) {
          return(
              <div className={styles.action}>{action}</div>
          )
        }
      },
      {
        title: 'Execution time',
        dataIndex: 'execution_time',
        key: 'execution_time',
        width: 150
      },
      {
        title: 'Prompt / Reply',
        dataIndex: 'prompt_message',
        key: 'prompt_message',
        render(prompt_message, record) {
          return (
              <>
                <div style={{ marginBottom: 8, borderBottom: '1px solid #dedede' }}>
                  <strong>Prompt:</strong><br/>
                  {prompt_message.substring(0, 300)}...
                </div>
                <div>
                  <strong>Reply:</strong><br/>
                  {record.reply.substring(0, 300)}...
                </div>
              </>
          );
        }
      },
      {
        title: 'Created At',
        dataIndex: 'date',
        key: 'date',
        width: 250,
        render(date) {
          const _date = new Date(date);
          return (
              <div>
                {_date.toLocaleDateString('en-US')} {_date.toLocaleTimeString('en-US')}
              </div>
          );
        }
      }
    ]
  }
});