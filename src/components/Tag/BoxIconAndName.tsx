import clsx from 'clsx';
import React from 'react';
import AntImage from '../../common/Image/AntImage';
import { Tag } from '../../models/TagModel';

export const renderUrlChange = (url: any, updatedAt: any) => {
  if (!url) return '';
  return `${url}?${updatedAt}`;
};

export const BoxIconAndName = ({
  name = '',
  thumbnail,
  updatedAt,
  size = 40,
  classNameWrap = '',
}: {
  name: string;
  updatedAt: string;
  thumbnail: string;
  size?: number;
  classNameWrap?: string;
}) => {
  return (
    <div className={clsx('tag__box-icon', classNameWrap)}>
      <AntImage
        placeholder={true}
        width={size}
        height={size}
        preview={false}
        src={renderUrlChange(thumbnail, updatedAt)}
      />
      <div className="name ml-8">{name}</div>
    </div>
  );
};
