import clsx from 'clsx';
import { Image, ImageProps } from 'antd';
import React from 'react';

const LOAD_URL_DEFAULT =
  'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png?x-oss-process=image/blur,r_50,s_50/quality,q_1/resize,m_mfit,h_40,w_40';
export interface IAntImage extends ImageProps {
  loadUrl?: string;
  loadWidth?: number;
  loadHeight?: number;
}

const AntImage: React.FC<IAntImage> = ({
  className,
  preview = false,
  loadWidth = 40,
  loadHeight,
  placeholder,
  loadUrl = LOAD_URL_DEFAULT,
  ...props
}) => {
  return (
    <Image
      className={clsx(className, 'img-app-antd')}
      preview={preview}
      {...props}
      placeholder={
        placeholder ? (
          <Image
            className={clsx(className, 'img-app-antd', 'img-app-antd-load')}
            height={loadHeight}
            width={loadWidth}
            preview={false}
            src={LOAD_URL_DEFAULT}
          />
        ) : (
          false
        )
      }
    />
  );
};

export default AntImage;
