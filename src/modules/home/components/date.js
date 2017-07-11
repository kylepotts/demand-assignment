import React from 'react'
import moment from 'moment'
import {Row, Col} from 'react-bootstrap'
import {SingleDatePicker} from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import '../../../css/date.css'
import {get} from 'lodash'
const styles = {
    centerColumn: {
        display: 'flex',
        justifyContent: 'center'
    }
}
class DateDisplay extends React.Component {
    render() {
        const {date, onDateChange} = this.props;
        const calendarFocused = get(this.state, 'focused', false)
        return (
            <div>
                <Row>
                    <Col style={styles.centerColumn}>
                        <SingleDatePicker
                            date={moment(date)}
                            onDateChange={onDateChange}
                            focused={calendarFocused}
                            displayFormat={'dddd MMMM Do YYYY'}
                            onFocusChange={({focused}) => this.setState({focused})}/>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default DateDisplay