import {GET_KITCHEN_INFO} from '../actions/types/kitchenActionTypes'

const initalState = {
    result: [],
    isLoading: true,
    success: false
}

export default(state = initalState, action) => {
    console.log(action)
    switch (action.type) {
        case `${GET_KITCHEN_INFO}_LOADING`:
            return {
                ...state,
                isLoading: true
            }
        case `${GET_KITCHEN_INFO}_SUCCESS`:
            return {
                ...state,
                isLoading: false,
                success: true,
                result: action.payload.data
            }
        default:
            return state
    }
}