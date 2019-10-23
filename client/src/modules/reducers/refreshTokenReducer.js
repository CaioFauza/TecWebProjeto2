const initialState = {
    refreshToken: '',
};

export const refreshTokenReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'CREDENTIALSR':
            return {
                ...state,
                refreshToken: action.refreshToken
            }
        default:
            return state;
    }
};