import moment from 'moment'
import {get, maxBy, keys} from 'lodash'

export const demandFactors = {
    days: {
        Monday: 1,
        Tuesday: 2,
        Wednesday: 3,
        Thursday: 4,
        Friday: 5,
        Saturday: 3,
        Sunday: 3
    },
    weather: {
        rain: 4,
        snow: 5,
        niceWeather: -2
    },
    isEndOfMonth: 5
}

const calculateDayFactors = (date) => {
    const day = moment(date).format('dddd')
    const dayFactor = get(demandFactors.days, day, 0)
    const isEndOfMonth = moment(date).format('D') === `${moment(date).daysInMonth()}`
    const endOfMonthFactor = isEndOfMonth
        ? demandFactors.isEndOfMonth
        : 0
    return {day, dayFactor, endOfMonthFactor}
}

const calculateWeatherFactors = (weatherForKitchen) => {
    const currentPrecipType = get(weatherForKitchen, 'precipTypeHour', 'none')
    const dailyPrecipType = get(weatherForKitchen, 'precipTypeDay', 'none')
    const currentPrecipProb = get(weatherForKitchen, 'precipProbDay', 0)
    const dailyPrecipProb = get(weatherForKitchen, 'precipProbHour', 0)
    const currentWeatherFactor = currentPrecipProb >= .30
        ? get(demandFactors.weather, currentPrecipType, 0)
        : 0

    const dailyWeatherFactor = dailyPrecipProb >= .30
        ? get(demandFactors.weather, dailyPrecipType, 0)
        : 0

    const currentNiceWeather = get(weatherForKitchen, 'iconCurrent', '').includes("clear")
        ? demandFactors.weather.niceWeather
        : 0

    const dailyNiceWeather = get(weatherForKitchen, 'iconDay', '').includes("clear")
        ? demandFactors.weather.niceWeather
        : 0

    return {
        currentPrecipType,
        dailyPrecipType,
        currentWeatherFactor,
        currentNiceWeather,
        dailyWeatherFactor,
        dailyNiceWeather
    }
}

const highestFactorDetail = (factors, precipType, day) => {
    const highestFactor = maxBy(keys(factors), (o) => factors[o])
    if (highestFactor === 'dayFactor') {
        return `${day}`
    } else if (highestFactor === 'endOfMonthFactor') {
        return `End Of The Month`
    } else if (highestFactor === 'weatherFactor') {
        const p = precipType[0]
        console.log(p)
        return precipType
    }
}

const calculateDemand = (weatherForKitchen, date) => {
    const {day, dayFactor, endOfMonthFactor} = calculateDayFactors(date)

    const {
        currentPrecipType,
        dailyPrecipType,
        currentWeatherFactor,
        currentNiceWeather,
        dailyWeatherFactor,
        dailyNiceWeather
    } = calculateWeatherFactors(weatherForKitchen)

    const dayFactors = dayFactor + endOfMonthFactor
    const overallCurrentFactor = dayFactors + currentWeatherFactor + currentNiceWeather
    const overallDailyFactor = dayFactors + dailyWeatherFactor + dailyNiceWeather

    const dailyFactors = {
        dayFactor,
        endOfMonthFactor,
        weatherFactor: dailyWeatherFactor,
        niceWeatherFactor: dailyNiceWeather
    }
    const currentFactors = {
        dayFactor,
        endOfMonthFactor,
        weatherFactor: currentWeatherFactor,
        niceWeatherFactor: currentNiceWeather
    }

    const reasonForHighestCurrent = highestFactorDetail(currentFactors, currentPrecipType, day)
    const reasonForHighestDaily = highestFactorDetail(dailyFactors, dailyPrecipType, day)

    return {
        current: {
            ...currentFactors,
            overall: overallCurrentFactor,
            highest: reasonForHighestCurrent
        },
        daily: {
            ...dailyFactors,
            overall: overallDailyFactor,
            highest: reasonForHighestDaily
        }
    }
}

export default calculateDemand