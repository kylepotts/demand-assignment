import React from 'react'
import {Row, Col} from 'react-bootstrap'
import SkyCons from 'react-skycons'
const weatherDisplay = ({weatherForKitchen}) => {
    return (
        <div>
            <Row style={{
                marginLeft: -30
            }}>
                {weatherForKitchen.iconCurrent !== ''
                    ? <SkyCons
                            style={{
                            width: 200
                        }}
                            color='cyan'
                            icon={weatherForKitchen
                            .iconCurrent
                            .replace(/[-]/g, "_")
                            .toUpperCase()}/>
                    : null
}
            </Row>
            <Row>
                <Col>
                    <b>{`${weatherForKitchen
                            .summaryCurrent} ${Math
                            .round(weatherForKitchen.tempCurrent)}°`}</b>
                </Col>
            </Row>
        </div>
    )
}

export default weatherDisplay