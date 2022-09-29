  import React, { useCallback } from 'react';
import { FC } from 'react';
import Box from '../../common/Box';
import ButtonCommon from '../../common/Button';
import { BlogContent, BlogContentType } from '../../models/BlogModel';
import { CodeEditor } from './CodeEditor';
import { DraftEditor } from './DraftEditor';
import { CloseOutlined, MenuOutlined, PlusOutlined } from '@ant-design/icons';
import { DefaultType } from './DefaultType';
import { useFormikContext } from 'formik';
import { contentDefault } from '../../pages/Blog/AddBlog';
import { ImageEditor } from './ImageEditor';
import { IframeEditor } from './IframeEditor';

export const BlogFormSection: FC<{ content: BlogContent[]; field: BlogContent; index: number }> = ({
  field,
  index,
  content,
}) => {
  const { setFieldValue } = useFormikContext();
  const onRemoveIndex = () => {
    if (content.length > 1) {
      content.splice(index, 1);
      setFieldValue('content', content);
    } else {
      alert('Không thể xóa nội dung cuối này');
    }
  };

  const onAddIndex = () => {
    content.splice(index + 1, 0, contentDefault[0]);
    setFieldValue('content', content);
  };

  const callbackChangeVal = useCallback(
    data => {
      const fieldChangeVal = { ...content[index], ...data };
      content[index] = fieldChangeVal;
      setFieldValue('content', content);
    },
    [content]
  );

  const fieldProps = { callbackChange: callbackChangeVal, fieldValue: content[index] };
  console.log('RE-RENDER');
  return (
    <Box className="section-form form-input-blog mb-30">
      <Box className="control-group mb-6">
        <ButtonCommon type="primary" className="handle-drag" shape="circle" icon={<MenuOutlined />} size="small" />
        <ButtonCommon className="btn-green" onClick={onAddIndex} shape="circle" icon={<PlusOutlined />} size="small" />
        <ButtonCommon danger shape="circle" onClick={onRemoveIndex} icon={<CloseOutlined />} size="small" />
      </Box>
      <Box className="field-item p-12">
        <DefaultType {...fieldProps} />
        {field.type === BlogContentType.CODE && <CodeEditor {...fieldProps} />}
        {field.type === BlogContentType.EDITOR && <DraftEditor {...fieldProps} />}
        {field.type === BlogContentType.IMAGE && <ImageEditor {...fieldProps} />}
        {field.type === BlogContentType.IFRAME && <IframeEditor {...fieldProps} />}
      </Box>
    </Box>
  );
};
