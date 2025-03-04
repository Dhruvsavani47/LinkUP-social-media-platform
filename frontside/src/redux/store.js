import {createStore, applyMiddleware} from 'redux';
import { thunk } from 'redux-thunk';
import rootReducer from './reducers/index';
import { Provider } from 'react-redux';

const store = createStore(
    rootReducer,
    applyMiddleware(thunk)
);

const DataProvider =({children}) => {
    return(
        <Provider store={store}>
            {children}
        </Provider>
    )
}

export default DataProvider;