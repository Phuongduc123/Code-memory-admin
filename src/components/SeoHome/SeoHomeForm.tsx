import { Alert, Col, Divider, Row } from 'antd';
import Text from 'antd/lib/typography/Text';
import Title from 'antd/lib/typography/Title';
import { Field, useFormikContext } from 'formik';
import React, { FC, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import ButtonCommon from '../../common/Button';
import { InputComponent } from '../../common/Input';
import { TextAreaComponent } from '../../common/Input/TextAreaForm';
import { FieldUpload } from '../../common/Upload/FieldUpload';
import { fieldSeoHome, SeoHome } from '../../models/SeoHomeModel';
import { useAppSelector } from '../../redux/rootStore';
import { getSeoHomeSlice } from '../../redux/slices/seoHomeSlice';

export const SeoHomeForm: FC<{
  seoHomeFill?: SeoHome;
}> = ({ seoHomeFill }) => {
  const { t } = useTranslation();
  const { social, image } = fieldSeoHome;
  const { seoHome, isLoadingSubmit } = useAppSelector(getSeoHomeSlice);
  const { handleSubmit, setValues } = useFormikContext();

  useEffect(() => {
    // Init data form Seo Home
    if (seoHome?.id) {
      setValues({ ...seoHome, reason: '' });
    }
    if (seoHomeFill?.id) {
      setValues({ ...seoHomeFill, reason: '' });
    }
  }, [seoHome, seoHomeFill]);

  return (
    <Row gutter={[32, 32]} className="container-md">
      {seoHomeFill?.id && (
        <Col xs={24}>
          <Alert message={t('common.des_completed_extend')} banner closable />
        </Col>
      )}
      <Col xs={12}>
        <Title className="title-form" level={3}>
          {t('seo.info_basic')}
        </Title>
        <Field {...fieldSeoHome.siteName} component={InputComponent} />
        <Field {...fieldSeoHome.title} component={InputComponent} />
        <Field {...fieldSeoHome.titleEN} component={InputComponent} />
        <Field {...fieldSeoHome.description} component={InputComponent} />
        <Field {...fieldSeoHome.descriptionEN} component={InputComponent} />
        <Field {...fieldSeoHome.domain} component={InputComponent} />
        <Field {...fieldSeoHome.searchBoxUrl} component={InputComponent} />
        <Field {...fieldSeoHome.facebookChatPlugin} component={TextAreaComponent} />
        <Title className="title-form mt-30" level={3}>
          {t('seo.social')}
        </Title>
        <Field {...social.facebookAppId} component={InputComponent} />
        <Field {...social.facebookPageUrl} component={InputComponent} />
        <Field {...social.youtubeUrl} component={InputComponent} />
        <Field {...social.twitterUrl} component={InputComponent} />
        <Divider />
        <Field {...fieldSeoHome.reason} component={InputComponent} />

        <ButtonCommon loading={isLoadingSubmit} onClick={handleSubmit}>
          {t('common.txt_completed')}
        </ButtonCommon>
      </Col>
      <Col xs={12}>
        <Title className="title-form" level={3}>
          {t('seo.image')}
        </Title>
        <Field {...image.logoAlt} component={InputComponent} />
        <Field {...image.logoAltEN} component={InputComponent} />
        <Row>
          <Col xs={12}>
            <FieldUpload isLoadingForm={isLoadingSubmit} {...image.faviconUrlICO} crop={false} />
          </Col>
          <Col xs={12}>
            <FieldUpload isLoadingForm={isLoadingSubmit} {...image.faviconUrlJPG} crop={false} />
          </Col>
        </Row>
        <FieldUpload isLoadingForm={isLoadingSubmit} {...image.logo400x400} crop={false} />
        <FieldUpload fullWidth isLoadingForm={isLoadingSubmit} {...image.logo800x600} crop={false} />
        <FieldUpload fullWidth isLoadingForm={isLoadingSubmit} {...image.logo1280x720} crop={false} />
      </Col>
    </Row>
  );
};
