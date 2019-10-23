const initialState = {
    modalUrl: '',
};

export const modalUrlReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'MODALURL':
            return {
                ...state,
                modalUrl: action.modalUrl
            }
        default:
            return state;
    }
};