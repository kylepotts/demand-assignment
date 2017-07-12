import React from 'react'
import {connect} from 'react-redux'
import {compose, pure} from 'recompose';
import * as kitchenActions from '../../../actions/creators/kitchenActions'
import * as weatherActions from '../../../actions/creators/weatherActions'
import {Grid} from 'react-bootstrap'
import DateDisplay from '../components/date'
import Kitchens from '../components/kitchens'
import Halogen from 'halogen'
import PropTypes from 'prop-types'

class Home extends React.Component {
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
    const {weather, changeDate, kitchenInfo, changePrecipThreshold} = this.props;
    const selectedDate = weather.date;
    if (!weather.isLoading && !kitchenInfo.isLoading) {
      return (
        <div>
          <Grid>
            <DateDisplay
              date={selectedDate}
              onDateChange={changeDate}
              precipThreshold={weather.precipThreshold}
              onChangeThreshold={changePrecipThreshold}/>
            <Kitchens kitchenInfo={kitchenInfo} weather={weather}/>
          </Grid>
        </div>
      )
    } else {
      return (
        <div
          className='loader'
          style={{
          display: 'flex',
          justifyContent: 'center',
          paddingTop: 400
        }}>
          <Halogen.MoonLoader color='black'/>
        </div>
      )
    }

  }
}

Home.propTypes = {
  weather: PropTypes
    .shape({result: PropTypes.array.isRequired, isLoading: PropTypes.bool.isRequired, success: PropTypes.bool.isRequired, date: PropTypes.string.isRequired, precipThreshold: PropTypes.number.isRequired})
    .isRequired,
  changeDate: PropTypes.func.isRequired,
  changePrecipThreshold: PropTypes.func.isRequired,
  kitcheInfo: PropTypes.shape({result: PropTypes.array.isRequired, isLoading: PropTypes.bool.isRequired, success: PropTypes.bool.isRequired})
}

export default compose(connect((state) => ({kitchenInfo: state.kitchenInfo, weather: state.weather}), {
  ...kitchenActions,
  ...weatherActions
}), pure)(Home)