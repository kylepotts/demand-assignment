import React from 'react'
import {Row, Col} from 'react-bootstrap'

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
    } else if (overall > 5 && overall < 9) {
        return 'Increased'
    } else {
        return 'High'
    }
}

const demandDisplay = ({demand}) => {
    const {daily, current} = demand
    const dailyOverallText = overallToText(daily.overall)
    const currentOverallText = overallToText(current.overall)
    return (
        <div>
            <Row>
                <Col>
                    <h3>{`Current Demand: ${currentOverallText}`}
                    </h3>
                </Col>
            </Row>
            <Row>
                <Col
                    style={{
                    width: 300,
                    height: 300,
                    borderRadius: 400,
                    backgroundColor: `${overallTextColor[currentOverallText]}`
                }}></Col>
            </Row>
            <Row>
                <Col style={{
                    width: '60%'
                }}>
                    <h4>{current.highest}</h4>
                </Col>
            </Row>
            <Row>
                <Col>
                    <h3>{`Daily Demand: ${dailyOverallText}`}
                    </h3>
                </Col>
            </Row>
            <Row>
                <Col
                    style={{
                    width: 300,
                    height: 300,
                    borderRadius: 400,
                    backgroundColor: `${overallTextColor[dailyOverallText]}`
                }}></Col>
            </Row>
            <Row>
                <Col>{current.highest}</Col>
            </Row>
        </div>
    )
}

export default demandDisplay