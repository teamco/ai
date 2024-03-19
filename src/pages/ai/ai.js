import React, { memo, useEffect, useState } from 'react';
import { Button, FloatButton, Modal, Spin, Table } from 'antd';
import { TagOutlined, WechatOutlined } from '@ant-design/icons';
import classnames from 'classnames';

import { stub } from '@/utils/function';

import Chat from './chat';

import { particleMock } from '@/pages/ai/particle.mock';

import styles from './ai.module.less';

const MODEL_NAME = 'aiModel';

const Ai = props => {
  const {
    aiModel,
    loading,
    onAskAi = stub,
    onBestPeople = stub,
    onPromptsWithSources = stub,
    onBestKnowledge = stub
  } = props;

  const [chatVisible, setChatVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState(null);
  const [modalContent, setModalContent] = useState(null);
  const [modalType, setModalType] = useState(null);
  const [modalStyle, setModalStyle] = useState(null);

  const {
    answers = [],
    people = [],
    sources = [],
    knowledge = []
  } = aiModel;

  const rnd = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const [circle1, setCircle1] = useState({ dims: 50, top: '50%', left: '50%' });
  const [circle2, setCircle2] = useState({ dims: 50, top: '50%', left: '50%' });
  const [circle3, setCircle3] = useState({ dims: 50, top: '50%', left: '50%' });

  useEffect(() => {
    window.particlesJS('particles-js', particleMock);
    setCircle1({
      dims: rnd(200, 300),
      top: rnd(200, 400),
      left: rnd(200, 300)
    });

    setCircle2({
      dims: rnd(200, 300),
      top: rnd(100, 300),
      left: rnd(500, 600)
    });

    setCircle3({
      dims: rnd(200, 300),
      top: rnd(100, 400),
      left: rnd(800, 960)
    });

  }, [window.particlesJS]);

  useEffect(() => {
    knowledge.length && setModalContent({
      knowledge: {
        data: knowledge,
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
            title: 'Text',
            dataIndex: 'body',
            key: 'body',
            render(body, record) {
              return (
                  <div>
                    {record.subject}
                    {/*<pre>{body}</pre>*/}
                  </div>
              );
            }
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
  }, [knowledge.length]);

  useEffect(() => {
    people.length && setModalContent({
      people: {
        data: people,
        columns: [
          {
            title: 'Name',
            dataIndex: 'username',
            key: 'username'
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
  }, [people.length]);

  useEffect(() => {
    sources.length && setModalContent({
      sources: {
        data: sources,
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
                          <div onClick={() => {

                          }}><TagOutlined/>{s.subject}</div>
                        </li>
                    ))}
                  </ul>
              );
            }
          }
        ]
      }
    });
  }, [sources.length]);
console.log(sources)
  return (
      <div className={styles.aiWrapper}>
        <div id={'particles-js'} className={styles.particles}/>
        <div className={styles.ai}>
          <div className={classnames(styles.circle, styles.pulse1)}
               onClick={() => {
                 setIsModalOpen(true);
                 setModalTitle('Best Knowledge');
                 setModalType('knowledge');
                 setModalStyle(styles.modal1);
                 onBestKnowledge();
               }}
               style={{ width: circle1.dims, height: circle1.dims, top: circle1.top, left: circle1.left }}>
            Best Knowledge
          </div>
          <div className={classnames(styles.circle, styles.pulse2)}
               onClick={() => {
                 setIsModalOpen(true);
                 setModalTitle('Best People');
                 setModalType('people');
                 setModalStyle(styles.modal2);
                 onBestPeople();
               }}
               style={{ width: circle2.dims, height: circle2.dims, top: circle2.top, left: circle2.left }}>
            Best People
          </div>
          <div className={classnames(styles.circle, styles.pulse3)}
               onClick={() => {
                 setIsModalOpen(true);
                 setModalTitle('Prompts with Sources');
                 setModalType('sources');
                 setModalStyle(styles.modal3);
                 onPromptsWithSources();
               }}
               style={{ width: circle3.dims, height: circle3.dims, top: circle3.top, left: circle3.left }}>
            Prompts with Sources
          </div>
        </div>
        <Chat chatVisible={chatVisible}
              loading={loading}
              answers={answers}
              onAsk={onAskAi}
              setChatVisible={setChatVisible}/>
        <Modal title={modalTitle}
               open={isModalOpen}
               className={modalStyle}
               closeIcon={null}
               footer={[
                 <Button key={'close'}
                         onClick={() => {
                           setIsModalOpen(false);
                           setModalTitle(null);
                           setModalType(null);
                         }}>
                   Close
                 </Button>
               ]}>
          <Spin spinning={!!(
              loading.effects[`${MODEL_NAME}/best_knowledge`] ||
              loading.effects[`${MODEL_NAME}/best_people`] ||
              loading.effects[`${MODEL_NAME}/prompts_with_sources`]
          )}>
            {modalContent?.[modalType]?.data ? (
                <Table dataSource={modalContent?.[modalType]?.data}
                       columns={modalContent?.[modalType]?.columns}
                       size={'small'}
                       pagination={null}
                       scroll={{ y: 300 }}/>
            ) : null}
          </Spin>
        </Modal>
        <FloatButton tooltip={<div>Ask AI-Magic</div>}
                     className={styles.chatIcon}
                     onClick={() => setChatVisible(true)}
                     icon={<WechatOutlined/>}/>
      </div>
  );
};

export default memo(Ai);