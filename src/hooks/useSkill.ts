import { Skill } from "../models/SkillModel";
import { useAppDispatch, useAppSelector } from "../redux/rootStore";
import { getSkillSlice, setVisibleFormSkill } from "../redux/slices/skillSlice";



export const useFormSkill = (): {
  openFormModal: any;
  setVisible: any;
  visibleFormSkill: boolean;
  openFormEdit: any
} => {
  const dispatch = useAppDispatch();
  const { visibleFormSkill } = useAppSelector(getSkillSlice);

  const openFormModal = () => {
    dispatch(setVisibleFormSkill({ visibleFormSkill: true }));
  };

  const setVisible = (value: boolean) => {
    dispatch(setVisibleFormSkill({ visibleFormSkill: value }));
  };

  const openFormEdit = (skillDetail: Skill) => () => {
    dispatch(setVisibleFormSkill({ visibleFormSkill: true, skillDetail }));
  };

  return { openFormModal, visibleFormSkill, setVisible, openFormEdit };
};