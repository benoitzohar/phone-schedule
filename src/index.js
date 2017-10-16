import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import Schedule from './components/Schedule/Schedule'
import Config from './components/Config/Config'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import {
  ApolloProvider,
  createNetworkInterface,
  ApolloClient
} from 'react-apollo'
import registerServiceWorker from './registerServiceWorker'

const networkInterface = createNetworkInterface({
  // https://api.graph.cool/simple/v1/cj8ushv4b02pr0134y5lg9fpr looks similar to: `https://api.graph.cool/simple/v1/<PROJECT_ID>`
  uri: 'https://api.graph.cool/simple/v1/cj8ushv4b02pr0134y5lg9fpr'
})

const client = new ApolloClient({networkInterface})

ReactDOM.render(
  <ApolloProvider client={client}>
    <Router>
      <div>
        <Route exact path="/" component={Schedule} />
        <Route path="/config" component={Config} />
      </div>
    </Router>
  </ApolloProvider>,
  document.getElementById('root')
)
registerServiceWorker()
