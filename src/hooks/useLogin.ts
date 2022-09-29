import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { privateRoutes, ROUTE, RouteLayoutAdmin } from '../appRoutes';
import { LoginInput } from '../models/LoginModel';
import { useAppDispatch, useAppSelector } from '../redux/rootStore';
import { loginSliceStart } from '../redux/slices/loginSlice';

interface UseLogin {
  loginInput: LoginInput;
  handleLogin: (values: LoginInput) => void;
}

export const useLogin = (): UseLogin => {
  const dispatch = useAppDispatch();
  const { token } = useAppSelector(state => state.loginSlice);

  const history = useHistory();

  useEffect(() => {
    if (token) {
      !RouteLayoutAdmin.includes(history.location.pathname) && history.push(ROUTE.DASHBOARD_BLOG);
    } else {
      history.push(ROUTE.INDEX);
    }
  }, [token]);
  const loginInput: LoginInput = { credential: '', password: '' };

  const handleLogin = (input: LoginInput) => {
    dispatch(loginSliceStart({ input }));
  };

  return { loginInput, handleLogin };
};
