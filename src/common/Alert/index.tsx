import React from 'react';
import { Alert, AlertProps } from 'antd';
import clsx from 'clsx';

interface IAlertCommon extends AlertProps {
  className?: string;
}

export const AlertCommon: React.FC<IAlertCommon> = ({ className, type = 'error', ...props }) => {
  return <Alert className={clsx([className] && className, 'app-alert mt-18')} type={type} {...props} />;
};
