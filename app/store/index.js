import {createStore, applyMiddleware} from 'redux';
import reducer from '../reducer';
// import logger from '../middlewares/logger';
// import randomId from '../middlewares/randomId';
// import api from '../middlewares/api';
// import thunk from 'redux-thunk';
// import {routerMiddleware} from 'react-router-redux';
// import history from '../history';

// const enhancer = applyMiddleware(thunk, routerMiddleware(history), randomId, api, logger);
const enhancer = function (){};

const store = createStore(reducer, {counter: 0});

//dev only
window.store = store;

// export default store;
export default store;
