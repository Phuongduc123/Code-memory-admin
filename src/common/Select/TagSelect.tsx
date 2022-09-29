import { Select, Spin, Switch } from 'antd';
import { SelectProps } from 'antd/es/select';
import debounce from 'lodash/debounce';
import { FC, ReactNode, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import React from 'react';
import { getListTagRequest } from '../../graphql/tagRequest';
import { SearchTagOutput, Tag, TagStatus } from '../../models/TagModel';
import { useAppDispatch } from '../../redux/rootStore';
import { setNotifySlice } from '../../redux/slices/layoutSlice';
import { NotifySystem, TypeNotify } from '../../models/LayoutModel';
import { BoxIconAndName } from '../../components/Tag/BoxIconAndName';
import { FieldInputProps, FormikProps } from 'formik';
import Box from '../Box';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';
import Text from 'antd/lib/typography/Text';
import ButtonCommon from '../Button';
import { DrawerTagForm } from '../../components/Tag/DrawerTagForm';
import { PlusOutlined } from '@ant-design/icons';
import { useFormTag } from '../../hooks/useTag';
import { ReactSortable } from 'react-sortablejs';

export interface DebounceSelectProps<ValueType = any> extends Omit<SelectProps<ValueType>, 'options' | 'children'> {
  fetchOptions: (search: string, dispatch: any) => Promise<ValueType[]>;
  debounceTimeout?: number;
  setOptions?: any;
  options?: ValueType[];
}

function DebounceSelect<ValueType extends { key?: string; label: ReactNode; value: string | number } = any>({
  fetchOptions,
  debounceTimeout = 800,
  setOptions,
  options,
  ...props
}: DebounceSelectProps) {
  const dispatch = useAppDispatch();
  const [fetching, setFetching] = useState(false);
  // const [options, setOptions] = useState<ValueType[]>([]);
  const fetchRef = useRef(0);

  const debounceFetcher = useMemo(() => {
    const loadOptions = (value: string) => {
      fetchRef.current += 1;
      const fetchId = fetchRef.current;
      setOptions([]);
      setFetching(true);

      fetchOptions(value, dispatch).then(newOptions => {
        if (fetchId !== fetchRef.current) {
          // for fetch callback order
          return;
        }

        setOptions(newOptions);
        setFetching(false);
      });
    };

    return debounce(loadOptions, debounceTimeout);
  }, [fetchOptions, debounceTimeout]);

  return (
    <Select<ValueType>
      labelInValue
      filterOption={false}
      onSearch={debounceFetcher}
      notFoundContent={fetching ? <Spin size="small" /> : null}
      {...props}
      options={options}
    />
  );
}
interface SelectValue {
  key?: string;
  label: string | ReactNode;
  value: string;
}

async function fetchUserList(username: string, dispatch: any): Promise<SelectValue[]> {
  try {
    const data: SearchTagOutput = await getListTagRequest({
      key: username,
      status: [TagStatus.ACTIVE],
      limit: 10,
      offset: 0,
    });
    return data.dataTags.map((item: Tag) => ({
      label: (
        <BoxIconAndName
          classNameWrap="handle-drag"
          size={25}
          name={item.title}
          thumbnail={item.thumbnail}
          updatedAt={item.updatedAt}
        />
      ),
      value: item.id,
    }));
  } catch (error: any) {
    dispatch(
      setNotifySlice({
        messageNotify: error?.message,
        typeNotify: TypeNotify.ERROR,
        createTime: new Date().getTime(),
      } as NotifySystem)
    );
  }
}

export const FiledTagSelect: FC<{
  field?: FieldInputProps<any>;
  form?: FormikProps<any>;
  label?: string;
  placeholder?: string;
  classNameWrap?: string;
}> = ({ field: { value, name }, form: { setFieldValue }, classNameWrap, placeholder, label }) => {
  const [sortMode, setSortMode] = useState<boolean>(false);
  const [stateValue, setStateValue] = useState([]);
  const { t } = useTranslation();
  const [options, setOptions] = useState<SelectValue[]>([]);

  const placeHolderDefault = !!label ? t('message.placeholder_default', { label: t(label) }) : '';

  const onChangeList = (newValue: Array<any>) => {
    setFieldValue(name, newValue);
  };

  useEffect(() => {
    setValueForm(stateValue);
  }, [stateValue]);

  const setValueForm = useCallback(
    debounce(value => {
      setFieldValue(name, value);
    }, 1000),
    []
  );

  const { openFormModal, visibleFormTag, setVisible } = useFormTag();

  return (
    <Box className={clsx('field-wrap field-select-tag', [classNameWrap] && classNameWrap)}>
      {label && <label className="field-wrap__label">{t(label)}</label>}
      <Box className="flx-center align-left mb-12">
        {!!value.length && (
          <>
            <Text className="mr-12">{t('tag.sort_mode')}</Text>
            <Switch checked={sortMode} className="mr-12" onChange={checked => setSortMode(checked)} />
          </>
        )}
        <ButtonCommon
          onClick={openFormModal}
          className="btn-green"
          type="primary"
          shape="circle"
          icon={<PlusOutlined />}
          size="middle"
        />
      </Box>
      {sortMode ? (
        <ReactSortable
          handle=".handle-drag"
          className="sort-wrapper flx-center align-left"
          list={value as any}
          setList={onChangeList}>
          {value.map((item, index) => (
            <Box className="item-data" key={index}>
              {item.label}
            </Box>
          ))}
        </ReactSortable>
      ) : (
        <DebounceSelect
          mode="multiple"
          value={stateValue}
          size="large"
          placeholder={!!placeholder ? t(placeholder) : placeHolderDefault}
          fetchOptions={fetchUserList}
          onChange={setStateValue}
          options={options}
          setOptions={setOptions}
          style={{ width: '100%' }}
        />
      )}

      <DrawerTagForm callbackSubmit={null} visible={visibleFormTag} setVisible={setVisible} />
    </Box>
  );
};
