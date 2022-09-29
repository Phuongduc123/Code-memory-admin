import React from 'react';
import Box from '../../common/Box';
import { useAppDispatch, useAppSelector } from '../../redux/rootStore';
import { useTranslation } from 'react-i18next';
import Title from 'antd/lib/typography/Title';
import { Divider } from 'antd';
import { Formik } from 'formik';
import TableCommon from '../../common/Table';
import ButtonCommon from '../../common/Button';
import { PlusOutlined } from '@ant-design/icons';
import { SearchListForm } from '../../components/Profile/ExperienceList/SearchList';
import { DrawerExperienceForm } from '../../components/Profile/ExperienceList/DrawerExperienceForm';
import { useFormExp, useSearchExpList } from '../../hooks/useExperience';
import { getExpSlice } from '../../redux/slices/experienceSlice';
import { TIME_FORMAT } from '../../constant';
import { Experience } from '../../models/ExperienceModel';
import { Status } from '../../components/Profile/Status';
import { TypeExp } from '../../components/Profile/ExperienceList/TypeExp';
import { EditOutlined } from '@ant-design/icons';
import { BoxIconAndName } from '../../components/Tag/BoxIconAndName';
import { helper } from '../../services/helperService';

export const ExperienceList = () => {
  const { t } = useTranslation();
  const { dataExps, isLoadingList, total } = useAppSelector(getExpSlice);
  const { openFormModal, visibleFormExp, setVisible, openFormEdit } = useFormExp();
  const dispatch = useAppDispatch();
  const {
    paramsSearch,
    handleGetListCategory,
    getPageIndexNumber,
    handleSearch,
    handleChangePage,
    handleSortByParams,
  } = useSearchExpList(dispatch);
  const { offset, limit } = paramsSearch;

  const column = (t, pageIndex, callbackEdit) => [
    {
      title: t('profile.serial'),
      render: (value: any, row: Experience, index: number) => pageIndex + index + 1,
    },
    {
      title: t('profile.work_place_name_vn'),
      dataIndex: 'nameVN',
      key: 'nameVN',
      render: (value: any, row: Experience) => (
        <BoxIconAndName name={value} thumbnail={row.thumbnail} updatedAt={row.updatedAt} />
      ),
    },
    {
      title: t('profile.work_place_name_en'),
      dataIndex: 'nameEN',
      key: 'nameEN',
      render: (value: any, row: Experience) => (
        <BoxIconAndName name={value} thumbnail={row.thumbnail} updatedAt={row.updatedAt} />
      ),
    },
    {
      title: t('profile.type'),
      dataIndex: 'workType',
      key: 'workType',
      render: (value: any, row: Experience) => <TypeExp status={value} />,
    },
    {
      title: t('profile.position'),
      dataIndex: 'position',
      key: 'position',
    },
    {
      title: t('profile.time'),
      dataIndex: 'time',
      key: 'time',
      render: (value: any, row: Experience) => (
        <div>
          {helper.convertTimeDisplay(parseInt(row.startTime), TIME_FORMAT.DD_MM_YY)} -{' '}
          {helper.convertTimeDisplay(parseInt(row.startTime), TIME_FORMAT.DD_MM_YY)}
        </div>
      ),
    },
    {
      title: t('profile.status'),
      dataIndex: 'status',
      key: 'status',
      render: (value: any, row: Experience) => <Status status={value} />,
    },
    {
      title: t('profile.description_vn'),
      dataIndex: 'descriptionVN',
      key: 'descriptionVN',
    },
    {
      title: t('profile.description_en'),
      dataIndex: 'descriptionEN',
      key: 'descriptionEN',
    },
    {
      title: t('profile.edit'),
      render: (_id: string, row: Experience) => (
        <Box className="flx-center align-left">
          <ButtonCommon onClick={callbackEdit(row)} type="primary" shape="round" icon={<EditOutlined />} size="small" />
        </Box>
      ),
    },
  ];

  return (
    <Box className="admin__content experience-list">
      <Title className="title-page">{t('profile.experience_list')}</Title>
      <Divider />
      <Box className="flx-center space-center control-top">
        <Formik onSubmit={handleSearch} initialValues={paramsSearch}>
          <SearchListForm />
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
      <Box className="experience-list__table">
        <TableCommon
          onChangeTable={handleSortByParams}
          onChangePagination={handleChangePage}
          current={offset + 1}
          pageSize={limit}
          bordered
          loading={isLoadingList}
          scroll={{ x: 800 }}
          total={total}
          dataSource={dataExps}
          columns={column(t, getPageIndexNumber(), openFormEdit)}
        />
      </Box>
      <DrawerExperienceForm callbackSubmit={handleGetListCategory} visible={visibleFormExp} setVisible={setVisible} />
    </Box>
  );
};
