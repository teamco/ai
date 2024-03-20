import React, { memo, useState } from 'react';
import { CloseOutlined, TagOutlined } from '@ant-design/icons';
import { Button, Form, Input, Space, Spin, Empty, Select } from 'antd';

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
  const [headerRef] = Form.useForm();
  const _answers = [...answers].reverse();

  const [disabled, setDisabled] = useState(true);
  const [expert, setExpert] = useState(false);

  return chatVisible ? (
      <div className={styles.chat}>
        <div className={styles.close}
             onClick={() => setChatVisible(false)}>
          <CloseOutlined/>
        </div>
        <div className={styles.chatHeader}>
          <Form layout={'vertical'} form={headerRef}>
            <Form.Item label={'Knowledge Scope'} name={'scope'}>
              <Select style={{ width: '100%' }}
                      placeholder={'Select Scope'}
                      onChange={(value) => {
                        setExpert(value === 'experts');
                      }}
                      options={[
                        {
                          value: 'amdocs',
                          label: 'Amdocs'
                        },
                        {
                          value: 'team',
                          label: 'Department'
                        },
                        {
                          value: 'experts',
                          label: 'Virtual Experts'
                        }
                      ]}/>
            </Form.Item>
            {expert ? (
                <Form.Item label={'ASK Virtual Expert'} name={'expert'}>
                  <Select style={{ width: '100%' }}
                          placeholder={'ASK our Experts'}
                          options={[
                            {
                              value: 'my',
                              label: 'Myself'
                            },
                            {
                              value: 'adi',
                              label: 'Adi Lachman'
                            },
                            {
                              value: 'pavel',
                              label: 'Pavel May'
                            },
                            {
                              value: 'david',
                              label: 'David Boni'
                            },
                            {
                              value: 'vlad',
                              label: 'Vladimir Tkach'
                            },
                            {
                              value: 'mosh',
                              label: 'Moshe Bukaya'
                            }
                          ]}/>
                </Form.Item>
            ) : null}
          </Form>
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
                            <li key={sidx} className={styles.link}
                                onClick={() => {

                                }}><TagOutlined/>{s.title}</li>
                        ))}
                      </ul>
                    </div>
                  </li>
              )) : (
                  <Empty image={Empty.PRESENTED_IMAGE_SIMPLE}/>
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