import {GET_WEATHER, CHANGE_DATE} from '../actions/types/weatherActionTypes'
import Moment from 'moment'
const initalState = {
    result: [],
    isLoading: false,
    success: false,
    date: Moment().format('YYYY-MM-DDTHH:mm:ss')
}

export default(state = initalState, action) => {
    switch (action.type) {
        case `${GET_WEATHER}_LOADING`:
            return {
                ...state,
                isLoading: true
            }
        case `${GET_WEATHER}_SUCCESS`:
            return {
                ...state,
                isLoading: false,
                success: true,
                result: action
                    .meta
                    .names
                    .map((name, i) => ({name, darkSkyResponse: action.payload[i]}))

            }
        case `${CHANGE_DATE}_SUCCESS`:
            return {
                ...state,
                date: action
                    .payload
                    .format('YYYY-MM-DDTHH:mm:ss')
            }
        default:
            return state
    }
}