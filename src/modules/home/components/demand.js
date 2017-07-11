import React from 'react'
import {Row, Col, ListGroup, ListGroupItem, Panel} from 'react-bootstrap'
import '../../../css/demand.css'
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
                <Col xs={6}>
                    <div
                        className='demandCircle'
                        style={{
                        borderRadius: '50%',
                        backgroundColor: `${overallTextColor[currentOverallText]}`
                    }}></div>
                </Col>
                <Col xs={6}>
                    <Panel header='Highest Factor'>{highestCurrentFactor}</Panel>
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
                <Col xs={6}>
                    <div
                        className='demandCircle'
                        style={{
                        borderRadius: '50%',
                        backgroundColor: `${overallTextColor[dailyOverallText]}`
                    }}></div>
                </Col>
                <Col xs={6}>
                    <Panel header='Highest Factor'>{highestDailyFactor}</Panel>
                </Col>
            </Row>
        </div>
    )
}

export default demandDisplay