import React from 'react';
import { Input } from 'antd';
import { TextAreaProps } from 'antd/lib/input';

const { TextArea } = Input;

export interface ITextAreaCommon extends TextAreaProps {}

export const TextAreaCommon = ({ ...props }: ITextAreaCommon) => {
  return <TextArea {...props} />;
};
