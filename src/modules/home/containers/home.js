// @flow
import React from 'react'
import {connect} from 'react-redux'
import {compose, pure} from 'recompose';
import * as kitchenActions from '../../../actions/creators/kitchenActions'
import * as weatherActions from '../../../actions/creators/weatherActions'
import {Grid, Row, Col} from 'react-bootstrap'
import DateDisplay from '../components/date'
import Kitchens from '../components/kitchens'

class Home extends React.Component {
  props : {
    getKitchenInfo: () => Promise < any >,
    getWeatherForLocation: ({date: string, lat: string, lng: string, location: string}) => Promise < any >,
    changeDate: () => Promise < any >,
    kitchenInfo: {
      isLoading: boolean,
      success: boolean,
      result: Array < any >
    },
    weather: {
      isLoading: boolean,
      success: boolean,
      date: string,
      result: any
    }
  }
  componentWillMount() {
    const {getKitchenInfo} = this.props
    getKitchenInfo()
  }
  componentWillReceiveProps(nextProps) {
    const {kitchenInfo, weather, getWeatherForLocation} = nextProps;
    if (kitchenInfo.result.length !== 0 && !weather.isLoading && !weather.success) {
      const kitchenSubset = kitchenInfo
        .result
        .map((kitchen) => {
          const lat = kitchen.location.lat
          const lng = kitchen.location.lng
          const name = kitchen.name
          const date = weather.date
          return {lat, lng, name, date}
        })
      getWeatherForLocation(kitchenSubset)
    }
  }
  render() {
    const {weather, changeDate, kitchenInfo} = this.props;
    const selectedDate = weather.date;
    return (
      <div>
        <Grid>
          <DateDisplay date={selectedDate} onDateChange={changeDate}/>
          <Kitchens kitchenInfo={kitchenInfo} weather={weather}/>
        </Grid>
      </div>
    )
  }
}

export default compose(connect((state) => ({kitchenInfo: state.kitchenInfo, weather: state.weather}), {
  ...kitchenActions,
  ...weatherActions
}), pure)(Home)