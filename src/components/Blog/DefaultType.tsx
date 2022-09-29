import Text from 'antd/lib/typography/Text';
import clsx from 'clsx';
import { useFormikContext } from 'formik';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import Box from '../../common/Box';
import { BlogContent, BlogContentType } from '../../models/BlogModel';
import { Select } from 'antd';
import { draftService } from '../../services/draftService';
import _ from 'lodash';
import { ListLanguage } from '../../constant/listLanguage';

const { Option } = Select;

const DATA_TYPE: Array<{ label: string; value: BlogContentType }> = [
  { label: 'blog.code', value: BlogContentType.CODE },
  {
    label: 'blog.editor',
    value: BlogContentType.EDITOR,
  },
  {
    label: 'blog.image',
    value: BlogContentType.IMAGE,
  },
  {
    label: 'blog.iframe',
    value: BlogContentType.IFRAME,
  },
];

export const dataBlogDefault = {
  [BlogContentType.EDITOR]: draftService.htmlToDraftBlocks(''),
  [BlogContentType.CODE]: '',
};

export const DefaultType: FC<{
  className?: string;
  fieldValue?: BlogContent;
  callbackChange?: any;
}> = ({ className, fieldValue, callbackChange }) => {
  const { t } = useTranslation();

  const onChangeType = (value: any) => {
    callbackChange({ type: value, data: dataBlogDefault[value], language: 'js' });
  };

  const onChangeLanguageCode = (language: any) => {
    callbackChange({ language });
  };

  return (
    <Box className={clsx('default-type flx-center align-left mb-8', [className] && className)}>
      <Text className="mr-12">{t('blog.dec_select_type')}</Text>
      <Select value={fieldValue.type} style={{ width: 120 }} onChange={onChangeType}>
        {DATA_TYPE.map((item, index) => (
          <Option key={index} value={item.value}>
            {t(item.label)}
          </Option>
        ))}
      </Select>
      {fieldValue.type === BlogContentType.CODE && (
        <>
          <Text className="m-lr-12">{t('blog.dec_select_type')}</Text>
          <Select
            showSearch
            value={fieldValue.language}
            style={{ width: 200 }}
            onChange={onChangeLanguageCode}
            filterOption={(input, option) => {
              return option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
            }}>
            {_.map(ListLanguage, (value, key) => {
              return (
                <Option key={key} value={key}>
                  {value}
                </Option>
              );
            })}
          </Select>
        </>
      )}
    </Box>
  );
};
