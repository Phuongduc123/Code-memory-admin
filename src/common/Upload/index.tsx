import { Upload, message, Spin } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import React, { Fragment, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import ImgCrop from 'antd-img-crop';
import { AppSpinning } from '../Spining';
import { useFormikContext } from 'formik';
import Box from '../Box';
import clsx from 'clsx';
import { UploadFile } from 'antd/lib/upload/interface';

function getBase64(img: any, callback: any) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

const isValidFormat = (type: string) => {
  return type === 'image/jpeg' || type === 'image/png' || type === 'image/svg+xml' || type === 'image/heic';
};

const beforeUpload = (t: any) => (file: any) => {
  const isJpgOrPng = isValidFormat(file.type);
  if (!isJpgOrPng) {
    message.error(t('message.upload_format_invalid'));
    return false;
  }
  const isLt1M = file.size / 1024 / 1024 <= 1;
  if (!isLt1M) {
    message.error(t('message.upload_limit_size', { size: 1 }));
    return false;
  }
  return isJpgOrPng && isLt1M;
};

interface IUploadComponent {
  name?: string;
  setFieldValue?: any;
  urlDefault?: string;
  classNameWrap?: string;
  crop?: boolean;
  isLoadingForm?: boolean;
}

export const UploadComponent = ({ name, crop = false, classNameWrap = '', isLoadingForm }: IUploadComponent) => {
  const { errors, submitCount, values, setFieldValue } = useFormikContext();
  const fieldValue = values[name];
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState('');

  const errorMessage = errors[name];

  useEffect(() => {
    if (!!fieldValue && !!(fieldValue as UploadFile).type) {
      // Get this url from response in real world.
      getBase64(fieldValue.originFileObj, (imageUrl: string) => {
        setTimeout(() => {
          setLoading(false);
          setImageUrl(imageUrl);
        }, 200);
      });
    } else {
      setImageUrl(fieldValue);
    }
  }, [fieldValue]);

  const handleChange = (info: any) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done' || true) {
      setFieldValue && isValidFormat(info.file.type) && setFieldValue(name, info.file);
    }
  };
  const uploadButton = (
    <div>
      <UploadOutlined /> <div className="upload-dec">{t('common.upload_dec')}</div>
    </div>
  );
  const UploadChild = (
    <Box className={clsx('field-wrap', [classNameWrap] && classNameWrap)}>
      <Upload
        name="avatar"
        listType="picture-card"
        showUploadList={false}
        action="/"
        disabled={isLoadingForm}
        method="put"
        maxCount={1}
        beforeUpload={beforeUpload(t)}
        onChange={handleChange}>
        <AppSpinning loading={loading}>{imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}</AppSpinning>
      </Upload>
      {errorMessage && !!submitCount && <span className="required">{errorMessage}</span>}
    </Box>
  );
  return crop ? <ImgCrop rotate>{UploadChild}</ImgCrop> : UploadChild;
};
