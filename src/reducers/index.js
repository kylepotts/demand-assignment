import {combineReducers} from 'redux'
import {routerReducer} from 'react-router-redux'
import kitchenInfo from './kitchenInfoReducer'
import weather from './weatherReducer'

export default combineReducers({routing: routerReducer, kitchenInfo, weather})