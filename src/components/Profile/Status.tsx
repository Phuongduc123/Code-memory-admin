import React from 'react';
import { useTranslation } from 'react-i18next';
import { StatusCommon } from '../../common/Status';
import { STATUS_BADGE_ANT } from '../../constant';
import { ExperienceStatus } from '../../models/ExperienceModel';
import { TagStatus } from '../../models/TagModel';

export const Status = ({ status }: { status: ExperienceStatus }) => {
  const { t } = useTranslation();
  const STATUS: any = {
    [ExperienceStatus.ACTIVE]: STATUS_BADGE_ANT.success,
    [ExperienceStatus.INACTIVE]: STATUS_BADGE_ANT.error,
  };

  const TEXT: any = {
    [ExperienceStatus.ACTIVE]: t('profile.active'),
    [ExperienceStatus.INACTIVE]: t('profile.inactive'),
  };

  return <StatusCommon status={STATUS[status]} text={TEXT[status]} />;
};
