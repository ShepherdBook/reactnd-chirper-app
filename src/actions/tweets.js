import { saveLikeToggle, saveTweet } from '../utils/api'

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

function createTweet({ text, author, replyingTo }) {
  return {
    type: CREATE_TWEET,
    text,
    author,
    replyingTo
  }
}

function deleteTweet({ id }) {
  return {
    type: DELETE_TWEET,
    id
  }
}

export function handleCreateTweet (info) {
  return (dispatch) => {
    dispatch(createTweet(info))

    return saveTweet(info)
      .catch((error) => {
        console.warn('Error in handleCreateTweet: ', error)
        dispatch(deleteTweet(info))
        alert('Could not create tweet, try again')
      })
  }
}