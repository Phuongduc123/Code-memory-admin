import Title from 'antd/lib/typography/Title';
import React from 'react';
import { useAppSelector } from '../../redux/rootStore';
import Box from '../../common/Box';
import { useTranslation } from 'react-i18next';
import { Divider, Skeleton } from 'antd';
import { Formik } from 'formik';
import { getSeoHomeSlice } from '../../redux/slices/seoHomeSlice';
import { SeoHomeForm } from '../../components/SeoHome/SeoHomeForm';
import { useSeoHome } from '../../hooks/useSeoHome';

export const SeoPage = () => {
  const { seoHome, isLoadingSeoHome } = useAppSelector(getSeoHomeSlice);
  const { t } = useTranslation();
  const { onSubmitSeoHome, validateSchema } = useSeoHome();

  return (
    <Box className="admin__content seo-page">
      <Title className="title-page">{t('seo.title_page')}</Title>
      <Divider />
      {!isLoadingSeoHome ? (
        <Formik validationSchema={validateSchema} onSubmit={onSubmitSeoHome} initialValues={seoHome}>
          <SeoHomeForm />
        </Formik>
      ) : (
        <Skeleton active />
      )}
    </Box>
  );
};
