import { Col, Divider, Drawer, Input, Row, Select, Spin } from 'antd';
import { CloseCircleOutlined } from '@ant-design/icons';
import Text from 'antd/lib/typography/Text';
import { Field, FieldInputProps, FieldMetaProps, Formik, FormikProps, useFormikContext } from 'formik';
import React, { FC, useEffect, useMemo, useRef, useState } from 'react';
import { TFunction, useTranslation } from 'react-i18next';
import Box from '../../../common/Box';
import { helper } from '../../../services/helperService';
import clsx from 'clsx';
import { valueFromAST } from 'graphql';
import _ from 'lodash';
import { SelectProps } from 'antd/es/select';
import debounce from 'lodash/debounce';
import { getListTagRequest } from '../../../graphql/tagRequest';
import { SearchTagInput, Tag, TagStatus } from '../../../models/TagModel';
import Avatar from 'antd/lib/avatar/avatar';
import { Tech } from './Tech';
import { ReactSortable } from 'react-sortablejs';

export interface TechsInterface {
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
  techsData?: Tag[];
}

export interface DebounceSelectProps<ValueType = any> extends Omit<SelectProps<ValueType>, 'options' | 'children'> {
  fetchOptions: (search: string) => Promise<ValueType[]>;
  debounceTimeout?: number;
}

export const TechsComponent = ({
  field,
  techsData,
  form: { touched: formTouched, errors: formErrors, setFieldValue, values },
  label = '',
  prefix = null,
  suffix = null,
  placeholder = '',
  passwordMode = false,
  className = '',
  classNameWrap = '',
  ...props
}: TechsInterface) => {
  const [options, setOptions] = useState([]);
  const [optionsChoosed, setOptionsChoosed] = useState([]);
  const [fetching, setFetching] = useState(false);
  const fetchRef = useRef(0);
  const { t } = useTranslation();

  useEffect(() => {
    if (techsData) {
      const techsDataCopy = techsData.map((a) => ({ ...a }));
      setOptionsChoosed([...techsDataCopy]);
    }
  }, [techsData]);

  const onPressEnter = (value, data) => {
    setFieldValue(field.name, [...field.value, data.key]);
    setOptionsChoosed([...optionsChoosed, data.title]);
  };

  const fetchUserList = async (value: string) => {
    const input: SearchTagInput = {
      key: value,
      status: [TagStatus.ACTIVE],
      limit: 10,
      offset: 0,
    };
    const options = await getListTagRequest(input);
    return options?.dataTags || [];
  };

  const debounceFetcher = useMemo(() => {
    const loadOptions = (value: string) => {
      fetchRef.current += 1;
      const fetchId = fetchRef.current;
      setOptions([]);
      setFetching(true);

      fetchUserList(value).then((newOptions) => {
        if (fetchId !== fetchRef.current) {
          return;
        }

        setOptions(newOptions);
        setFetching(false);
      });
    };

    return debounce(loadOptions, 800);
  }, []);

  const sortTechs = (newValue: any) => {
    const newFieldValue = newValue.map((value) => value.id);
    setOptionsChoosed(newValue);
    setFieldValue(field.name, newFieldValue);
  };

  return (
    <Box className={clsx('field-wrap', [classNameWrap] && classNameWrap)}>
      {label && <label className="field-wrap__label">{t(label)}</label>}
      <Select
        mode="multiple"
        placeholder="Select users"
        value={[]}
        onSelect={onPressEnter}
        labelInValue
        className={clsx('app-input-number', [className] && className)}
        filterOption={false}
        onSearch={debounceFetcher}
        notFoundContent={fetching ? <Spin size="small" /> : null}
        {...props}
        // options={options}
      >
        {options.map((value, index) => {
          return (
            <Select.Option title={value} value={value.title} key={value.id}>
              <div className="option">
                <Avatar size="small" src={value?.thumbnail} />
                {`       ${value.title}`}
              </div>
            </Select.Option>
          );
        })}
      </Select>

      <div className="tech-box">
        <ReactSortable setList={sortTechs} list={optionsChoosed as any}>
          {optionsChoosed.map((value, index) => {
            return (
              <Tech
                field={field}
                setFieldValue={setFieldValue}
                data={value}
                key={index}
                index={index}
                optionsChoosed={optionsChoosed}
                setOptionsChoosed={setOptionsChoosed}
              />
            );
          })}
        </ReactSortable>
      </div>
    </Box>
  );
};
