import React from 'react';
import { Skeleton, Timeline } from 'antd';
import Paragraph from 'antd/lib/typography/Paragraph';
import Text from 'antd/lib/typography/Text';
import Box from '../../common/Box';
import { useAppSelector } from '../../redux/rootStore';
import { getSeoHomeSlice } from '../../redux/slices/seoHomeSlice';
import { helper, HelperService } from '../../services/helperService';
import TableCommon from '../../common/Table';
import { useSeoHome, useSeoHomeHistory } from '../../hooks/useSeoHome';
import clsx from 'clsx';
import { useColumnDiff } from './ColumnDiff';
import { useTranslation } from 'react-i18next';

import { Tabs } from 'antd';
import { SeoHomeForm } from './SeoHomeForm';
import { Formik } from 'formik';

const { TabPane } = Tabs;

export const SeoHomeHistory = () => {
  const { onViewSeoHomeDetail, seoHomeDetail, onCallbackUpdateSeoHome } = useSeoHomeHistory();
  const { isLoadingList, seoHomeEntire } = useAppSelector(getSeoHomeSlice);

  const { t } = useTranslation();
  const { onSubmitSeoHome, validateSchema } = useSeoHome(false, onCallbackUpdateSeoHome);

  const columns = useColumnDiff(t, 'seo');

  return (
    <Box className="history-wrap">
      <Box className="time-line-left mt-30">
        {!isLoadingList ? (
          <Timeline mode="left">
            {seoHomeEntire.map((item, index) => (
              <Timeline.Item key={index}>
                <Paragraph onClick={onViewSeoHomeDetail(item)} className={clsx(seoHomeDetail.id === item.id && 'active', 'hover-action')}>
                  <Text className="time-label bold mr-8">{helper.convertTimeDisplay(item.createdAt)}:</Text>
                  {item.reason || 'INIT DATA'}
                </Paragraph>
              </Timeline.Item>
            ))}
          </Timeline>
        ) : (
          <Skeleton active />
        )}
      </Box>
      {seoHomeDetail.id && (
        <Box className="into-right">
          <Tabs defaultActiveKey="1">
            <TabPane tab={t('common.compare')} key="1">
              <TableCommon dataSource={seoHomeDetail.history} columns={columns} enablePagination={false} />
            </TabPane>
            <TabPane tab={t('common.detail')} key="2">
              <Formik validationSchema={validateSchema} onSubmit={onSubmitSeoHome} initialValues={{}}>
                <SeoHomeForm seoHomeFill={seoHomeDetail} />
              </Formik>
            </TabPane>
          </Tabs>
        </Box>
      )}
    </Box>
  );
};
