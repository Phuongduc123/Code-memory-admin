import { Col, Divider, Drawer, Row } from 'antd';
import Text from 'antd/lib/typography/Text';
import { Field, Formik, useFormikContext } from 'formik';
import React, { useEffect } from 'react';
import { TFunction, useTranslation } from 'react-i18next';
import Box from '../../../common/Box';
import { InputComponent } from '../../../common/Input';
import { TextAreaComponent } from '../../../common/Input/TextAreaForm';
import { SelectComponent } from '../../../common/Select';
import { fieldCreateExperience } from '../../../models/FieldModel';
import { ButtonForm } from '../../../common/Button/ButtonForm';
import { ValidateService } from '../../../services/validateService';
import { useAppDispatch, useAppSelector } from '../../../redux/rootStore';
import { getTagSlice } from '../../../redux/slices/tagSlice';
import { FETCH_POLICY } from '../../../constant';
import UploadService, { S3Storage } from '../../../services/uploadService';
import { CreateExpInput, ExperienceStatus, ExperienceType } from '../../../models/ExperienceModel';
import { DateComponent } from '../../../common/DatePicker/DatePickerForm';
import { FieldUpload } from '../../../common/Upload/FieldUpload';
import { getExpSlice, submitExpSliceStart } from '../../../redux/slices/experienceSlice';
import { setUploadSliceStart } from '../../../redux/slices/layoutSlice';
import { ProcessUpload } from '../../../models/LayoutModel';

const ExperienceForm = ({
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
  const { expDetail } = useAppSelector(getExpSlice);

  useEffect(() => {
    if (!!expDetail.id) {
      setValues({
        id: expDetail.id,
        nameVN: expDetail.nameVN,
        nameEN: expDetail.nameEN,
        workType: expDetail.workType,
        position: expDetail.position,
        descriptionVN: expDetail.descriptionVN,
        descriptionEN: expDetail.descriptionEN,
        startTime: parseInt(expDetail.startTime),
        endTime: parseInt(expDetail.startTime),
        status: expDetail.status,
        thumbnail: expDetail.thumbnail,
      } as CreateExpInput);
    } else {
      handleReset();
    }
  }, [expDetail]);

  useEffect(() => {
    if (!visible) {
      handleReset();
    }
  }, [visible]);

  return (
    <Row className="tag-form form-label-md">
      <Box className="upload__field center-block">
        <Text className="tag-upload-dec">{t('profile.label_thumbnail')}</Text>
        <FieldUpload isLoadingForm={isLoadingForm} name={fieldCreateExperience.thumbnail.name} crop={true} />
      </Box>
      <Field {...fieldCreateExperience.nameVN} component={InputComponent} />
      <Field {...fieldCreateExperience.nameEN} component={InputComponent} />
      <Field {...fieldCreateExperience.workType} allowClear={false} component={SelectComponent} />
      <Field {...fieldCreateExperience.position} component={InputComponent} />
      <Field {...fieldCreateExperience.descriptionVN} component={TextAreaComponent} />
      <Field {...fieldCreateExperience.descriptionEN} component={TextAreaComponent} />
      <Row gutter={[16, 16]}>
        <Col>
          <Field {...fieldCreateExperience.startTime} component={DateComponent} />
        </Col>
        <Col>
          <Field {...fieldCreateExperience.endTime} component={DateComponent} />
        </Col>
      </Row>
      <Field {...fieldCreateExperience.status} allowClear={false} component={SelectComponent} />
      <Divider />
      <ButtonForm loading={isLoadingForm} onClickClose={onCloseForm} onClickSubmit={handleSubmit} />
    </Row>
  );
};

export const DrawerExperienceForm = ({
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
  const validateExpInput = new ValidateService(t).validateCreateExperienceInput(fieldCreateExperience);

  const initialValues: CreateExpInput = {
    id: '',
    nameVN: '',
    nameEN: '',
    workType: ExperienceType.CERTIFICATE,
    position: '',
    descriptionVN: '',
    descriptionEN: '',
    startTime: '',
    endTime: '',
    status: ExperienceStatus.ACTIVE,
    thumbnail: '',
  };

  const onCloseDrawer = () => {
    setVisible(false);
  };

  const handleSubmitForm = async (values: CreateExpInput) => {
    const uploadService = new UploadService();
    dispatch(setUploadSliceStart({ count: 1, visibleProcessModal: false } as ProcessUpload));
    const thumbnail = await uploadService.handleUpload(values.thumbnail, S3Storage.WORK);
    const data = { ...values, startTime: values.startTime.toString(), endTime: values.endTime.toString(), thumbnail };

    dispatch(
      submitExpSliceStart({
        input: data,
        callback: () => callbackSubmit(FETCH_POLICY.NO_CACHE),
      })
    );
  };

  return (
    <Drawer
      title={t('profile.add_experience')}
      maskClosable={false}
      width={520}
      closable={!isLoadingForm}
      onClose={onCloseDrawer}
      visible={visible}
    >
      <Formik onSubmit={handleSubmitForm} validationSchema={validateExpInput} initialValues={initialValues}>
        <ExperienceForm visible={visible} isLoadingForm={isLoadingForm} t={t} onCloseForm={onCloseDrawer} />
      </Formik>
    </Drawer>
  );
};
