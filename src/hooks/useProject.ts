import { helper } from './../services/helperService';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/rootStore';
import { getListPJStart, getPJSlice, setVisibleFormProject } from '../redux/slices/projectSlice';
import { SearchExpInput } from '../models/ExperienceModel';
import { Project, ProjectStatus, SearchProjectInput } from '../models/ProjectModel';
import { getListPJRequest } from '../graphql/ProjectRequest';

export const useSearchPJList = (
  dispatch: any
): {
  paramsSearch: SearchProjectInput;
  handleSearch: any;
  // // handleResetSearch: any;
  handleChangePage: any;
  handleSortByParams: any;
  getPageIndexNumber: any;
  handleGetListCategory: any;
} => {
  const [paramsSearch, setParamsSearch] = useState<SearchProjectInput>({
    key: '',
    status: [ProjectStatus.ACTIVE, ProjectStatus.INACTIVE],
    limit: 10,
    offset: 0,
  });

  const handleGetListCategory = () => {
    dispatch(getListPJStart({ input: paramsSearch }));
  };

  useEffect(() => {
    handleGetListCategory();
  }, [paramsSearch]);

  const getPageIndexNumber = () => {
    return paramsSearch.offset * paramsSearch.limit;
  };

  const handleSearch = (values: SearchProjectInput) => {
    setParamsSearch({ ...paramsSearch, key: values.key.trim(), status: values.status });
  };

  const handleChangePage = (page: number, pageSize: number) => {
    setParamsSearch({ ...paramsSearch, offset: page - 1, limit: pageSize });
  };

  const handleSortByParams = (pagination: any, filter: any, sorter: any) => {
    const { order, field } = sorter;
    setParamsSearch({ ...paramsSearch, orderBy: field, sortBy: helper.getOrderType(order) });
  };

  return {
    paramsSearch,
    getPageIndexNumber,
    handleGetListCategory,
    handleSearch,
    handleChangePage,
    handleSortByParams,
  };
};

export const useFormProject = (): {
  openFormModal: any;
  setVisible: any;
  visibleFormPJ: boolean;
  openFormEdit: any;
} => {
  const dispatch = useAppDispatch();
  const { visibleFormPJ } = useAppSelector(getPJSlice);

  const openFormModal = () => {
    dispatch(setVisibleFormProject({ visibleFormPJ: true }));
  };

  const setVisible = (value: boolean) => {
    dispatch(setVisibleFormProject({ visibleFormPJ: value }));
  };

  const openFormEdit = (pjDetail: Project) => () => {
    dispatch(setVisibleFormProject({ visibleFormPJ: true, pjDetail }));
  };

  return { openFormModal, visibleFormPJ, setVisible, openFormEdit };
};
