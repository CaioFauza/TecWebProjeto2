const initialState = {
    modalArtist: '',
};

export const modalArtistReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'MODALARTIST':
            return {
                ...state,
                modalArtist: action.modalArtist
            }
        default:
            return state;
    }
};