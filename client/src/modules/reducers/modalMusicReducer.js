const initialState = {
    modalMusic: '',
};

export const modalMusicReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'MODALMUSIC':
            return {
                ...state,
                modalMusic: action.modalMusic
            }
        default:
            return state;
    }
};