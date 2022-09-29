import { Divider, Drawer, Row } from 'antd';
import Text from 'antd/lib/typography/Text';
import { Field, Formik, useFormikContext } from 'formik';
import React, { useEffect } from 'react';
import { TFunction, useTranslation } from 'react-i18next';
import Box from '../../common/Box';
import { InputComponent } from '../../common/Input';
import { TextAreaComponent } from '../../common/Input/TextAreaForm';
import { SelectComponent } from '../../common/Select';
import { UploadComponent } from '../../common/Upload';
import { fieldCreateTag } from '../../models/FieldModel';
import { CreateTagInput, TagStatus } from '../../models/TagModel';
import { ButtonForm } from '../../common/Button/ButtonForm';
import { ValidateService } from '../../services/validateService';
import { useAppDispatch, useAppSelector } from '../../redux/rootStore';
import { getTagSlice, submitTagSliceStart } from '../../redux/slices/tagSlice';
import { FETCH_POLICY } from '../../constant';
import UploadService, { S3Storage } from '../../services/uploadService';
import { setUploadSliceStart } from '../../redux/slices/layoutSlice';
import { ProcessUpload } from '../../models/LayoutModel';
import { FieldUpload } from '../../common/Upload/FieldUpload';

const TagForm = ({
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
  const { tagDetail } = useAppSelector(getTagSlice);

  useEffect(() => {
    if (!!tagDetail.id) {
      setValues({
        description: tagDetail.description,
        id: tagDetail.id,
        status: tagDetail.status,
        thumbnail: tagDetail.thumbnail,
        title: tagDetail.title,
      } as CreateTagInput);
    } else {
      handleReset();
    }
  }, [tagDetail]);

  useEffect(() => {
    if (!visible) {
      handleReset();
    }
  }, [visible]);

  return (
    <Row className="tag-form form-label-md">
      <Box className="upload__field center-block">
        <Text className="tag-upload-dec">{t('tag.label_thumbnail')}</Text>
        <FieldUpload isLoadingForm={isLoadingForm} name={fieldCreateTag.thumbnail.name} crop={true} />
      </Box>
      <Field {...fieldCreateTag.title} component={InputComponent} />
      <Field {...fieldCreateTag.description} component={TextAreaComponent} />
      <Field {...fieldCreateTag.status} allowClear={false} component={SelectComponent} />
      <Divider />
      <ButtonForm loading={isLoadingForm} onClickClose={onCloseForm} onClickSubmit={handleSubmit} />
    </Row>
  );
};

export const DrawerTagForm = ({
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
  const validateTagInput = new ValidateService(t).validateCreateTagInput(fieldCreateTag);

  const initialValues: CreateTagInput = {
    description: '',
    status: TagStatus.ACTIVE,
    thumbnail: '',
    title: '',
    id: '',
  };

  const onCloseDrawer = () => {
    setVisible(false);
  };

  const handleSubmitForm = async (values: CreateTagInput) => {
    const uploadService = new UploadService();
    // handle set thumbnail
    dispatch(setUploadSliceStart({ count: 1, visibleProcessModal: false } as ProcessUpload));
    const thumbnail = await uploadService.handleUpload(values.thumbnail, S3Storage.TAG);
    dispatch(
      submitTagSliceStart({
        input: { ...values, thumbnail },
        callback: () => callbackSubmit && callbackSubmit(FETCH_POLICY.NO_CACHE),
      })
    );
  };

  return (
    <Drawer
      title={t('tag.add_tag_title')}
      maskClosable={false}
      width={520}
      closable={!isLoadingForm}
      onClose={onCloseDrawer}
      visible={visible}>
      <Formik onSubmit={handleSubmitForm} validationSchema={validateTagInput} initialValues={initialValues}>
        <TagForm visible={visible} isLoadingForm={isLoadingForm} t={t} onCloseForm={onCloseDrawer} />
      </Formik>
    </Drawer>
  );
};
