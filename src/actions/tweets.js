import { saveLikeToggle, saveTweet } from '../utils/api'
import { showLoading, hideLoading } from 'react-redux-loading'

export const RECEIVE_TWEETS = 'RECEIVE_TWEETS'
export const TOGGLE_TWEET = 'TOGGLE_TWEET'
export const CREATE_TWEET = 'CREATE_TWEET'
export const DELETE_TWEET = 'DELETE_TWEET'


export function receiveTweets (tweets) {
  return {
    type: RECEIVE_TWEETS,
    tweets
  }
}

function toggleTweet({ id, authedUser, hasLiked }) {
  return {
    type: TOGGLE_TWEET,
    id,
    authedUser,
    hasLiked,
  }
}

export function handleToggleTweet (info) {
  return (dispatch) => {
    dispatch(toggleTweet(info))

    return saveLikeToggle(info)
      .catch((e) => {
        console.warn('Error in handleToggleTweet: ', e)
        dispatch(toggleTweet(info))
        alert('Could not toggle, please try again')
      })
  }
}

function createTweet(tweet) {
  return {
    type: CREATE_TWEET,
    tweet
  }
}

export function handleCreateTweet (text, replyingTo) {
  return (dispatch, getState) => {
    const { authedUser } = getState()

     dispatch(showLoading())

     return saveTweet({
      text,
      author: authedUser,
      replyingTo
    })
      .then((tweet) => dispatch(createTweet(tweet)))
      .then(() => dispatch(hideLoading()))
  }
}