import React from 'react'
import moment from 'moment'
import {Row, Col} from 'react-bootstrap'
import {SingleDatePicker} from 'react-dates';
import NumericInput from 'react-numeric-input'
import 'react-dates/lib/css/_datepicker.css';
import '../../../css/date.css'
import {get} from 'lodash'
import PropTypes from 'prop-types'
const styles = {
    centerColumn: {
        display: 'flex',
        justifyContent: 'center'
    }
}
class DateDisplay extends React.Component {
    render() {
        const {date, onDateChange, precipThreshold, onChangeThreshold} = this.props;
        const calendarFocused = get(this.state, 'focused', false)
        return (
            <div style={{
                paddingBottom: 40
            }}>
                <Row>
                    <Col style={styles.centerColumn}>
                        <h4>
                            Click below to change the date
                        </h4>
                    </Col>
                </Row>
                <Row>
                    <Col style={styles.centerColumn}>
                        <SingleDatePicker
                            date={moment(date)}
                            onDateChange={onDateChange}
                            focused={calendarFocused}
                            displayFormat={'dddd MMMM Do YYYY'}
                            numberOfMonths={1}
                            onFocusChange={({focused}) => this.setState({focused})}/>
                    </Col>
                </Row>
                <Row>
                    <Col style={styles.centerColumn}>
                        <NumericInput
                            style={{
                            input: {
                                height: 50,
                                width: 300
                            }
                        }}
                            min={0}
                            max={100}
                            value={precipThreshold * 100}
                            format={(num) => `${num}% precipitation threshold`}
                            onChange={(num) => onChangeThreshold(num)}/>
                    </Col>
                </Row>
            </div>
        )
    }
}

DateDisplay.propTypes = {
    date: PropTypes.string.isRequired,
    onDateChange: PropTypes.func.isRequired,
    onChangeThreshold: PropTypes.func.isRequired,
    precipThreshold: PropTypes.number.isRequired
}

export default DateDisplay