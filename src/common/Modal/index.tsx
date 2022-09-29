import React, { FC } from 'react';
import Modal, { ModalProps } from 'antd/lib/modal/Modal';
import clsx from 'clsx';

export interface IModalCommon extends ModalProps {}

export const ModalCommon: FC<IModalCommon> = ({ title = '', maskClosable = false, footer = false, className = '', children, ...props }) => {
  return (
    <Modal title={title} footer={footer} maskClosable={maskClosable} className={clsx('app-modal', className)} {...props}>
      {children}
    </Modal>
  );
};
