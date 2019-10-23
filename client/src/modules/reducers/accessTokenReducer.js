const initialState = {
    accessToken: '',
};

export const accessTokenReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'CREDENTIALS':
            return {
                ...state,
                accessToken: action.accessToken
            };
        default:
            return state;
    }
};