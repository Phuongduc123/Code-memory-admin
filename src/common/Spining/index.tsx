import React from 'react';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

export const AppSpinning = ({ children, loading }: { children?: any; loading: boolean }) => {
  const iconLoading = <LoadingOutlined style={{ fontSize: 32 }} spin />;

  return children ? (
    <Spin indicator={iconLoading} wrapperClassName="app-spin" spinning={loading}>
      {children}
    </Spin>
  ) : (
    <Spin indicator={iconLoading} wrapperClassName="app-spin" spinning={loading}></Spin>
  );
};
