import React from 'react';
import { useTranslation } from 'react-i18next';
import { ExperienceType } from '../../../models/ExperienceModel';
import { StatusCommon } from '../../../common/Status';
import { STATUS_BADGE_ANT } from '../../../constant';
import { ExperienceStatus } from '../../../models/ExperienceModel';
import { TagStatus } from '../../../models/TagModel';
import { Badge } from 'antd';

export const TypeExp = ({ status }: { status: ExperienceType }) => {
  const { t } = useTranslation();
  const COLOR: any = {
    [ExperienceType.CERTIFICATE]: "yellow",
    [ExperienceType.LEARN]: "red",
    [ExperienceType.WORK]: "blue",

  };

  const TEXT: any = {
    [ExperienceType.CERTIFICATE]: t('profile.certificate'),
    [ExperienceType.LEARN]: t('profile.learn'),
    [ExperienceType.WORK]: t('profile.work'),
  };

  return <Badge color={COLOR[status]} text={TEXT[status]} />
};
