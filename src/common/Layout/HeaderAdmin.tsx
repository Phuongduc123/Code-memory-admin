import { Popover, Tag } from 'antd';
import Avatar from 'antd/lib/avatar/avatar';
import { Header } from 'antd/lib/layout/layout';
import Title from 'antd/lib/typography/Title';
import React, { useState } from 'react';
import { useAppSelector } from '../../redux/rootStore';
import { helper } from '../../services/helperService';
import Box from '../Box';
import { CheckCircleOutlined } from '@ant-design/icons';
import { LogoutOutlined } from '@ant-design/icons';
import ButtonCommon from '../Button';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { logoutSliceStart } from '../../redux/slices/loginSlice';

export const HeaderAdmin = () => {
  const { t } = useTranslation();
  const user = useAppSelector(state => state.loginSlice.user);
  const dispatch = useDispatch();
  const [visiblePopover, setVisiblePopover] = useState<boolean>(false);

  const onChangeVisiblePopover = (visible: boolean) => {
    setVisiblePopover(visible);
  };

  const onLogout = () => {
    dispatch(logoutSliceStart());
  };

  const menuPopover = (
    <Box>
      <ButtonCommon onClick={onLogout} type="text" icon={<LogoutOutlined />}>
        {t('common.logout')}
      </ButtonCommon>
    </Box>
  );

  return (
    <Header className="header">
      <Popover
        overlayClassName="app-popover popover-header"
        content={menuPopover}
        placement="bottom"
        title={null}
        trigger="click"
        visible={visiblePopover}
        onVisibleChange={onChangeVisiblePopover}>
        <Box className="info-wrap flx-center">
          <Box className="info-wrap__name-tag mr-10">
            <Title level={4}>{helper.getFullName(user)}</Title>
            <Tag icon={<CheckCircleOutlined />} className="mr-0" color="success">
              ADMIN
            </Tag>
          </Box>
          <Avatar size={40} src={user.avatar} />
        </Box>
      </Popover>
    </Header>
  );
};
