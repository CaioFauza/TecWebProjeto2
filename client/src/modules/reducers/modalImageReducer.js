const initialState = {
    modalImage: '',
};

export const modalImageReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'MODALIMAGE':
            return {
                ...state,
                modalImage: action.modalImage
            };
        default:
            return state;
    }
};