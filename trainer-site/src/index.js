import 'assets/css/material-dashboard-react.css?v=1.7.0';
import { createBrowserHistory } from 'history';
import GuestLayout from 'layouts/GuestLayout';
import TrainerLayout from 'layouts/TrainerLayout.jsx';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Route, Router, Switch } from 'react-router-dom';
import errorReducer from 'reducers/ErrorReducer';
import ExerciseReducer from 'reducers/ExerciseReducer';
import TrainingsReducer from 'reducers/TrainingsReducer';
import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import authReducer from './reducers/AuthReducer';

const hist = createBrowserHistory();

const allReducers = combineReducers({
  auth: authReducer,
  error: errorReducer,
  exercises: ExerciseReducer,
  trainings: TrainingsReducer,
});

const allStoreEnhancers = compose(
  applyMiddleware(thunk),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const store = createStore(allReducers, allStoreEnhancers);

ReactDOM.render(
  <Provider store={store}>
    <Router history={hist}>
      <Switch>
        <Route path="/tornász" component={TrainerLayout} />
        <Route path="/" component={GuestLayout} />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('root')
);
