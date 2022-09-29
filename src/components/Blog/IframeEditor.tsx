import clsx from 'clsx';
import React, { FC } from 'react';
import Box from '../../common/Box';
import { TextAreaCommon } from '../../common/Input/TextArea';
import { BlogContent, FieldBlogProps } from '../../models/BlogModel';
import renderHTML from 'react-render-html';

export const IframeEditor: FC<FieldBlogProps> = ({ fieldValue, className, callbackChange }) => {
  const onChangeTextarea = ({ target: { value } }) => {
    callbackChange({ data: value } as BlogContent);
  };

  console.log(fieldValue);

  return (
    <Box className={clsx('iframe-editor', [className] && className)}>
      <Box className="iframe-editor-input mb-20">
        <TextAreaCommon onChange={onChangeTextarea} value={fieldValue.data} rows={2} />
      </Box>
      {fieldValue.data && <div className="relative-pos">{renderHTML(fieldValue.data)}</div>}
    </Box>
  );
};
