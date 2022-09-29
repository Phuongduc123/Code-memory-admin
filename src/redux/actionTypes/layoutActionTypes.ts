import { NotifySystem, ProcessUpload } from '../../models/LayoutModel';

type PayloadName = 'payload';

export type SetNotifyAction = Record<PayloadName, NotifySystem>;
export type setUploadSliceAction = Record<PayloadName, ProcessUpload>;
