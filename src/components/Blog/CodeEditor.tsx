import clsx from 'clsx';
import React, { FC } from 'react';
import Box from '../../common/Box';
import { TextAreaCommon } from '../../common/Input/TextArea';
import { BlogContent, FieldBlogProps } from '../../models/BlogModel';
import { Code } from './Code';

export const CodeEditor: FC<FieldBlogProps> = ({ fieldValue, className, callbackChange }) => {
  const onChangeTextarea = ({ target: { value } }) => {
    callbackChange({ data: value } as BlogContent);
  };

  return (
    <Box className={clsx('code-editor', [className] && className)}>
      <Box className="code-editor-input">
        <TextAreaCommon onChange={onChangeTextarea} value={fieldValue.data} rows={2} />
      </Box>
      <Code code={fieldValue.data} language={fieldValue.language} />
    </Box>
  );
};
