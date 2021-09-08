import {createStore, compose, applyMiddleware} from 'redux';
import {combineReducers} from 'redux-immutable';
import thunk from 'redux-thunk';
import root from './modules/root';
import analysis from './modules/analysis';
import category from './modules/category';

const reducer = combineReducers({
  root,
  analysis,
  category
});

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));

export default store;