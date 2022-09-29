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
import { ReactSortable } from 'react-sortablejs';

export interface SkillsInterface {
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

export const SkillsComponent = ({
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
}: SkillsInterface) => {
  const [options, setOptions] = useState([]);
  const [fetching, setFetching] = useState(false);
  const fetchRef = useRef(0);
  const { t } = useTranslation();

  const onPressEnter = (value, data) => {
    setFieldValue(field.name, data.key);
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

  return (
    <Box className={clsx('field-wrap', [classNameWrap] && classNameWrap)}>
      {label && <label className="field-wrap__label">{t(label)}</label>}
      <Select
        onFocus={() => debounceFetcher('')}
        showSearch
        placeholder={t(placeholder)}
        onSelect={onPressEnter}
        labelInValue
        className={clsx('app-input-number', [className] && className)}
        filterOption={false}
        onSearch={debounceFetcher}
        notFoundContent={fetching ? <Spin size="small" /> : null}
        {...props}
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
    </Box>
  );
};
