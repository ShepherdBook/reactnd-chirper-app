import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleInitialData } from  '../actions/shared'
// import Dashboard from './Dashboard'
// import NewTweet from './NewTweet'
import LoadingBar from 'react-redux-loading'
import TweetPage from './TweetPage'

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
          : <TweetPage match={{params: {id: '8xf0y6ziyjabvozdd253nd'}}} />}
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