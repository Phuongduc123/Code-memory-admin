import React, { FC } from 'react';
import { Select } from 'antd';
import clsx from 'clsx';
import { FieldInputProps, FieldMetaProps, FormikProps } from 'formik';
import { useTranslation } from 'react-i18next';
import Box from '../Box';
import { OptionSelect } from '../../models/FieldModel';

const { Option } = Select;

export interface ISelectComponent {
  label?: string;
  placeholder?: string;
  className?: string;
  classNameWrap?: string;
  field?: FieldInputProps<any>;
  form?: FormikProps<any>;
  meta?: FieldMetaProps<any>;
  setFieldValue?: any;
  allowClear: boolean;
  options: OptionSelect[];
}

export const SelectComponent: FC<ISelectComponent> = ({
  field,
  form: { touched: formTouched, errors: formErrors, setFieldValue },
  label = '',
  placeholder = '',
  className = '',
  classNameWrap = '',
  options = [],
  allowClear = true,
  ...props
}) => {
  const { t } = useTranslation();
  const touched = formTouched[field.name];
  const errorMessage = formErrors[field.name];

  const handleChange = (values: any) => {
    setFieldValue(field.name, values);
  };

  return (
    <Box className={clsx('field-wrap', [classNameWrap] && classNameWrap)}>
      {label && <label className="field-wrap__label">{t(label)}</label>}
      <Select
        allowClear={allowClear}
        style={{ width: '100%' }}
        placeholder={t(placeholder)}
        onChange={handleChange}
        value={field.value}
        {...props}
      >
        {options.map((item: OptionSelect, index: number) => (
          <Option key={index} value={item.value} disabled={item.disabled}>
            {t(item.label)}
          </Option>
        ))}
      </Select>
      {errorMessage && touched && <span className="required">{errorMessage}</span>}
    </Box>
  );
};
