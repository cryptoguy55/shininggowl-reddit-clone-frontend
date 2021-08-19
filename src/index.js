import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import React, {Suspense} from 'react';
import { store, history} from './store';
import Spinner from './components/Home/Spinner'
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router'

import App from './components/App';
import './App.css';
import './i18n';
ReactDOM.render((
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Switch>
        <Suspense fallback={<Spinner/>}>
          <Route path="/" component={App} />
        </Suspense>
      </Switch>
    </ConnectedRouter>
  </Provider>

), document.getElementById('root'));
