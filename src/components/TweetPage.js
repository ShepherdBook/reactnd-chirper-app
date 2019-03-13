import React, { Component } from 'react'
import { connect } from 'react-redux'
import Tweet from './Tweet'
import NewTweet from './NewTweet'

class TweetPage extends Component {
  render() {
    const { id, replies } = this.props
    console.log('props are ' , this.props)
    return (
      <div>
        <Tweet id={id} />
        <NewTweet id={id} />
        {replies.length !== 0 && <h3 className='center'>Replies</h3>}
        <ul>
          {replies.map((reply) => (
            <li key={reply}>
              <Tweet id={reply} />
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

function mapStateToProps ({ authedUser, tweets, users }, props) {
  const { id } = props.match.params

  return {
    id,
    replies: !tweets[id] // If there is not a tweet with this id
      ? [] // replies is empty
      : tweets[id].replies.sort((a, b) => tweets[b].timestamp - tweets[a].timestamp) // replies is all replies, newest first
  }
}

export default connect(mapStateToProps)(TweetPage)