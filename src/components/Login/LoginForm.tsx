import Title from 'antd/lib/typography/Title';
import { Field, useFormikContext } from 'formik';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { AlertCommon } from '../../common/Alert';
import Box from '../../common/Box';
import ButtonCommon from '../../common/Button';
import { InputComponent } from '../../common/Input';
import { FieldLogin } from '../../models/FieldModel';
import { useAppSelector } from '../../redux/rootStore';

interface ILoginForm {
  fieldLogin: FieldLogin;
}

export const LoginForm = ({ fieldLogin }: ILoginForm) => {
  const { t } = useTranslation();
  const { handleSubmit } = useFormikContext();
  const { messageError, loadingLogin } = useAppSelector(state => state.loginSlice);
  return (
    <Box className="login__form">
      {messageError && <AlertCommon message={t(`message.${messageError}`)} />}
      <Title level={4}>{t('login.title_login')}</Title>
      <Field {...fieldLogin.credential} component={InputComponent} onPressEnter={handleSubmit} />
      <Field {...fieldLogin.password} component={InputComponent} onPressEnter={handleSubmit} />
      <ButtonCommon loading={loadingLogin} onClick={handleSubmit} children="Dang Nhap" />
    </Box>
  );
};
