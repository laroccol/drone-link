import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import reducers from './reducers';

export default () => {

    const composeEnhancers = composeWithDevTools({trace: true, traceLimit: 25 });

    return createStore(reducers, composeEnhancers(
        applyMiddleware(thunk)
      ));
};

