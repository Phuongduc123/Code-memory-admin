import React, { FC } from 'react';
import { Input } from 'antd';
import Box from '../Box';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { FieldInputProps, FieldMetaProps, FormikProps } from 'formik';

const { TextArea } = Input;

export interface ITextAreaComponent {
  label?: string;
  prefix?: any;
  suffix?: any;
  autoSize?: any;
  placeholder?: string;
  className?: string;
  classNameWrap?: string;
  field?: FieldInputProps<any>;
  form?: FormikProps<any>;
  meta?: FieldMetaProps<any>;
}

export const TextAreaComponent: FC<ITextAreaComponent> = ({
  field,
  form: { touched: formTouched, errors: formErrors, setFieldValue },
  label = '',
  prefix = null,
  suffix = null,
  placeholder = '',
  className = '',
  autoSize = { minRows: 3 },
  classNameWrap = '',
  ...props
}) => {
  const { t } = useTranslation();
  const touched = formTouched[field.name];
  const errorMessage = formErrors[field.name];

  const onChangeTextArea = ({ target: { value } }) => {
    setFieldValue && setFieldValue(field.name, value);
  };

  return (
    <Box className={clsx('field-wrap', [classNameWrap] && classNameWrap)}>
      {label && <label className="field-wrap__label">{t(label)}</label>}
      <TextArea
        autoSize={autoSize}
        className={clsx('app-textarea', [className] && className)}
        placeholder={t(placeholder)}
        onChange={onChangeTextArea}
        {...field}
        {...props}
      />
      {errorMessage && touched && <span className="required">{errorMessage}</span>}
    </Box>
  );
};
