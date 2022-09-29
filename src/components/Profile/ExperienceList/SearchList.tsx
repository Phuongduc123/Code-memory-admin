import { Col, Row } from 'antd';
import Form from 'antd/lib/form/Form';
import { Field, useFormikContext } from 'formik';
import React from 'react';
import { useTranslation } from 'react-i18next';
import Box from '../../../common/Box';
import ButtonCommon from '../../../common/Button';
import { InputComponent } from '../../../common/Input';
import { fieldSearchExperience } from '../../../models/FieldModel';
import { ClearOutlined, SearchOutlined } from '@ant-design/icons';
import { SelectComponent } from '../../../common/Select';
import { useAppSelector } from '../../../redux/rootStore';
import { getExpSlice } from '../../../redux/slices/experienceSlice';
import { helper, HelperService } from '../../../services/helperService';

export const SearchListForm = () => {
  const { t } = useTranslation();
  const { isLoadingList } = useAppSelector(getExpSlice);

  const { handleSubmit, handleReset } = useFormikContext();

  return (
    <Form className="tag-list__form-search">
      <Row gutter={[8, 8]}>
        <Col xs={4}>
          <Field {...fieldSearchExperience.key} component={InputComponent} onPressEnter={handleSubmit} />
        </Col>
        <Col xs={8} xxl={6}>
          <Field {...fieldSearchExperience.status} mode="multiple" component={SelectComponent} />
        </Col>
        <Col xs={8} xxl={6}>
          <Field {...fieldSearchExperience.type} mode="multiple" component={SelectComponent} />
        </Col>
        <Col xs={4}>
          <Box className="flx-center align-left control-btn mt-6">
            <ButtonCommon
              onClick={handleSubmit}
              loading={isLoadingList}
              type="primary"
              className="mr-8"
              shape="circle"
              icon={<SearchOutlined />}
              size="middle"
            />
            <ButtonCommon
              onClick={helper.handleResetSearch(handleReset, handleSubmit)}
              loading={isLoadingList}
              type="primary"
              shape="circle"
              icon={<ClearOutlined />}
              size="middle"
              danger
            />
          </Box>
        </Col>
      </Row>
    </Form>
  );
};
