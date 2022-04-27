import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import  Router  from './Router';
import configureStore from './redux/configureStore';
import ProvideTheme from "./theme/index";

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <ProvideTheme>
      <Router/>
    </ProvideTheme>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
