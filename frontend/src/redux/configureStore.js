import { createStore, applyMiddleware, compose } from 'redux'
import authReducer from './AuthReducer';
import SecureLS from 'secure-ls'
import thunk from 'redux-thunk'
const secureLs = new SecureLS();

const getStateFromStorage = () => {
    //Tarayıcıda local storge dolu ise login olduktan sonra vb..
    //SecureLs direk set edilen valueları jsona çevirir
    const hoxAuth = secureLs.get('hoax-auth')
    let stateInLocalStorage = {
        isLoggedIn: false,
        username: undefined,
        displayName: undefined,
        image: undefined,
        password: undefined
    }
    if (hoxAuth) {
        stateInLocalStorage = hoxAuth
    }
    return stateInLocalStorage
}


const updateStateInStorage = (newState) => {
    secureLs.set('hoax-auth', newState)
}

const configureStore = () => {
    //react dev tools için
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    //reducer,başlangıç state değeri,chrome için ayar
    const store = createStore(authReducer, getStateFromStorage(), composeEnhancers(applyMiddleware(thunk)));

    //her değişim olduğunda bu fonksiyon çağrılmış olucak
    store.subscribe(() => {
        updateStateInStorage(store.getState())
    })
    return store;
}
//window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : noop => noop
//chrome da rext dev tools için eklenen ekstra kod
export default configureStore