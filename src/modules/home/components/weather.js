import React from 'react'
import {Row, Col} from 'react-bootstrap'
import SkyCons from 'react-skycons'
import PropTypes from 'prop-types'
const weatherDisplay = ({weatherForKitchen}) => {
    return (
        <div
            className='weatherDisplay'
            style={{
            display: 'flex',
            alignContent: 'center',
            justifyContent: 'center'
        }}>
            <Row style={{
                marginLeft: -30
            }}>
                {weatherForKitchen.iconCurrent !== ''
                    ? <SkyCons
                            style={{
                            width: 200
                        }}
                            className='weatherIcon'
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

weatherDisplay.propTypes = {
    iconCurrent: PropTypes.string,
    tempCurrent: PropTypes.number
}

export default weatherDisplay