import {GET_KITCHEN_INFO} from '../types/kitchenActionTypes'
import kitchenService from '../../services/kitchenService'

export const getKitchenInfo = () => ({
    type: GET_KITCHEN_INFO,
    payload: kitchenService.getKitchenInfo()
})
