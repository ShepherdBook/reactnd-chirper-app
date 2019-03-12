import { 
  RECEIVE_TWEETS, 
  TOGGLE_TWEET, 
  CREATE_TWEET, 
  DELETE_TWEET} from '../actions/tweets'

export default function tweets(state = {}, action) {
  switch (action.type) {
    case RECEIVE_TWEETS:
      return {
        ...state,
        ...action.tweets
      }
    case TOGGLE_TWEET:
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          likes: action.hasLiked === true
            ? state[action.id].likes.filter((userId) => userId !== action.authedUser)
            : state[action.id].likes.concat(action.authedUser)
        }
      }
    case CREATE_TWEET:
      return {
        ...state,
        ...state.tweets.concat(action)
      }
    case DELETE_TWEET:
      return {
        ...state,
        ...state.tweets.filter(tweet => tweet.id !== action.id)
      }
    default:
      return state;
  }
}