import React from 'react';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { Formik } from 'formik';
import { BlogContent, BlogContentType, BlogInput, BLOG_FIELD_NAME } from '../../models/BlogModel';
import { useAppDispatch, useAppSelector } from '../../redux/rootStore';
import { helper } from '../../services/helperService';
import { BlogForm } from '../../components/Blog/BlogForm';
import { dataBlogDefault } from '../../components/Blog/DefaultType';
import { draftService } from '../../services/draftService';

export const contentDefault: BlogContent[] = [
  {
    type: BlogContentType.EDITOR,
    data: dataBlogDefault[BlogContentType.EDITOR],
    language: 'js',
  },
];

const mapContentBlog = (values: any): BlogContent[] => {
  let contents = [];
  for (const [key] of Object.entries(values)) {
    if (helper.ignoreString(key, BLOG_FIELD_NAME)) {
      continue;
    }
  }
  return contents;
};

export const AddBlogPage = () => {
  const dispatch = useAppDispatch();
  // const { id } = useAppSelector(state => state.loginSlice.user);

  const onSubmit = (values: BlogInput) => {
    // console.log(values);
    // console.log(
    //   'HaNDLE SUBMIT ==========>',
    //   values.content.forEach(
    //     item => item.type === BlogContentType.EDITOR && console.log(draftService.draftBlocksToHtml(item.data))
    //   )
    // );
    const data: BlogInput = {
      title: values.title,
      description: values.description,
      content: mapContentBlog(values),
    };
    // dispatch(actionBlog.addBlog(data));
  };

  return (
    <Formik
      initialValues={{ title: '', description: '', content: contentDefault, tag: [] } as BlogInput}
      onSubmit={onSubmit}>
      <BlogForm />
    </Formik>
  );
};
