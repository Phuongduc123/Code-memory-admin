import * as React from 'react';
import { Layout } from 'antd';
import { Switch, Route, RouteChildrenProps } from 'react-router-dom';
import { useAppSelector } from '../../redux/rootStore';
import { privateRoutes, publicRoute, RouteLayoutAdmin } from '../../appRoutes';
// import { LoginPages } from '../../pages/Login';
import { HeaderAdmin } from './HeaderAdmin';
import { SiderAdmin } from './SiderAdmin';
import { NotifySystem } from '../Notify/NotifySystem';
import { ModalProcessUpload } from '../Modal/ModalProcessUpload';
import { LoginPages } from '../../pages/LoginPage';
import { useLogin } from '../../hooks/useLogin';

const { Content } = Layout;

interface ILayoutAuth {
  type: string;
  token: string;
}

const LayoutAuth: React.FC<ILayoutAuth> = ({ type, children, token }) => {
  const isAdmin = RouteLayoutAdmin.includes(type) && token;
  return (
    <Layout className="layout" style={{ minHeight: '100vh' }}>
      {isAdmin && <SiderAdmin />}
      <Layout className="site-layout">
        {/* <Content>{children}</Content> */}
        <Layout className="site-layout">
          {/* Header container */}
          {isAdmin && <HeaderAdmin />}
          {/* Header container END */}
          <Content>{children}</Content>
        </Layout>
      </Layout>
      <NotifySystem />
      <ModalProcessUpload />
    </Layout>
  );
};

const LayoutCommon: React.FC<RouteChildrenProps> = ({ history, location, match }) => {
  useLogin();
  const token = useAppSelector(state => state.loginSlice.token);
  return (
    <LayoutAuth token={token} type={history.location.pathname}>
      <Switch>
        {token
          ? privateRoutes.map((route, index) => <Route path={route.path} component={route.component} exact={route.exact} key={index} />)
          : publicRoute.map((route, index) => <Route path={route.path} component={route.component} exact={route.exact} key={index} />)}
        <Route component={LoginPages} />
      </Switch>
    </LayoutAuth>
  );
};

export default LayoutCommon;
