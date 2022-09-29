import { S3Storage } from './../services/uploadService';
import { FETCH_POLICY } from './../constant/index';
import { useTranslation } from 'react-i18next';
import { ValidateService } from './../services/validateService';
import { useEffect, useState } from 'react';
import { ProcessUpload } from './../models/LayoutModel';
import { setUploadSliceStart } from '../redux/slices/layoutSlice';
import UploadService from '../services/uploadService';
import { SeoHome, fieldSeoHome } from './../models/SeoHomeModel';
import { useAppDispatch } from './../redux/rootStore';
import { getSeoHomeEntireStart, getSeoHomeStart, submitSeoHomeStart } from '../redux/slices/seoHomeSlice';


export const useSeoHome = (isCallValue: boolean = true, callback: any = null): {
  onSubmitSeoHome: any,
  validateSchema: any,
} => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const validateSchema = new ValidateService(t).validateSeoHomeInput(fieldSeoHome);


  useEffect(() => {
    if (isCallValue) {
      dispatch(getSeoHomeStart());
    }
  }, []);

  const onSubmitSeoHome = async (values: SeoHome) => {
    const uploadService = new UploadService();
    // handle upload image SEO
    dispatch(setUploadSliceStart({ count: 5, visibleProcessModal: false } as ProcessUpload));
    const faviconUrlICO = await uploadService.handleUpload(values.image.faviconUrlICO, S3Storage.META);
    const faviconUrlJPG = await uploadService.handleUpload(values.image.faviconUrlJPG, S3Storage.META);
    const logo1280x720 = await uploadService.handleUpload(values.image.logo1280x720, S3Storage.META);
    const logo800x600 = await uploadService.handleUpload(values.image.logo800x600, S3Storage.META);
    const logo400x400 = await uploadService.handleUpload(values.image.logo400x400, S3Storage.META);
    dispatch(submitSeoHomeStart({
      input: {
        description: values.description,
        descriptionEN: values.descriptionEN,
        domain: values.domain,
        facebookChatPlugin: values.facebookChatPlugin,
        siteName: values.siteName,
        social: values.social,
        searchBoxUrl: values.searchBoxUrl,
        title: values.title,
        titleEN: values.titleEN,
        reason: values.reason,
        image: {
          logoAlt: values.image.logoAlt,
          logoAltEN: values.image.logoAltEN,
          faviconUrlICO,
          faviconUrlJPG,
          logo1280x720,
          logo800x600,
          logo400x400,
        }
      },
      callback: callback
    }))

  };
  return { onSubmitSeoHome, validateSchema }
}


export const useSeoHomeHistory = (): {
  seoHomeDetail: SeoHome,
  onViewSeoHomeDetail: any,
  onCallbackUpdateSeoHome: any,
} => {
  const [seoHomeDetail, setSeoHomeDetail] = useState<SeoHome>({});
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getSeoHomeEntireStart());
  }, []);

  const onViewSeoHomeDetail = (seoHome: SeoHome) => () => {
    setSeoHomeDetail(seoHome);
  };

  const onCallbackUpdateSeoHome = () => {
    dispatch(getSeoHomeEntireStart());
    setSeoHomeDetail({})
  };;

  return { seoHomeDetail, onViewSeoHomeDetail, onCallbackUpdateSeoHome }

};
