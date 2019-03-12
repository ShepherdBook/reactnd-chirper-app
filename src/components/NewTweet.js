import React, { Component } from 'react'
import { handleCreateTweet } from '../actions/tweets';
import { showLoading, hideLoading } from 'react-redux-loading'

class NewTweet extends Component {
  state ={
    text: ''
  }

  handleChange = (e) => {
    const text = e.target.value

    this.setState(() => ({
      text
    }))
  }

  handleSubmit = (e) => {
    e.preventDefault()

    const { text } = this.state
    const { dispatch, authedUser } = this.props

    dispatch (handleCreateTweet({
      text,
      authedUser,
      replyingTo: null
    }))

    this.setState(() => ({
      text: ''
    }))
  }

  render() {
    const { text } = this.state

    const tweetLeft = 280 - text.length

    // todo: redirect to home / if submitted

    return (
      <div>
        <h3 className='center'>Compose New Tweet</h3>
        <form className='new-tweet' onSubmit={this.handleSubmit}>
          <textarea 
            placeholder="What's happening?" 
            value={text}
            onChange={this.handleChange}
            className='textarea'
            maxLength={280}/>

          {tweetLeft <= 100 && (
          <div className='tweet-length'>{tweetLeft}</div>)}

          <button
            className='btn'
            type='submit'
            disabled={text === ''}>
            Submit
          </button>
        </form>
      </div>
    )
  }
}

export default NewTweet