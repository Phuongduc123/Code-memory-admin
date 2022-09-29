import { helper } from './../services/helperService';
import { useEffect, useState } from "react";
import { Experience, ExperienceStatus, ExperienceType, SearchExpInput } from "../models/ExperienceModel";
import { useAppDispatch, useAppSelector } from "../redux/rootStore";
import { getExpSlice, getListExpStart, setVisibleFormExp } from "../redux/slices/experienceSlice";

export const useSearchExpList = (
  dispatch: any
): {
  paramsSearch: SearchExpInput;
  handleSearch: any;
  // // handleResetSearch: any;
  handleChangePage: any;
  handleSortByParams: any;
  getPageIndexNumber: any;
  handleGetListCategory: any;
} => {
  const [paramsSearch, setParamsSearch] = useState<SearchExpInput>({
    key: "",
    type: [ExperienceType.CERTIFICATE, ExperienceType.LEARN, ExperienceType.WORK],
    status: [ExperienceStatus.ACTIVE, ExperienceStatus.INACTIVE],
    limit: 10,
    offset: 0,
  });

  const handleGetListCategory = () => {
    dispatch(getListExpStart({ input: paramsSearch }));
  };

  useEffect(() => {
    handleGetListCategory();
  }, [paramsSearch]);

  const getPageIndexNumber = () => {
    return paramsSearch.offset * paramsSearch.limit;
  };

  const handleSearch = (values: SearchExpInput) => {
    setParamsSearch({ ...paramsSearch, key: values.key.trim(), status: values.status, type: values.type });
  };

  const handleChangePage = (page: number, pageSize: number) => {
    setParamsSearch({ ...paramsSearch, offset: page - 1, limit: pageSize });
  };

  const handleSortByParams = (pagination: any, filter: any, sorter: any) => {
    const { order, field } = sorter;
    setParamsSearch({ ...paramsSearch, orderBy: field, sortBy: helper.getOrderType(order) });
  };

  return { paramsSearch, getPageIndexNumber, handleGetListCategory, handleSearch, handleChangePage, handleSortByParams };
};



export const useFormExp = (): {
  openFormModal: any;
  setVisible: any;
  visibleFormExp: boolean;
  openFormEdit: any
} => {
  const dispatch = useAppDispatch();
  const { visibleFormExp } = useAppSelector(getExpSlice);

  const openFormModal = () => {
    dispatch(setVisibleFormExp({ visibleFormExp: true }));
  };

  const setVisible = (value: boolean) => {
    dispatch(setVisibleFormExp({ visibleFormExp: value }));
  };

  const openFormEdit = (expDetail: Experience) => () => {
    dispatch(setVisibleFormExp({ visibleFormExp: true, expDetail }));
  };

  return { openFormModal, visibleFormExp, setVisible, openFormEdit };
};