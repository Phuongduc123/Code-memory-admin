import dayjs from 'dayjs';
import React, { FC } from 'react';
import { TFunction } from 'react-i18next';
import { EditOutlined } from '@ant-design/icons';
import { Tag, TagStatus } from '../../models/TagModel';
import { DATA_KEY_IMAGE, TIME_FORMAT } from '../../constant';
import { User } from '../../models/UserModel';
import { HelperService } from '../../services/helperService';
import Box from '../../common/Box';
import ButtonCommon from '../../common/Button';
import { ColumnType } from 'antd/lib/table';
import clsx from 'clsx';
import { HistoryField } from '../../models/CommonModel';
import AntImage from '../../common/Image/AntImage';

export const BoxDiffValue: FC<{
  isNew?: boolean;
  history: HistoryField;
}> = ({ isNew = false, history }) => {
  const value = isNew ? history.newValue : history.oldValue;

  const renderValueDiff = () => {
    if (DATA_KEY_IMAGE.includes(history.key)) {
      return <AntImage preview={true} width={100} src={value} />;
    }
    return value;
  };

  return <Box className={clsx(!isNew && 'old-value', 'box-diff-value')}>{renderValueDiff()}</Box>;
};

export const useColumnDiff = (t: TFunction, keyField = ''): ColumnType<any>[] => {
  return [
    {
      title: t('common.name'),
      dataIndex: 'key',
      render: value => t(`${keyField}.${value}`),
    },
    {
      title: t('common.old'),
      render: (value: any, row: HistoryField, index: number) => <BoxDiffValue history={row} />,
    },
    {
      title: t('common.new'),
      render: (value: any, row: HistoryField, index: number) => <BoxDiffValue isNew={true} history={row} />,
    },
  ];
};
