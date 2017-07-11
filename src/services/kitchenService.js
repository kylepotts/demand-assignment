import axios from 'axios'
const kitchenService = {
    getKitchenInfo: () => axios.get('https://api.staging.clustertruck.com/api/kitchens')
}

export default kitchenService