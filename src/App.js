import React, {Component} from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import {
  ApolloProvider,
  createNetworkInterface,
  ApolloClient
} from 'react-apollo'

import Schedule from './components/Schedule/Schedule'
import Config from './components/Config/Config'
import User from './User'

const networkInterface = createNetworkInterface({
  // https://api.graph.cool/simple/v1/cj8ushv4b02pr0134y5lg9fpr looks similar to: `https://api.graph.cool/simple/v1/<PROJECT_ID>`
  uri: 'https://api.graph.cool/simple/v1/cj8ushv4b02pr0134y5lg9fpr'
})

const client = new ApolloClient({networkInterface})

const users = [
  new User(
    17,
    'Lara',
    // Available
    [
      [800, 830, 900, 930, 1000, 1030, 1130, 1200, 1300, 1330], //Monday
      [800, 830, 1030, 1130, 1200, 1400], // Tuesday
      [800, 830, 900, 930, 1000, 1030, 1130, 1200, 1400], // Wednesday
      [800, 830, 900, 930, 1000, 1030, 1130, 1200, 1400], // Thursday
      [800, 830, 900, 930, 1000, 1400], // Friday
      [800, 830, 900, 930, 1000, 1030, 1130, 1200, 1400], // Saturday
      [800, 830, 900, 1130, 1200, 1400] // Sunday
    ],
    // work
    [
      [800, 830, 930, 1000],
      [800, 830, 900, 930, 1000],
      [800, 830, 900, 1000],
      [800, 830, 900],
      [900, 930, 1000],
      [800, 830, 900, 930, 1000],
      [1000]
    ],
    // Lunch
    [1200, 1200, 1200, 1200, 1300, 1230, 1200]
  ),
  new User(
    42,
    'Michel',
    // Available
    [
      [800, 830, 900, 930, 1000, 1030, 1130, 1200, 1300, 1330], //Monday
      [800, 830, 900, 930, 1000, 1030, 1130, 1200, 1400], // Tuesday
      [], // Wednesday
      [], // Thursday
      [800, 830, 900, 930, 1000, 1030, 1130, 1200, 1400], // Friday
      [800, 830, 900, 930, 1000, 1030, 1130, 1200, 1400], // Saturday
      [800, 830, 900, 930, 1000, 1030, 1130, 1200, 1400] // Sunday
    ],
    // work
    [
      [800, 830, 900, 930, 1000],
      [800, 830, 900, 930, 1000],
      [],
      [],
      [800, 830, 900, 930, 1000],
      [800, 830, 900, 930, 1000],
      [800, 830, 900, 930, 1000]
    ],
    // Lunch
    [1200, 1200, 0, 0, 1300, 1230, 1200]
  ),
  new User(
    5,
    'Roger',
    // Available
    [
      [800, 830, 900, 930, 1000, 1030, 1130, 1200, 1300, 1330], //Monday
      [800, 830, 900, 930, 1000, 1030, 1130, 1200, 1400], // Tuesday
      [], // Wednesday
      [], // Thursday
      [800, 830, 900, 930, 1000, 1030, 1130, 1200, 1400], // Friday
      [800, 830, 900, 930, 1000, 1030, 1130, 1200, 1400], // Saturday
      [800, 830, 900, 930, 1000, 1030, 1130, 1200, 1400] // Sunday
    ],
    // work
    [
      [800, 830, 900, 930, 1000],
      [800, 830, 900, 930, 1000],
      [],
      [],
      [800, 830, 900, 930, 1000],
      [800, 830, 900, 930, 1000],
      [800, 830, 900, 930, 1000]
    ],
    // Lunch
    [1200, 1200, 0, 0, 1300, 1230, 1200]
  )
]

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Router>
          <div>
            <Route
              exact
              path="/"
              render={props => <Schedule users={users} />}
            />
            <Route path="/config" render={() => <Config users={users} />} />
          </div>
        </Router>
      </ApolloProvider>
    )
  }
}

export default App
