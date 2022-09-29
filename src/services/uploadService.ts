import { ENV_STORAGE } from './../constant/index';
import { TFunction } from 'react-i18next';
import { message } from 'antd';
import { UploadFile } from 'antd/lib/upload/interface';
import S3 from 'react-aws-s3';
import { ProcessUpload } from '../models/LayoutModel';
import store from '../redux/rootStore';
import { setUploadSliceDone, setUploadSliceStart } from '../redux/slices/layoutSlice';
import { v4 } from "uuid";

export enum S3Storage {
  TAG = 'tag',
  META = "meta",
  WORK = "work",
  BLOG = "blog",
}

export type ResponseS3 = {
  bucket: string;
  key: string;
  location: string;
};

const config = {
  bucketName: 'code-memory',
  // dirName: 'media' /* optional */,
  region: 'ap-southeast-1',
  accessKeyId: 'AKIAUYZ7AQ5QF7I5RSM7',
  secretAccessKey: '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',
  s3Url: 'https://code-memory.s3.ap-southeast-1.amazonaws.com' /* optional */,
};

export default class UploadService {
  private s3 = null;
  private dispatch = null;
  public envFolder = "";
  constructor() {
    this.s3 = new S3(config);
    this.dispatch = store.dispatch;
    this.envFolder = process.env.NODE_ENV !== "production" ? ENV_STORAGE.local : ENV_STORAGE.production;

  }

  isValidFormatImage = (type: string) => {
    return type === 'image/jpeg' || type === 'image/png' || type === 'image/svg+xml' || type === 'image/heic';
  };

  isValidSize = (fileSize, limitSize: number) => {
    return fileSize / 1024 / 1024 <= limitSize;
  }

  beforeUpload = (t: any, limitSize: number) => (file: any) => {
    return this.validateUploadImage(file, limitSize, t);
  };

  getBase64 = (img: any, callback: any) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }

  validateUploadImage = (file: UploadFile, limitSize: number, t: TFunction = null) => {
    const isJpgOrPng = this.isValidFormatImage(file.type);
    if (!isJpgOrPng && !!t) {
      message.error(t('message.upload_format_invalid'));
    }
    const isLt1M = this.isValidSize(file.size, limitSize);
    if (!isLt1M && !!t) {
      message.error(t('message.upload_limit_size', { size: limitSize }));
    }
    return isJpgOrPng && isLt1M;
  };

  handleUpload = async (file: any, storage: string = ""): Promise<string> => {
    if (!!(file as UploadFile).size) {
      // when upload file show modal process
      this.dispatch((setUploadSliceStart({ visibleProcessModal: true } as ProcessUpload)));
      return await this.s3
        .uploadFile((file as UploadFile).originFileObj, `${this.envFolder}/${storage}/${v4()}`)
        .then(({ location }: ResponseS3) => {
          this.dispatch(setUploadSliceDone({}));
          return location;
        })
        .catch(err => {
          console.error(err);
          this.dispatch(setUploadSliceDone({ msgErrUpload: err } as ProcessUpload));
          return false;
        });
    } else {
      this.dispatch(setUploadSliceDone({}));
      return file;
    }
  }
}

export const uploadService = new UploadService();