import { createStore } from 'redux'
import rootReducer from './reducer'

const store = createStore(
    rootReducer,
    //middleware in order to use Chrome Redux Developer Tools if needed
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
