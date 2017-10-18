import React, {Component} from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'

import Schedule from './components/Schedule/Schedule'
import Config from './components/Config/Config'
import Store from './Store'

Store.load()

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route
            exact
            path="/"
            render={props => <Schedule users={Store.users} />}
          />
          <Route path="/config" render={() => <Config users={Store.users} />} />
        </div>
      </Router>
    )
  }
}

export default App
