import React, { FC, useEffect, useState } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import clsx from 'clsx';
import { BlogContent, FieldBlogProps } from '../../models/BlogModel';
import { Switch } from 'antd';
import Text from 'antd/lib/typography/Text';
import { draftService } from '../../services/draftService';
import { useTranslation } from 'react-i18next';
import renderHTML from 'react-render-html';

export const DraftEditor: FC<FieldBlogProps> = ({ fieldValue, className, callbackChange }) => {
  const { t } = useTranslation();
  const [isEditor, setIsEditor] = useState<boolean>(true);

  const [editorState, setEditorState] = useState(fieldValue.data);

  const onContentStateChange = value => {
    setEditorState(value);
  };

  useEffect(() => {
    if (draftService.checkDiff(fieldValue.data, editorState)) {
      setEditorState(fieldValue.data);
    }
  }, [fieldValue]);

  return (
    <div className={clsx('draft-editor', [className] && className)}>
      <div className="mb-12 control-field">
        <Text className="mr-12">{t('blog.switch_edit')}</Text>
        <Switch defaultChecked onChange={checked => setIsEditor(checked)} />
      </div>
      {isEditor && (
        <Editor
          editorState={editorState}
          onFocus={event => {}}
          onBlur={(event, editorState) => {
            callbackChange({ data: editorState } as BlogContent);
          }}
          onTab={event => {}}
          wrapperClassName="draft-editor__form-wrapper"
          editorClassName="draft-editor__form-editor"
          onEditorStateChange={onContentStateChange}
        />
      )}
      {!isEditor && <div className="draft-editor__form-view">{renderHTML(draftService.draftBlocksToHtml(editorState))}</div>}
    </div>
  );
};
