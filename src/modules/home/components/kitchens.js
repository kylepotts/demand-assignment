import React from 'react'
import {Row, Col, Panel} from 'react-bootstrap'
import {get} from 'lodash'
import Weather from './weather'
import Demand from './demand'
import calculateDemand from '../../../utils/calculateDemand'

const styles = {
    centerColumn: {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column'
    }
}

const grabRelevantWeatherInfo = (darkSkyResponseForKitchen) => {
    const daily = get(darkSkyResponseForKitchen, '[0].darkSkyResponse.daily.data[0]', {})
    const currently = get(darkSkyResponseForKitchen, '[0].darkSkyResponse.currently', {})
    const hourly = get(darkSkyResponseForKitchen, '[0].darkSkyResponse.hourly.data[0]', {})
    return {
        tempMin: get(daily, 'temperatureMin', ''),
        tempMax: get(daily, 'temperatureMax', ''),
        precipTypeDay: get(daily, 'precipType', 'None'),
        precipProbDay: get(daily, 'precipProbability', 0),
        iconDay: get(daily, 'icon', ''),
        summaryDay: get(daily, 'summary', ''),
        summaryCurrent: get(currently, 'summary', ''),
        iconCurrent: get(currently, 'icon', ''),
        precipProbCurrent: get(currently, 'precipProbability', 0),
        tempCurrent: get(currently, 'temperature', ''),
        precipProbHour: get(hourly, 'precipProbability', 0),
        precipTypeHour: get(hourly, 'precipType')
    }
}

const createKitchenComponents = (kitchenInfo, weather) => (kitchenInfo.result.map((kitchen, i) => {
    const darkSkyResponseForKitchen = weather
        .result
        .filter((w) => w.name === kitchen.name)

    const weatherForKitchen = grabRelevantWeatherInfo(darkSkyResponseForKitchen)
    const demand = calculateDemand(weatherForKitchen, weather.date, weather.precipThreshold)
    return (
        <Col key={kitchen.id} xs={6} className={`contentCool-${i}`}>
            <Panel header={< h2 > {
                kitchen.city
            } < /h2>}>
                <Weather weatherForKitchen={weatherForKitchen}/>
                <Demand demand={demand}/>
            </Panel>
        </Col>
    )
}))

const Kitchens = ({kitchenInfo, weather}) => {
    const kitchenComponents = createKitchenComponents(kitchenInfo, weather)
    return (
        <Row
            style={{
            display: 'flex',
            justifyContent: 'space-around'
        }}>
            {kitchenComponents}
        </Row>
    )
}

export default Kitchens