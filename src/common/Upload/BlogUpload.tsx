import { Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import React, { FC, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import ImgCrop from 'antd-img-crop';
import { AppSpinning } from '../Spining';
import Box from '../Box';
import clsx from 'clsx';
import UploadService from '../../services/uploadService';
import { helper } from '../../services/helperService';
import { BlogContent, ImageLanguage } from '../../models/BlogModel';

const uploadService = new UploadService();
interface BlogUpload {
  name?: string;
  urlDefault?: string;
  classNameWrap?: string;
  limitSize?: number;
  label?: string;
  crop?: boolean;
  isLoadingForm?: boolean;
  center?: boolean;
  fullWidth?: boolean;
  callbackUpload?: any;
  callbackChange?: any;
  disabled?: boolean;
  fieldValue?: BlogContent;
}

export const BlogUpload: FC<BlogUpload> = ({
  limitSize = 0.5,
  fullWidth = false,
  center = false,
  crop = false,
  classNameWrap = '',
  isLoadingForm,
  disabled = false,
  label,
  fieldValue: { data, language },
  callbackUpload,
  callbackChange,
}) => {
  const imgRef = useRef(null);
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(data);

  useEffect(() => {
    if (!!data && !!(data as any).type) {
      // Get this url from response in real world.
      uploadService.getBase64((data as any).originFileObj, (imageUrl: string) => {
        setTimeout(() => {
          setLoading(false);
          setImageUrl(imageUrl);
        }, 200);
      });
    } else {
      setImageUrl(data);
    }
  }, [data]);

  console.log(helper.strToObj(language));

  const handleOnLoad = () => {
    const imageLanguage: ImageLanguage = {
      alt: 'Anh mo ta',
      autoWidth: true,
      height: imgRef.current.naturalHeight,
      width: imgRef.current.naturalWidth,
    };
    callbackChange({
      language: JSON.stringify(imageLanguage),
    } as BlogContent);
  };

  const handleChange = (info: any) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done' || true) {
      callbackUpload && uploadService.validateUploadImage(info.file, limitSize) && callbackUpload(info.file);
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
      disabled={isLoadingForm || disabled}
      maxCount={1}
      beforeUpload={uploadService.beforeUpload(t, limitSize)}
      onChange={handleChange}>
      <AppSpinning loading={loading}>
        {imageUrl ? (
          <img ref={imgRef} src={imageUrl} onLoad={handleOnLoad} alt="avatar" style={{ width: '100%' }} />
        ) : (
          uploadButton
        )}
      </AppSpinning>
    </Upload>
  );
  return (
    <Box
      className={clsx(
        'field-wrap upload-filed',
        [classNameWrap] && classNameWrap,
        center && 'center-field',
        fullWidth && 'full-width'
      )}>
      {label && <label className="field-wrap__label">{t(label)}</label>}
      {crop ? <ImgCrop rotate>{UploadChild}</ImgCrop> : UploadChild}
    </Box>
  );
};
