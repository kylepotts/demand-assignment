import jsonp from 'jsonp-promise'
import moment from 'moment'
const darkSkyKey = process.env.DARK_SKY_KEY || 'aa9c3eff25e201e633994f3666cc0443'

const weatherService = {
    getWeather: ({date, lat, lng}) => {
        return jsonp(`https://api.darksky.net/forecast/${darkSkyKey}/${lat},${lng},${date}`).promise
    },
    getWeather1: () => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(100)
            }, 1000)
        })
    }
}

export default weatherService