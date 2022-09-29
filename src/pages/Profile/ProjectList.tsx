import React from 'react';
import Box from '../../common/Box';
import { useAppDispatch, useAppSelector } from '../../redux/rootStore';
import { useTranslation } from 'react-i18next';
import Title from 'antd/lib/typography/Title';
import { Divider } from 'antd';
import { SearchTagListForm } from '../../components/Tag/SearchTagList';
import { Formik } from 'formik';
import TableCommon from '../../common/Table';
import ButtonCommon from '../../common/Button';
import { PlusOutlined } from '@ant-design/icons';
import { Project } from '../../models/ProjectModel';
import { DrawerProjectForm } from '../../components/Profile/ProjectList/DrawerProjectForm';
import { useFormProject, useSearchPJList } from '../../hooks/useProject';
import { getPJSlice } from '../../redux/slices/projectSlice';
import { helper } from '../../services/helperService';
import { TIME_FORMAT } from '../../constant';
import { EditOutlined } from '@ant-design/icons';
import { Status } from '../../components/Profile/Status';
import { Tech } from '../../components/Profile/ProjectList/Tech';

export const ProjectList = () => {
  const dispatch = useAppDispatch();
  const { dataPJs, total, isLoadingList } = useAppSelector(getPJSlice);
  const { openFormModal, visibleFormPJ, setVisible, openFormEdit } = useFormProject();
  const { t } = useTranslation();
  const {
    paramsSearch,
    handleSearch,
    getPageIndexNumber,
    handleGetListCategory,
    handleChangePage,
    handleSortByParams,
  } = useSearchPJList(dispatch);
  const { offset, limit } = paramsSearch;

  const column = (t, pageIndex, callbackEdit) => [
    {
      title: t('profile.serial'),
      render: (value: any, row: Project, index: number) => pageIndex + index + 1,
    },
    {
      title: t('profile.project_name_vn'),
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: t('profile.project_name_en'),
      dataIndex: 'nameEN',
      key: 'nameEN',
    },
    {
      title: t('profile.user_size'),
      dataIndex: 'size',
      key: 'size',
      render: (value: any, row: any) => <div>{`${value} ${t('profile.members')}`}</div>,
    },
    {
      title: t('profile.technology'),
      dataIndex: 'techsData',
      key: 'techsData',
      render: (value: any) => (
        <div className="tech-box">
          {value.map((value, index) => {
            return <Tech data={value} key={index} index={index} />;
          })}
        </div>
      ),
    },
    {
      title: t('profile.time'),
      dataIndex: 'time',
      key: 'time',
      render: (value: any, row: Project) => (
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
      render: (value: any, row: Project) => <Status status={value} />,
    },
    {
      title: t('profile.description_vn'),
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: t('profile.description_en'),
      dataIndex: 'descriptionEN',
      key: 'descriptionEN',
    },
    {
      title: t('profile.edit'),
      render: (_id: string, row: Project) => (
        <Box className="flx-center align-left">
          <ButtonCommon onClick={callbackEdit(row)} type="primary" shape="round" icon={<EditOutlined />} size="small" />
        </Box>
      ),
    },
  ];

  return (
    <Box className="admin__content project-list">
      <Title className="title-page">{t('menu.project_list')}</Title>
      <Divider />
      <Box className="flx-center space-center control-top">
        <Formik onSubmit={handleSearch} initialValues={paramsSearch}>
          <SearchTagListForm />
        </Formik>
        <ButtonCommon
          onClick={openFormModal}
          className="btn-tag-add"
          loading={isLoadingList}
          type="primary"
          shape="circle"
          icon={<PlusOutlined />}
          size="middle"
        />
      </Box>
      <Box className="project-list__table">
        <TableCommon
          onChangeTable={handleSortByParams}
          onChangePagination={handleChangePage}
          current={offset + 1}
          pageSize={limit}
          bordered
          loading={isLoadingList}
          scroll={{ x: 800 }}
          total={total}
          dataSource={dataPJs}
          columns={column(t, getPageIndexNumber(), openFormEdit)}
        />
      </Box>
      <DrawerProjectForm callbackSubmit={handleGetListCategory} visible={visibleFormPJ} setVisible={setVisible} />
    </Box>
  );
};
