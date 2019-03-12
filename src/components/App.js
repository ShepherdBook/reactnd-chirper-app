import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleInitialData } from  '../actions/shared'
import Dashboard from './Dashboard'
import LoadingBar, { loadingBarMiddleware } from 'react-redux-loading'

class App extends Component {

  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }

  render() {
    return (
      <div>
        <LoadingBar />
        {this.props.loading === true
          ? <h3>Loading...</h3>
          : <Dashboard />}
      </div>
    )
  }
}

function mapStateToProps({ authedUser }) {
  return {
    loading: authedUser === null
  }
}

export default connect(mapStateToProps)(App)