import React, { useState } from 'react';
import Box from '../../common/Box';
import { useAppDispatch, useAppSelector } from '../../redux/rootStore';
import { useTranslation } from 'react-i18next';
import Title from 'antd/lib/typography/Title';
import { Divider } from 'antd';
import { SearchTagListForm } from '../../components/Tag/SearchTagList';
import { Formik } from 'formik';
import TableCommon from '../../common/Table';
import { useFormTag, useSearchTagList } from '../../hooks/useTag';
import { getTagSlice } from '../../redux/slices/tagSlice';
import { useColumnTag } from '../../components/Tag/ColumTagList';
import ButtonCommon from '../../common/Button';
import { PlusOutlined } from '@ant-design/icons';
import { DrawerTagForm } from '../../components/Tag/DrawerTagForm';

export const TagListPage = () => {
  const { dataTags, total, isLoadingList } = useAppSelector(getTagSlice);
  const { openFormModal, visibleFormTag, setVisible, openFormEdit } = useFormTag();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const { paramsSearch, handleSearch, getPageIndexNumber, handleGetListCategory, handleChangePage, handleSortByParams } = useSearchTagList(dispatch);
  const { offset, limit } = paramsSearch;

  const column = useColumnTag(t, getPageIndexNumber(), openFormEdit);

  return (
    <Box className="admin__content tag-list">
      <Title className="title-page">{t('menu.tag_child_list')}</Title>
      <Divider />
      <Box className="flx-center space-center control-top">
        <Formik onSubmit={handleSearch} initialValues={paramsSearch}>
          <SearchTagListForm />
        </Formik>
        <ButtonCommon
          onClick={openFormModal}
          className="btn-green"
          loading={isLoadingList}
          type="primary"
          shape="circle"
          icon={<PlusOutlined />}
          size="middle"
        />
      </Box>
      <Box className="tag-list__table">
        <TableCommon
          onChangeTable={handleSortByParams}
          onChangePagination={handleChangePage}
          current={offset + 1}
          pageSize={limit}
          bordered
          loading={isLoadingList}
          scroll={{ x: 800 }}
          total={total}
          dataSource={dataTags}
          columns={column}
        />
      </Box>
      <DrawerTagForm callbackSubmit={handleGetListCategory} visible={visibleFormTag} setVisible={setVisible} />
    </Box>
  );
};
