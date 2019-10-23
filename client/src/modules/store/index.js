import { createStore } from 'redux';
import { Reducers } from '../reducers';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: 'SpotifyProject',
    storage,
}

const persistedReducer = persistReducer(persistConfig, Reducers);
const store = createStore(persistedReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
const persistor = persistStore(store);

export { store, persistor };