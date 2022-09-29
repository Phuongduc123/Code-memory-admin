import * as React from 'react';
import { BrowserRouter, Router, Switch, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { privateRoutes, publicRoute } from './appRoutes';
import { Provider } from 'react-redux';
import store, { persistor } from './redux/rootStore';
import LayoutCommon from './common/Layout/Layout';
import { PersistGate } from 'redux-persist/integration/react';
import './i18n/i18n';

// load style lib
import 'antd/dist/antd.css';
// load style app custom
import './sass/_app.scss';

export const history = createBrowserHistory();

const App: React.FC<any> = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <Router history={history}>
            <Switch>
              <Route path={[...publicRoute, ...privateRoutes].map(item => item.path)} component={LayoutCommon} />
            </Switch>
          </Router>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
};

export default App;
