import React from 'react';
import { Layout, Spin } from 'antd';


import { isSpinning } from '@/utils/state';

import stylesPage from '@/layouts/landing/page/landing.page.layout.module.less';

const { Content } = Layout;

/**
 * @export
 * @default
 * @param props
 * @return {JSX.Element}
 */
export const LandingPage = (props) => {
  const {
    landingModel,
    authModel,
    appModel,
    loading,
    onSignOut,
    spinEffects = [],
    pageStyles = stylesPage.pageContent,
    onChangeLang
  } = props;

  const {
    icon,
    topUnder,
    header: { position, visible }
  } = landingModel;

  const { user } = authModel;

  const headerProps = {
    icon,
    user,
    topUnder,
    onSignOut,
    position,
    landingModel,
    authModel,
    onChangeLang,
    loading,
    visible
  };

  return (
      <Spin spinning={isSpinning(loading, spinEffects, loading.effects['landingModel/query'])}>
        <Layout>
          <Content>
            <div>
              <div className={pageStyles}>
                {props.children}
              </div>
            </div>
          </Content>
        </Layout>
      </Spin>
  );
};
