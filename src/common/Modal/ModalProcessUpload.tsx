import { ModalCommon } from '.';
import React, { useEffect, useState } from 'react';
import { useAppSelector } from '../../redux/rootStore';
import { getLayoutSlice } from '../../redux/slices/layoutSlice';
import { useTranslation } from 'react-i18next';
import { AppSpinning } from '../Spining';
import Paragraph from 'antd/lib/typography/Paragraph';
import Box from '../Box';
import { Progress } from 'antd';

export const ModalProcessUpload = () => {
  const { t } = useTranslation();
  const [total, setTotal] = useState<number>(0);
  const { loadingUpload, visibleProcessModal, msgErrUpload, count } = useAppSelector(getLayoutSlice).processUpload;

  useEffect(() => {
    if (!visibleProcessModal) {
      setTotal(count);
    }
  }, [count, visibleProcessModal]);

  const getPercent = () => {
    return Math.round(((total - count) * 100) / total);
  };

  return (
    <ModalCommon className="modal-upload-process" closable={!loadingUpload} visible={visibleProcessModal}>
      {loadingUpload && (
        <Box className="flx-center column">
          <Paragraph className="dec-upload">{t('common.upload_s3_dec')}</Paragraph>
          <AppSpinning loading={true} />
          <Progress percent={getPercent()} status="active" className="mt-30" />
        </Box>
      )}
      {!!msgErrUpload && <Paragraph>{msgErrUpload}</Paragraph>}
    </ModalCommon>
  );
};
