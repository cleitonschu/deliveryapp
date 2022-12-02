
const initialState = {
    loading: false,
    moreLoading: false,
    error: null,
    data: { docs: [] },
    totalDocs: 0,
    offset: 0,
    limit: 7,
    hasNextPage: true,
}

export default (state = initialState, action) => {
    console.log({action});
    switch (action.type) {
        case 'API_REQUEST':
            if (action.payload.offset === 0) {
                return { ...state, loading: true }
            } else {
                return { ...state, moreLoading: true }
            }

        case 'API_SUCCESS':
            return {
                ...state,
                data: {...state.data, docs: [...state.data.docs, ...action.data.docs] },
                error: null,
                hasNextPage: action.data.hasNextPage,
                totalDocs: action.data.totalDocs,
                offset: action.data.docs.length,
                loading: false,
                moreLoading: false
            }

        case 'API_FAILURE':
            return {
                ...state,
                error: action.error,
                loading: false,
                moreLoading: false
            }

        default: return state;
    }
}