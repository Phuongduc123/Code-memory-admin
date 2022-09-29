import Title from 'antd/lib/typography/Title';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Box from '../../common/Box';
import { Button, Col, Divider, message, Row, Skeleton } from 'antd';
import { Skill } from '../../components/Profile/SkillList/Skill';
import { PlusOutlined } from '@ant-design/icons';
import { ModalAddSkill } from '../../components/Profile/SkillList/ModalAddSkill';
import { useFormSkill } from '../../hooks/useSkill';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../redux/rootStore';
import { getListSkillStart, getSkillSlice, updateSkill, updateSkillList } from '../../redux/slices/skillSlice';
import { showNotification } from '../../common/Utils';
import { ReactSortable } from 'react-sortablejs';
import { Skill as SkillModal } from '../../models/SkillModel';

export const SkillList = () => {
  const { openFormModal, visibleFormSkill, setVisible, openFormEdit } = useFormSkill();
  const email = useAppSelector((state) => state.loginSlice.user.email);
  const { dataSkills, isLoadingList, disableButton } = useAppSelector(getSkillSlice);
  const dispatch = useDispatch();

  const { t } = useTranslation();

  useEffect(() => {
    getListSkill()
  }, []);

  const getListSkill = () => {
    dispatch(getListSkillStart({ credential: email }));
  }

  const updateSkills = () => {
    dispatch(updateSkill({callback:(mess, type)=>showNotification(t(mess), type)}))
  }

  const sortSkillList = (dataSkills: any, sortable: any, x) => {
    if(sortable) dispatch(updateSkillList({dataSkills}))
  } 

  


  return (
    <Box className="admin__content skill-list">
      <Title className="title-page">{t('menu.skill_list')}</Title>
      <Divider />
      {!isLoadingList?<Box className="flx-center space-center control-top skill-list-item">
        <ReactSortable
          className="list"
          list={dataSkills as any}
          setList={sortSkillList}
        >
            {dataSkills.map((value, index) => {
            return (
              <div key={index} className="flx-center">
                <Skill data={value} index={index}/>
              </div>
            );
          })}
          </ReactSortable>
      </Box>:<Skeleton active />}
      <Box className="btn-save">
        <Button disabled={disableButton} loading={isLoadingList} onClick={updateSkills} type="primary">{t('profile.save')}</Button>
        <Button loading={isLoadingList} onClick={openFormModal} type="primary">{t('profile.add')}</Button>
      </Box>
      <ModalAddSkill visible={visibleFormSkill} setVisible={setVisible} callbackSubmit={getListSkill}/>
    </Box>
  );
};
