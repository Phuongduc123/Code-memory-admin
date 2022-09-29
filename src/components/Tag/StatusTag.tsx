import React from 'react';
import { useTranslation } from 'react-i18next';
import { StatusCommon } from '../../common/Status';
import { STATUS_BADGE_ANT } from '../../constant';
import { TagStatus } from '../../models/TagModel';

export const StatusTag = ({ status }: { status: TagStatus }) => {
  const { t } = useTranslation();
  const STATUS: any = {
    [TagStatus.ACTIVE]: STATUS_BADGE_ANT.success,
    [TagStatus.HIDE]: STATUS_BADGE_ANT.error,
  };

  const TEXT: any = {
    [TagStatus.ACTIVE]: t('tag.active'),
    [TagStatus.HIDE]: t('tag.hide'),
  };

  return <StatusCommon status={STATUS[status]} text={TEXT[status]} />;
};
