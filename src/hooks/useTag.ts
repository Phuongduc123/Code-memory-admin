import { helper } from './../services/helperService';
import { useEffect, useState } from 'react';
import { SearchTagInput, Tag, TagStatus } from '../models/TagModel';
import { useAppDispatch, useAppSelector } from '../redux/rootStore';
import { getTagListSliceStart, getTagSlice, setVisibleFormTag } from '../redux/slices/tagSlice';

export const useSearchTagList = (
  dispatch: any
): {
  paramsSearch: SearchTagInput;
  handleSearch: any;
  // handleResetSearch: any;
  handleChangePage: any;
  handleSortByParams: any;
  getPageIndexNumber: any;
  handleGetListCategory: any;
} => {
  const [paramsSearch, setParamsSearch] = useState<SearchTagInput>({
    key: '',
    status: [TagStatus.ACTIVE, TagStatus.HIDE],
    limit: 10,
    offset: 0,
  });

  const handleGetListCategory = () => {
    dispatch(getTagListSliceStart({ input: paramsSearch }));
  };

  useEffect(() => {
    handleGetListCategory();
  }, [paramsSearch]);

  const handleSearch = (values: SearchTagInput) => {
    setParamsSearch({ ...paramsSearch, key: values.key.trim(), status: values.status });
  };

  const handleChangePage = (page: number, pageSize: number) => {
    setParamsSearch({ ...paramsSearch, offset: page - 1, limit: pageSize });
  };

  const handleSortByParams = (pagination: any, filter: any, sorter: any) => {
    const { order, field } = sorter;
    setParamsSearch({ ...paramsSearch, orderBy: field, sortBy: helper.getOrderType(order) });
  };

  const getPageIndexNumber = () => {
    return paramsSearch.offset * paramsSearch.limit;
  };

  return { paramsSearch, handleSearch, getPageIndexNumber, handleChangePage, handleSortByParams, handleGetListCategory };
};

export const useFormTag = (): {
  openFormModal: any;
  setVisible: any;
  openFormEdit: any;
  visibleFormTag: boolean;
} => {
  const dispatch = useAppDispatch();
  const { visibleFormTag } = useAppSelector(getTagSlice);

  const openFormModal = () => {
    dispatch(setVisibleFormTag({ visibleFormTag: true }));
  };

  const setVisible = (value: boolean) => {
    dispatch(setVisibleFormTag({ visibleFormTag: value }));
  };

  const openFormEdit = (tagDetail: Tag) => () => {
    dispatch(setVisibleFormTag({ visibleFormTag: true, tagDetail }));
  };

  return { openFormModal, visibleFormTag, setVisible, openFormEdit };
};
