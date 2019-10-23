import { accessTokenReducer } from './accessTokenReducer';
import { refreshTokenReducer } from './refreshTokenReducer';
import { combineReducers } from 'redux';
import { modalImageReducer } from './modalImageReducer';
import { modalUrlReducer } from './modalUrlReducer';
import { modalArtistReducer } from './modalArtistReducer';
import { modalMusicReducer } from './modalMusicReducer';

export const Reducers = combineReducers({
    accessToken: accessTokenReducer,
    refreshToken: refreshTokenReducer,
    modalImage: modalImageReducer,
    modalUrl: modalUrlReducer,
    modalArtist: modalArtistReducer,
    modalMusic: modalMusicReducer
});