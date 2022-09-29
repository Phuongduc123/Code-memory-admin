import { Col, Row } from 'antd';
import { Field } from 'formik';
import React from 'react';
import { InputComponent } from '../../common/Input';
import { FiledTagSelect } from '../../common/Select/TagSelect';
import { FieldUpload } from '../../common/Upload/FieldUpload';
import { fieldBlog } from '../../models/BlogModel';

export const BlogFormInfo = () => {
  return (
    <Row className="form-input-blog" gutter={[24, 24]}>
      <Col xs={24}>
        <FieldUpload isLoadingForm={false} name={fieldBlog.thumbnail.name} fullWidth />
      </Col>
      <Col xs={24}>
        <Field {...fieldBlog.title} component={InputComponent} />
      </Col>
      <Col xs={24}>
        <Field {...fieldBlog.description} component={InputComponent} />
      </Col>
      <Col xs={24}>
        <Field {...fieldBlog.tag} component={FiledTagSelect} />
      </Col>
    </Row>
  );
};
