import React from 'react';
import { TagOutlined } from '@ant-design/icons';

import { stub } from '@/utils/function';

import styles from '@/pages/ai/ai.module.less';

export const sourcesColumns = ({ data, onClick = stub }) => ({
  sources: {
    data,
    columns: [
      {
        title: 'Prompt',
        dataIndex: 'prompt',
        key: 'prompt'
      },
      {
        title: 'Asked At',
        dataIndex: 'asked_date',
        key: 'asked_date',
        width: 250,
        render(asked_date) {
          const date = new Date(asked_date);
          return (
              <div>
                {date.toLocaleDateString('en-US')} {date.toLocaleTimeString('en-US')}
              </div>
          );
        }
      },
      {
        title: 'Sources',
        dataIndex: 'sources',
        key: 'sources',
        render(sources = []) {
          return (
              <ul>
                {sources?.map((s, idx) => (
                    <li key={idx}>
                      Expert name: {s.username}<br/>
                      Score: {s.score}<br/>
                      <div className={styles.link}
                           onClick={() => {
                             onClick();
                           }}>
                        <TagOutlined/>{s.subject}
                      </div>
                    </li>
                ))}
              </ul>
          );
        }
      }
    ]
  }
});