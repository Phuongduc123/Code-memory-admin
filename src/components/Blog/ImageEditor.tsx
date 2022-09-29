import { Col, Input, InputNumber, Row, Switch } from 'antd';
import Paragraph from 'antd/lib/typography/Paragraph';
import Text from 'antd/lib/typography/Text';
import { UploadFile } from 'antd/lib/upload/interface';
import clsx from 'clsx';
import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Box from '../../common/Box';
import { BlogUpload } from '../../common/Upload/BlogUpload';
import { FieldBlogProps, ImageLanguage } from '../../models/BlogModel';
import { ProcessUpload } from '../../models/LayoutModel';
import { useAppDispatch } from '../../redux/rootStore';
import { setUploadSliceClose, setUploadSliceStart } from '../../redux/slices/layoutSlice';
import { helper } from '../../services/helperService';
import { S3Storage, uploadService } from '../../services/uploadService';

export const ImageEditor: FC<FieldBlogProps> = ({ fieldValue, className, callbackChange }) => {
  const imageLanguage: ImageLanguage = helper.strToObj(fieldValue.language);
  const { t } = useTranslation();
  const [isUpload, setIsUpload] = useState<boolean>(false);
  const [isEditor, setIsEditor] = useState<boolean>(true);

  const dispatch = useAppDispatch();

  const handleUpload = async checked => {
    setIsUpload(checked);
    dispatch(setUploadSliceStart({ count: 1, visibleProcessModal: false } as ProcessUpload));
    const urlUpload = await uploadService.handleUpload(fieldValue.data, S3Storage.BLOG);
    dispatch(setUploadSliceClose({}));
    callbackChange({ data: urlUpload });
  };

  const onChangeUploadFile = async (file: UploadFile) => {
    callbackChange({ data: file });
    setIsUpload(false);
  };

  const onChangeUrlInput = ({ target: { value } }) => {
    callbackChange({ data: value });
    setIsUpload(true);
  };

  const onChangeLanguage = (fieldName: string) => value => {
    if (value?.target) {
      value = value.target.value;
    }
    const language = {
      ...imageLanguage,
      [fieldName]: value,
    };
    callbackChange({ language: JSON.stringify(language) });
  };

  const isShowButtonUpload = !isUpload && typeof fieldValue.data !== 'string' && fieldValue.data;

  return (
    <Box className={clsx('image-editor', [className] && className)}>
      <div className="mb-12 control-field">
        {isShowButtonUpload && (
          <>
            <Text className="mr-12">{t('blog.press_to_upload')}</Text>
            <Switch checked={isUpload} onChange={handleUpload} />
          </>
        )}
        <Text className="mr-12">{t('blog.switch_edit')}</Text>
        <Switch defaultChecked onChange={checked => setIsEditor(checked)} />
      </div>
      <BlogUpload
        disabled={!isEditor}
        classNameWrap="blog-field-image"
        callbackUpload={onChangeUploadFile}
        callbackChange={callbackChange}
        fieldValue={fieldValue}
      />
      {isEditor && (
        <>
          <Paragraph className="txt-center">{t('blog.upload_or_url')}</Paragraph>
          <Input className="mb-28" value={fieldValue.data} onChange={onChangeUrlInput} placeholder="Url image" />
          {imageLanguage && (
            <Row gutter={[8, 8]}>
              <Col xs={12}>
                <Box className="flx-center align-left">
                  <Paragraph className="mb-0" style={{ width: 60 }}>
                    {t('seo.description')}
                  </Paragraph>
                  <Input value={imageLanguage.alt} onChange={onChangeLanguage('alt')} placeholder="alt image" />
                </Box>
              </Col>
              <Col xs={4}>
                <Box className="flx-center align-left">
                  <Paragraph className="mb-0" style={{ width: 80 }}>
                    Width
                  </Paragraph>
                  <InputNumber
                    disabled={imageLanguage.autoWidth}
                    onChange={onChangeLanguage('width')}
                    value={imageLanguage.width}
                  />
                </Box>
              </Col>
              <Col xs={4}>
                <Box className="flx-center align-left">
                  <Paragraph className="mb-0" style={{ width: 80 }}>
                    Height
                  </Paragraph>
                  <InputNumber
                    onChange={onChangeLanguage('height')}
                    disabled={imageLanguage.autoWidth}
                    value={imageLanguage.height}
                  />
                </Box>
              </Col>
              <Col xs={4}>
                <Box className="flx-center align-left pt-4">
                  <Paragraph className="mb-0" style={{ width: 80 }}>
                    AutoWidth
                  </Paragraph>
                  <Switch onChange={onChangeLanguage('autoWidth')} checked={imageLanguage.autoWidth} />
                </Box>
              </Col>
            </Row>
          )}
        </>
      )}
    </Box>
  );
};
