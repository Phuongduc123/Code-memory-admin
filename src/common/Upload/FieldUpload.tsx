import { Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import ImgCrop from 'antd-img-crop';
import { AppSpinning } from '../Spining';
import { useFormikContext } from 'formik';
import Box from '../Box';
import clsx from 'clsx';
import { UploadFile } from 'antd/lib/upload/interface';
import UploadService from '../../services/uploadService';
import { helper } from '../../services/helperService';

const uploadService = new UploadService();
interface FieldUpload {
  name?: string;
  urlDefault?: string;
  classNameWrap?: string;
  limitSize?: number;
  label?: string;
  crop?: boolean;
  isLoadingForm?: boolean;
  center?: boolean;
  fullWidth?: boolean;
}

export const FieldUpload = ({
  name,
  limitSize = 0.5,
  fullWidth = false,
  center = false,
  crop = false,
  classNameWrap = '',
  isLoadingForm,
  label,
}: FieldUpload) => {
  const { errors, submitCount, values, setFieldValue } = useFormikContext();
  const fieldValue = helper.getValByStrKey(values, name);
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState('');

  const errorMessage = helper.getValByStrKey(errors, name);

  useEffect(() => {
    if (!!fieldValue && !!(fieldValue as UploadFile).type) {
      // Get this url from response in real world.
      uploadService.getBase64(fieldValue.originFileObj, (imageUrl: string) => {
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
      setFieldValue && uploadService.validateUploadImage(info.file, limitSize) && setFieldValue(name, info.file);
    }
  };
  const uploadButton = (
    <div>
      <UploadOutlined /> <div className="upload-dec">{t('common.upload_dec')}</div>
    </div>
  );

  const UploadChild = (
    <Upload
      listType="picture-card"
      className="upload__wrap"
      showUploadList={false}
      action="/"
      disabled={isLoadingForm}
      maxCount={1}
      beforeUpload={uploadService.beforeUpload(t, limitSize)}
      onChange={handleChange}>
      <AppSpinning loading={loading}>{imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}</AppSpinning>
    </Upload>
  );
  return (
    <Box className={clsx('field-wrap upload-filed', [classNameWrap] && classNameWrap, center && 'center-field', fullWidth && 'full-width')}>
      {label && <label className="field-wrap__label">{t(label)}</label>}
      {crop ? <ImgCrop rotate>{UploadChild}</ImgCrop> : UploadChild}
      {errorMessage && !!submitCount && <span className="required">{errorMessage}</span>}
    </Box>
  );
};
