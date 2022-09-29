import ButtonCommon from '.';
import Box from '../Box';
import React from 'react';
import { SaveOutlined, CloseOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

export const ButtonForm = ({
  textSubmit = 'common.txt_completed',
  textClose = 'common.txt_close',
  onClickSubmit,
  IconSubmit = SaveOutlined,
  IconClose = CloseOutlined,
  onClickClose,
  loading = false,
}: {
  textSubmit?: string;
  IconSubmit?: any;
  onClickSubmit?: any;
  textClose?: string;
  IconClose?: any;
  onClickClose?: any;
  loading?: boolean;
}) => {
  const { t } = useTranslation();
  return (
    <Box className="flx-center algin-left mt-30">
      {onClickSubmit && (
        <ButtonCommon loading={loading} onClick={onClickSubmit} className="mr-12" type="primary" shape="round" icon={<IconSubmit />} size="middle">
          {t(textSubmit)}
        </ButtonCommon>
      )}
      {onClickClose && (
        <ButtonCommon loading={loading} onClick={onClickClose} type="default" shape="round" icon={<IconClose />} size="middle">
          {t(textClose)}
        </ButtonCommon>
      )}
    </Box>
  );
};
