import React from 'react';
import { Input, InputNumber } from 'antd';
import { FieldInputProps, FieldMetaProps, FormikProps } from 'formik';
import { FC } from 'react';
import Box from '../Box';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';
import { helper } from '../../services/helperService';

export interface IInputNumberComponent {
  label?: string;
  prefix?: any;
  suffix?: any;
  placeholder?: string;
  className?: string;
  classNameWrap?: string;
  passwordMode?: boolean;
  field?: FieldInputProps<any>;
  form?: FormikProps<any>;
  meta?: FieldMetaProps<any>;
  max?: number;
  min?: number;
}

export const InputNumberComponent: FC<IInputNumberComponent> = ({
  field,
  form: { touched: formTouched, errors: formErrors, setFieldValue },
  label = '',
  prefix = null,
  suffix = null,
  placeholder = '',
  passwordMode = false,
  className = '',
  classNameWrap = '',
  ...props
}) => {
  const { t } = useTranslation();
  const touched = helper.getValByStrKey(formTouched, field.name);
  const errorMessage = helper.getValByStrKey(formErrors, field.name);
  const placeHolderDefault = !!label ? t('message.placeholder_default', { label: t(label) }) : '';

  return (
    <Box className={clsx('field-wrap', [classNameWrap] && classNameWrap)}>
      {label && <label className="field-wrap__label">{t(label)}</label>}
      <InputNumber
        {...field}
        {...props}
        className={clsx('app-input-number', [className] && className)}
        placeholder={!!placeholder ? t(placeholder) : placeHolderDefault}
        prefix={prefix}
        onChange={(value) => setFieldValue(field.name, value)}
      />
      {errorMessage && touched && <span className="required">{errorMessage}</span>}
    </Box>
  );
};
