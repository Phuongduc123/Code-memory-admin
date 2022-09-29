import { Formik } from 'formik';
import React from 'react';
import { useTranslation } from 'react-i18next';
import Box from '../../common/Box';
import { LoginForm } from '../../components/Login/LoginForm';
import { useLogin } from '../../hooks/useLogin';
import { fieldLogin } from '../../models/FieldModel';
import { ValidateService } from '../../services/validateService';

export const LoginPages = () => {
  const { t } = useTranslation();
  const validateInput = new ValidateService(t).validateLoginInput(fieldLogin);
  const { loginInput, handleLogin } = useLogin();

  return (
    <Box className="login__container">
      <Formik initialValues={loginInput} onSubmit={handleLogin} validationSchema={validateInput}>
        <LoginForm fieldLogin={fieldLogin} />
      </Formik>
    </Box>
  );
};
