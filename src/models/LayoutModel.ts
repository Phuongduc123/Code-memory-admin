export enum TypeNotify {
  SUCCESS = 'success',
  ERROR = 'error',
  INFO = 'info',
  WARNING = 'warning',
}

export interface NotifySystem {
  messageNotify?: string;
  typeNotify: TypeNotify;
  createTime?: number;
}

export interface ProcessUpload {
  loadingUpload?: boolean;
  visibleProcessModal?: boolean;
  msgErrUpload?: string;
  count?: number;
}

export interface LayoutSlice {
  notify?: NotifySystem;
  processUpload?: ProcessUpload;
}
