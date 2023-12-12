import { legacy_createStore as createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import authReducer from './reducers/authReducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import { cartReducer } from './reducers/cartReducer';
import { getProductDetailsReducer, getProductReducer } from './reducers/productReducer';

const reducer = combineReducers({
    auth: authReducer,
    cart: cartReducer,
    getProducts: getProductReducer,
    getProductDetails: getProductDetailsReducer
})
function saveToLocalStorage(store) {
    try {
      const serializedStore = JSON.stringify(store);
      window.localStorage.setItem('store', serializedStore);
    } catch (e) {
      console.log(e);
    }
  }
  
  function loadFromLocalStorage() {
    try {
      const serializedStore = window.localStorage.getItem('store');
      if (serializedStore === null) return undefined;
      return JSON.parse(serializedStore);
    } catch (e) {
      console.log(e);
      return undefined;
    }
  }

const middleware = [thunk];
const persistedState = loadFromLocalStorage();
const store = createStore(
    reducer,
    persistedState, 
    composeWithDevTools(applyMiddleware(...middleware))
);
store.subscribe(() => saveToLocalStorage(store.getState()));
export default store;