import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./reducer";
import thunk from 'redux-thunk';
//import reduxLogger from 'redux-logger'
import { logger } from 'redux-logger'

// const middleWare = [thunk];
// const { createLogger } = require('redux-logger');
// middleWare.push(createLogger);
//export default const store = createStore(rootReducer, compose(applyMiddleware(...middleWare)));
export const store = createStore(rootReducer, applyMiddleware(logger, thunk));
export default store;