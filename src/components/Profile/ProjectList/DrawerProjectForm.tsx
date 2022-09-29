import { Col, Divider, Drawer, Row } from 'antd';
import { Field, Formik, useFormikContext } from 'formik';
import React, { useEffect } from 'react';
import { TFunction, useTranslation } from 'react-i18next';
import { InputComponent } from '../../../common/Input';
import { TextAreaComponent } from '../../../common/Input/TextAreaForm';
import { SelectComponent } from '../../../common/Select';
import { fieldCreateProject } from '../../../models/FieldModel';
import { ButtonForm } from '../../../common/Button/ButtonForm';
import { ValidateService } from '../../../services/validateService';
import { useAppDispatch, useAppSelector } from '../../../redux/rootStore';
import { getTagSlice } from '../../../redux/slices/tagSlice';
import { FETCH_POLICY } from '../../../constant';
import { DateComponent } from '../../../common/DatePicker/DatePickerForm';
import { InputNumberComponent } from '../../../common/Input/InputNumber';
import { CreatePJInput, ProjectStatus } from '../../../models/ProjectModel';
import { TechsComponent } from './TechsComponent';
import { getPJSlice, submitPJSliceStart } from '../../../redux/slices/projectSlice';

const ProjectForm = ({
  t,
  onCloseForm,
  isLoadingForm,
  visible,
}: {
  t: TFunction;
  onCloseForm: any;
  visible: boolean;
  isLoadingForm: boolean;
}) => {
  const { handleSubmit, handleReset, setValues } = useFormikContext();
  const { pjDetail } = useAppSelector(getPJSlice);

  useEffect(() => {
    if (!!pjDetail.id) {
      setValues({
        id: pjDetail.id,
        name: pjDetail.name,
        nameEN: pjDetail.nameEN,
        size: pjDetail.size,
        techs: pjDetail.techs,
        description: pjDetail.description,
        descriptionEN: pjDetail.descriptionEN,
        startTime: parseInt(pjDetail.startTime),
        endTime: parseInt(pjDetail.startTime),
        status: pjDetail.status,
      } as CreatePJInput);
    } else {
      handleReset();
    }
  }, [pjDetail]);

  useEffect(() => {
    if (!visible) {
      handleReset();
    }
  }, [visible]);

  return (
    <Row className="tag-form form-label-md">
      <Field {...fieldCreateProject.name} component={InputComponent} />
      <Field {...fieldCreateProject.nameEN} component={InputComponent} />
      <Field {...fieldCreateProject.size} component={InputNumberComponent} />
      <Field {...fieldCreateProject.techs} techsData={pjDetail.techsData} component={TechsComponent} />
      <Field {...fieldCreateProject.description} component={TextAreaComponent} />
      <Field {...fieldCreateProject.descriptionEN} component={TextAreaComponent} />
      <Row gutter={[16, 16]}>
        <Col>
          <Field {...fieldCreateProject.startTime} component={DateComponent} />
        </Col>
        <Col>
          <Field {...fieldCreateProject.endTime} component={DateComponent} />
        </Col>
      </Row>
      <Field {...fieldCreateProject.status} allowClear={false} component={SelectComponent} />
      <Divider />
      <ButtonForm loading={isLoadingForm} onClickClose={onCloseForm} onClickSubmit={handleSubmit} />
    </Row>
  );
};

export const DrawerProjectForm = ({
  visible,
  setVisible,
  callbackSubmit,
}: {
  visible: boolean;
  setVisible: any;
  callbackSubmit: any;
}) => {
  const { isLoadingForm } = useAppSelector(getTagSlice);
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const validatePJInput = new ValidateService(t).validateCreateProjectInput(fieldCreateProject);

  const initialValues: CreatePJInput = {
    id: '',
    name: '',
    nameEN: '',
    size: 4,
    techs: [],
    description: '',
    descriptionEN: '',
    startTime: '',
    endTime: '',
    status: ProjectStatus.ACTIVE,
  };

  const onCloseDrawer = () => {
    setVisible(false);
  };

  const handleSubmitForm = async (values: CreatePJInput) => {
    const data = { ...values, startTime: values.startTime.toString(), endTime: values.endTime.toString() };
    dispatch(
      submitPJSliceStart({
        input: data,
        callback: () => callbackSubmit(FETCH_POLICY.NO_CACHE),
      })
    );
  };

  return (
    <Drawer
      title={t('profile.add_project')}
      maskClosable={false}
      width={520}
      closable={!isLoadingForm}
      onClose={onCloseDrawer}
      visible={visible}
    >
      <Formik onSubmit={handleSubmitForm} validationSchema={validatePJInput} initialValues={initialValues}>
        <ProjectForm visible={visible} isLoadingForm={isLoadingForm} t={t} onCloseForm={onCloseDrawer} />
      </Formik>
    </Drawer>
  );
};
