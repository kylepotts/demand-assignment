import React from 'react';
import {Route} from 'react-router-dom'
import {Navbar} from 'react-bootstrap'
import Home from './modules/home/containers/home'
import logo from './cluster_truck_logo.png'

const styles = {
  navBar: {
    backgroundColor: "rgb(44,47,49)"
  },
  navHeader: {
    height: 68
  }
}

const App = () => (
  <div className="app">
    <Navbar style={styles.navBar}>
      <Navbar.Header style={styles.navHeader}>
        <Navbar.Brand>
          <img
            alt="cluster truck logo"
            src={logo}
            style={{
            height: 80,
            paddingTop: 4
          }}/>
        </Navbar.Brand>
      </Navbar.Header>
    </Navbar>
    <div>
      <Route exact path="/" component={Home}/>
      <Route path="/location/:locationName" component={Home}/>
    </div>
  </div>
)

export default App