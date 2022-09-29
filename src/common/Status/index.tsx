import { Badge } from 'antd';
import { PresetStatusColorType } from 'antd/lib/_util/colors';
import clsx from 'clsx';
import React from 'react';

export const StatusCommon = ({ status, text, color = '' }: { status: PresetStatusColorType; text: string; color?: string }) => {
  return <Badge className={clsx('badge-status-app', status)} status={status} color={color} text={text} />;
};
