import React from 'react'
import {Row, Col, Panel} from 'react-bootstrap'
import '../../../css/demand.css'
import PropTypes from 'prop-types'
const overallTextColor = {
    Low: '#005377',
    Normal: '#06A77D',
    Increased: '#D5C67A',
    High: '#F1A208'
}
const overallToText = (overall) => {
    if (overall < 0) {
        return 'Low'
    } else if (overall >= 0 && overall <= 4) {
        return 'Normal'
    } else if (overall >= 5 && overall <= 9) {
        return 'Increased'
    } else {
        return 'High'
    }
}
const getHighestFactor = (demand) => {
    if (demand.overall >= 0) {
        return demand.highest
    } else {
        return 'Nice Weather'
    }
}

const demandDisplay = ({demand}) => {
    const {daily, current} = demand
    const dailyOverallText = overallToText(daily.overall)
    const currentOverallText = overallToText(current.overall)
    const highestCurrentFactor = getHighestFactor(current)
    const highestDailyFactor = getHighestFactor(daily)
    return (
        <div>
            <Row>
                <h3 style={{
                    textAlign: 'center'
                }}>
                    {`Current Demand: ${currentOverallText}`}
                </h3>
                <Col className='circleCol' xs={4}>
                    <div
                        className='demandCircle'
                        style={{
                        borderRadius: '50%',
                        backgroundColor: `${overallTextColor[currentOverallText]}`
                    }}></div>
                </Col>
                <Col className='factorPanel' xs={8}>
                    <Panel header='Highest Factor'>{highestCurrentFactor[0].toUpperCase() + highestCurrentFactor.slice(1)}</Panel>
                </Col>
            </Row>
            <Row style={{
                paddingTop: 30
            }}>
                <h3 style={{
                    textAlign: 'center'
                }}>
                    {`Daily Demand: ${dailyOverallText}`}
                </h3>
                <Col className='circleCol' xs={4}>
                    <div
                        className='demandCircle'
                        style={{
                        borderRadius: '50%',
                        backgroundColor: `${overallTextColor[dailyOverallText]}`
                    }}></div>
                </Col>
                <Col className='factorPanel' xs={8}>
                    <Panel header='Highest Factor'>{highestDailyFactor[0].toUpperCase() + highestDailyFactor.slice(1)}</Panel>
                </Col>
            </Row>
        </div>
    )
}

const factorShape = PropTypes.shape({
    dayFactor: PropTypes.number.isRequired,
    endOfMonthFactor: PropTypes.number.isRequired,
    highest: PropTypes.string.isRequired,
    niceWeatherFactor: PropTypes.number.isRequired,
    overall: PropTypes.number.isRequired,
    weatherFactor: PropTypes.number.isRequired
})

demandDisplay.propTypes = {
    daily: factorShape,
    current: factorShape
}

export default demandDisplay