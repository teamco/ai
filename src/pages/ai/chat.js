import React, { memo, useState } from 'react';
import { CloseOutlined, TagOutlined } from '@ant-design/icons';
import { Button, Form, Input, Space, Spin, Empty } from 'antd';

import { stub } from '@/utils/function';

import styles from './ai.module.less';

const MODEL_NAME = 'aiModel';

const Chat = props => {
  const {
    chatVisible,
    loading,
    answers = [],
    setChatVisible = stub,
    onAsk = stub
  } = props;

  const [formRef] = Form.useForm();
  const _answers = [...answers].reverse();

  const [disabled, setDisabled] = useState(true);

  return chatVisible ? (
      <div className={styles.chat}>
        <div className={styles.close}
             onClick={() => setChatVisible(false)}>
          <CloseOutlined/>
        </div>
        <div className={styles.content}>
          <Spin spinning={!!loading.effects[`${MODEL_NAME}/ask`]}>
            <ul>
              {_answers.length ? _answers.map((answer, idx) => (
                  <li key={idx}>
                    <div className={styles.question}>
                      <span>Question: </span>
                      {answer.q}
                    </div>
                    <div className={styles.answer}>
                      <span>Answer: </span>
                      <pre>{answer.a}</pre>
                      <ul>
                        {answer?.s?.map((s, sidx) => (
                            <li key={sidx} onClick={() => {

                            }}><TagOutlined />{s.title}</li>
                        ))}
                      </ul>
                    </div>
                  </li>
              )) : (
                  <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
              )}
            </ul>
          </Spin>
        </div>
        <Space.Compact className={styles.footer}>
          <Form form={formRef}>
            <Form.Item label={false} name={'question'}>
              <Input size={'large'}
                     onChange={(e) => setDisabled(!e.target.value)}
                     placeholder={'Enter your Prompt'}/>
            </Form.Item>
          </Form>
          <Button type={'primary'}
                  size={'large'}
                  disabled={disabled}
                  onClick={() => {
                    onAsk(formRef?.getFieldValue('question'));
                    formRef.setFieldValue('question', null);
                  }}
                  loading={loading.effects[`${MODEL_NAME}/ask`]}>
            Ask AI-Magic
          </Button>
        </Space.Compact>
      </div>
  ) : null;
};

export default memo(Chat);