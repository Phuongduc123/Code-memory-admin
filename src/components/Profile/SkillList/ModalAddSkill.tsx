import Modal from 'antd/lib/modal/Modal';
import { Field, Formik, useFormikContext } from 'formik';
import React, { FC, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ValidateService } from '../../../services/validateService';
import { FieldCreateSkill } from '../../../models/FieldModel';
import { CreateSkillInput, SkillStatus } from '../../../models/SkillModel';
import { Col, Divider, Row } from 'antd';
import { ButtonForm } from '../../../common/Button/ButtonForm';
import { InputComponent } from '../../../common/Input';
import { SelectComponent } from '../../../common/Select';
import { SkillsComponent } from './SkillsComponent';
import { InputNumberComponent } from '../../../common/Input/InputNumber';
import { getSkillSlice, submitSkillSliceStart } from '../../../redux/slices/skillSlice';
import { useAppDispatch, useAppSelector } from '../../../redux/rootStore';
import { FETCH_POLICY } from '../../../constant';

interface SkillFormInterface {
  isLoadingForm?: boolean;
  setVisible?: any;
  visible?: boolean;
}

interface ModalAddSkillInterface {
  visible?: boolean;
  setVisible?: any;
  callbackSubmit?: any;
}

const SkillForm = ({ isLoadingForm, setVisible, visible }: SkillFormInterface) => {
  const { handleSubmit, handleReset, setValues } = useFormikContext();

  useEffect(() => {
    if (!visible) {
      handleReset();
    }
  }, [visible]);

  return (
    <Row className="skill-form form-label-md">
      <Field {...FieldCreateSkill.tagId} component={SkillsComponent} />
      <Field {...FieldCreateSkill.percent} max={100} min={0} component={InputNumberComponent} />
      <Field {...FieldCreateSkill.status} component={SelectComponent} />
      <Divider />
      <ButtonForm loading={isLoadingForm} onClickClose={() => setVisible(false)} onClickSubmit={handleSubmit} />
    </Row>
  );
};

export const ModalAddSkill = ({ visible, setVisible, callbackSubmit }: ModalAddSkillInterface) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const validatePJInput = new ValidateService(t).validateCreateSkillInput(FieldCreateSkill);
  const { isLoadingForm } = useAppSelector(getSkillSlice);
  const initialValues: CreateSkillInput = {
    percent: NaN,
    tagId: '',
    status: SkillStatus.ACTIVE,
  };

  const handleSubmitForm = async (values: CreateSkillInput) => {
    const data = { ...values };
    dispatch(
      submitSkillSliceStart({
        input: data,
        callback: () => callbackSubmit(),
      })
    );
  };

  return (
    <Modal visible={visible} onCancel={() => setVisible(false)} footer={null}>
      <Formik onSubmit={handleSubmitForm} validationSchema={validatePJInput} initialValues={initialValues}>
        <SkillForm visible={visible} isLoadingForm={isLoadingForm} setVisible={setVisible} />
      </Formik>
    </Modal>
  );
};
