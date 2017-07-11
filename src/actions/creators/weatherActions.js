import {GET_WEATHER, CHANGE_DATE} from '../types/weatherActionTypes'
import weatherService from '../../services/weatherService'

export const getWeatherForLocation = (locations) => {
    const promises = locations.map(({date, lat, lng}) => {
        return weatherService.getWeather({date, lat, lng})
    })
    const names = locations.map(({name}) => name)
    return {
        type: GET_WEATHER,
        payload: Promise.all(promises),
        meta: {
            names
        }
    }
}

export const changeDate = (date) => {
    return (dispatch, getState) => {

        return dispatch({
            type: CHANGE_DATE,
            payload: new Promise((resolve) => resolve(date))
        }).then(() => {
            const {kitchenInfo} = getState()
            const kitchenSubset = kitchenInfo
                .result
                .map((kitchen) => {
                    const lat = kitchen.location.lat
                    const lng = kitchen.location.lng
                    const name = kitchen.name
                    return {
                        lat,
                        lng,
                        name,
                        date: date.format('YYYY-MM-DDTHH:mm:ss')
                    }
                })
            dispatch(getWeatherForLocation(kitchenSubset))
        })
    }
}