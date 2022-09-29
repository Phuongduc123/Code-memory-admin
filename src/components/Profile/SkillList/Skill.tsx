import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import React, { FC } from 'react';
import Checkbox from 'antd/lib/checkbox/Checkbox';
import { useTranslation } from 'react-i18next';
import { Button, Image, Input, InputNumber, Popover, Progress, Tooltip } from 'antd';
import { SkillStatus } from '../../../models/SkillModel';
import { useDispatch } from 'react-redux';
import { setCheckedSkill, setProficiency } from '../../../redux/slices/skillSlice';

const PROFICIENCY_CHANGE_PERCENT = 10;

export interface SkillInterface {
  data: any;
  index: number;
}

export const Skill: FC<SkillInterface> = ({ data, index }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const hanldeCheck = (data: any) => {
    if (data.target.checked) dispatch(setCheckedSkill({ status: SkillStatus.ACTIVE, index }));
    else dispatch(setCheckedSkill({ status: SkillStatus.INACTIVE, index }));
  };

  const addProficiency = (e) => {
    e.stopPropagation();
    if (data?.percent < 100) dispatch(setProficiency({ percent: data?.percent + PROFICIENCY_CHANGE_PERCENT<100?data?.percent + PROFICIENCY_CHANGE_PERCENT:100, index }));
  };

  const minusProficiency = (e) => {
    e.stopPropagation();
    if (data?.percent > 0) dispatch(setProficiency({ percent: data?.percent - PROFICIENCY_CHANGE_PERCENT>0?data?.percent - PROFICIENCY_CHANGE_PERCENT:0, index }));
  };

  const changeProficiency = (value) => {
    if(typeof value === 'number')
    dispatch(setProficiency({ percent: value, index }));
  }

  return (
    <div className="skill">
      <Image className="skill_thumbnail" src={data?.tagData.thumbnail} preview={false} />
      <div className="skill__content">
        <div className="show-in-profile">
          <Checkbox checked={data?.status === SkillStatus.ACTIVE} onChange={hanldeCheck}>
            {t('profile.show_in_profile')}
          </Checkbox>
        </div>
        <Tooltip title={data?.tagData.title}>
          <div className="name">{data?.tagData.title}</div>
        </Tooltip>

        <div className="btn-group">
          <Popover content={<InputNumber className="percent-input" value={data?.percent} onChange={changeProficiency} max={100} min={0} formatter={value => `${value}%`}/>} title={null}>
            <Progress percent={data?.percent} />
          </Popover>
          <Button.Group>
            <Button onClick={minusProficiency} icon={<MinusOutlined />} />
            <Button onClick={addProficiency} icon={<PlusOutlined />} />
          </Button.Group>
        </div>
      </div>
    </div>
  );
};
