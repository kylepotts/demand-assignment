import jsonp from 'jsonp-promise'
const darkSkyKey = 'aa9c3eff25e201e633994f3666cc0443'
// this is not good and insecure. It would be better to use a tool like Vault or
// have the server pass this over https

const weatherService = {
    getWeather: ({date, lat, lng}) => {
        return jsonp(`https://api.darksky.net/forecast/${darkSkyKey}/${lat},${lng},${date}`).promise
    },
    getWeatherDebug: () => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(100)
            }, 100000)
        })
    }
}

export default weatherService