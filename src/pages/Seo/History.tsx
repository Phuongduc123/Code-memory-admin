import { Divider, Tag } from 'antd';
import Title from 'antd/lib/typography/Title';
import React from 'react';
import Box from '../../common/Box';
import { useTranslation } from 'react-i18next';
import { SeoHomeHistory } from '../../components/SeoHome/SeoHomeHistory';

export const SeoHistory = () => {
  const { t } = useTranslation();

  return (
    <Box className="admin__content seo-page seo-history-page">
      <Title className="title-page">{t('seo.title_page_history')}</Title>
      <Divider />
      <SeoHomeHistory />
    </Box>
  );
};
