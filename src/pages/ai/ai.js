import React, { memo, useEffect, useState } from 'react';
import { Button, FloatButton, Modal, Spin, Table } from 'antd';
import { WechatOutlined } from '@ant-design/icons';
import classnames from 'classnames';

import { stub } from '@/utils/function';

import Chat from './chat';

import { particleMock } from '@/pages/ai/particle.mock';

import { peopleColumns } from '@/pages/ai/columns/people';
import { sourcesColumns } from '@/pages/ai/columns/sources';
import { knowledgeColumns } from '@/pages/ai/columns/knowledge';
import { userDocsColumns } from '@/pages/ai/columns/userDocs';
import { logsColumns } from '@/pages/ai/columns/logs';
import { costColumns } from '@/pages/ai/columns/cost';

import styles from './ai.module.less';
import { sharedColumns } from '@/pages/ai/columns/shared';

const MODEL_NAME = 'aiModel';

const Ai = props => {
  const {
    aiModel,
    loading,
    onAskAi = stub,
    onBestPeople = stub,
    onPromptsWithSources = stub,
    onLogs = stub,
    onUserInfo = stub,
    onShared = stub,
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
    knowledge = [],
    userDocs = [],
    logs = [],
    costs = [],
    shared = [],
    particles
  } = aiModel;

  const rnd = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const [circle1, setCircle1] = useState({ dims: 50, top: '50%', left: '50%' });
  const [circle2, setCircle2] = useState({ dims: 50, top: '50%', left: '50%' });
  const [circle3, setCircle3] = useState({ dims: 50, top: '50%', left: '50%' });
  const [circle4, setCircle4] = useState({ dims: 50, top: '50%', left: '50%' });
  const [circle5, setCircle5] = useState({ dims: 50, top: '50%', left: '50%' });
  const [circle6, setCircle6] = useState({ dims: 50, top: '50%', left: '50%' });

  useEffect(() => {
    particles && window.particlesJS('particles-js', particleMock);
    setCircle1({
      dims: rnd(200, 300),
      top: 100,
      left: 300
    });

    setCircle2({
      dims: rnd(200, 300),
      top: 300,
      left: 500
    });

    setCircle3({
      dims: rnd(200, 300),
      top: 100,
      left: 700
    });

    setCircle4({
      dims: rnd(200, 300),
      top: 500,
      left: 600
    });

    setCircle5({
      dims: rnd(200, 300),
      top: 400,
      left: 800
    });

    setCircle6({
      dims: rnd(200, 300),
      top: 200,
      left: 900
    });

  }, [window.particlesJS]);

  useEffect(() => {
    knowledge.length && setModalContent(knowledgeColumns({
      data: knowledge
    }));
  }, [knowledge]);

  useEffect(() => {
    people.length && setModalContent(peopleColumns({
      data: people,
      onClick: onUserInfo
    }));
  }, [people]);

  useEffect(() => {
    sources.length && setModalContent(sourcesColumns({
      data: sources
    }));
  }, [sources]);

  useEffect(() => {
    logs.length && setModalContent(logsColumns({
      data: logs
    }));
  }, [logs]);

  useEffect(() => {
    shared.length && setModalContent(sharedColumns({
      data: shared
    }));
  }, [shared]);

  useEffect(() => {
    if (userDocs.length) {
      setModalContent(userDocsColumns({
        data: userDocs
      }));
      setIsModalOpen(true);
      setModalTitle(`${userDocs[0]?.username} Shared Knowledge`);
      setModalType('userDocs');
      setModalStyle(styles.modal4);
    }
  }, [userDocs]);

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
                 setModalTitle('Expert Champions');
                 setModalType('people');
                 setModalStyle(styles.modal2);
                 onBestPeople();
               }}
               style={{ width: circle2.dims, height: circle2.dims, top: circle2.top, left: circle2.left }}>
            Best Experts
          </div>
          <div className={classnames(styles.circle, styles.pulse3)}
               onClick={() => {
                 setIsModalOpen(true);
                 setModalTitle('ASK Prompts');
                 setModalType('sources');
                 setModalStyle(styles.modal3);
                 onPromptsWithSources();
               }}
               style={{ width: circle3.dims, height: circle3.dims, top: circle3.top, left: circle3.left }}>
            ASKed Questions
          </div>
          <div className={classnames(styles.circle, styles.pulse4)}
               onClick={() => {
                 setIsModalOpen(true);
                 setModalTitle('Activities Log');
                 setModalType('logs');
                 setModalStyle(styles.modal4);
                 onLogs();
               }}
               style={{ width: circle4.dims, height: circle4.dims, top: circle4.top, left: circle4.left }}>
            Activities Log
          </div>
          <div className={classnames(styles.circle, styles.pulse5)}
               onClick={() => {
                 setIsModalOpen(true);
                 setModalTitle('Knowledge Cost Performance');
                 setModalType('cost');
                 setModalStyle(styles.modal5);
                 setModalContent(costColumns({
                   data: costs
                 }))
               }}
               style={{ width: circle5.dims, height: circle5.dims, top: circle5.top, left: circle5.left }}>
            Cost Performance
          </div>
          <div className={classnames(styles.circle, styles.pulse6)}
               onClick={() => {
                 setIsModalOpen(true);
                 setModalTitle('Shared Knowledge');
                 setModalType('shared');
                 setModalStyle(styles.modal6);
                 onShared();
               }}
               style={{ width: circle6.dims, height: circle6.dims, top: circle6.top, left: circle6.left }}>
            Shared Knowledge
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
              loading.effects[`${MODEL_NAME}/prompts_with_sources`] ||
              loading.effects[`${MODEL_NAME}/all_docs`] ||
              loading.effects[`${MODEL_NAME}/logs`] ||
              loading.effects[`${MODEL_NAME}/documents_of_user`]
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