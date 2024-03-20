import React from 'react';
import { TagOutlined } from '@ant-design/icons';

import { stub } from '@/utils/function';

import styles from '@/pages/ai/ai.module.less';

export const peopleColumns = ({ data, onClick = stub }) => ({
  people: {
    data,
    columns: [
      {
        title: 'Name',
        dataIndex: 'username',
        key: 'username',
        render(username) {
          return (
              <div className={styles.link}
                   onClick={() => {
                     onClick(username);
                   }}>
                <TagOutlined/>{username}
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