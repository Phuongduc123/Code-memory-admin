import React, { useEffect } from 'react';
import { notification, Typography } from 'antd';
import { useAppSelector } from '../../redux/rootStore';
import { getLayoutSlice } from '../../redux/slices/layoutSlice';
import { useTranslation } from 'react-i18next';
import Box from '../Box';
import dayjs from 'dayjs';
import { TIME_FORMAT } from '../../constant';

export const NotifySystem = () => {
  const { t } = useTranslation();
  const notify = useAppSelector(getLayoutSlice).notify;

  const openNotificationWithIcon = () => {
    notification[notify.typeNotify]({
      className: 'notify-sys',
      message: t(`message.title_${notify.typeNotify}`),
      key: `${notify.createTime}`,
      duration: 10,
      description: (
        <Box className="notify-sys-content">
          <Typography.Paragraph className="dec mb-0">{t(`message.${notify.messageNotify}`)}</Typography.Paragraph>
          <Typography.Paragraph className="time mb-0">{dayjs(notify.createTime).format(TIME_FORMAT.HH_MM)}</Typography.Paragraph>
        </Box>
      ),
    });
  };

  useEffect(() => {
    if (notify?.typeNotify && notify?.messageNotify) {
      openNotificationWithIcon();
    }
  }, [notify]);

  return <></>;
};
