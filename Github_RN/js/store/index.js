import {applyMiddleware,createStore} from "redux";
import thunk from 'redux-thunk';
import reducers from './reducer'


//自定义 logger
const logger = store => next => action =>{
    if (typeof action === 'function'){
        console.log('dispatch a function');
    }else {
        console.log('dispatch ', action);
    }
    const result = next(action);
    console.log('nextState',store.getState());
    return result;
}

const middlewares = [
    // logger,
    thunk
];

export default createStore(reducers, applyMiddleware(...middlewares));
