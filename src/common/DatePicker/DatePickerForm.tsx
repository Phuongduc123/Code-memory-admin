import React, { FC, useMemo, useState } from 'react';
import clsx from 'clsx';
import dayjs from 'dayjs';
import DatePicker from '.';
import { FieldInputProps, FieldMetaProps, FormikProps } from 'formik';
import { useTranslation } from 'react-i18next';

export interface IDateComponent {
  label?: string;
  prefix?: any;
  suffix?: any;
  placeholder?: string;
  className?: string;
  classNameWrap?: string;
  passwordMode?: boolean;
  disabledDate?: any;
  classWrap?: string;
  callbackChangeValue: any;
  field?: FieldInputProps<any>;
  form?: FormikProps<any>;
  meta?: FieldMetaProps<any>;
}

export const DateComponent: FC<IDateComponent> = ({
  field: { name, value },
  form: { touched: formTouched, errors: formErrors, setFieldValue },
  label = '',
  prefix = null,
  callbackChangeValue,
  classWrap = '',
  suffix = null,
  placeholder = '',
  className = '',
  disabledDate = undefined,
  ...props
}) => {
  const touched = formTouched[name];
  const errorMessage = formErrors[name];
  const { t } = useTranslation()

  const onChangeValue = changeVal => {
    setFieldValue(name, changeVal ? changeVal.unix() * 1000 : '');
  };

  const renderPicker = useMemo(() => {
    return <DatePicker value={value ? dayjs(value) : null} className={`app-date-picker ${className}`} onChange={onChangeValue} {...props} />;
  }, [value]);

  return (
    <div className={clsx('field-wrap', [classWrap] && classWrap)}>
      {label && <label className="field-wrap__label">{t(label)}</label>}
      {renderPicker}
      {errorMessage && touched && <span className="required">{errorMessage}</span>}
    </div>
  );
};
