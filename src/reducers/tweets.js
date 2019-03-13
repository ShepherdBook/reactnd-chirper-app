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
      const { tweet } = action

      let replyingTo = {}
      if (tweet.replyingTo !== null) { // If the new tweet is a reply
        replyingTo = {
          [tweet.replyingTo]: { // Find the tweet being replied to
            ...state[tweet.replyingTo], // Get the existing properties of it
            replies: state[tweet.replyingTo].replies.concat([tweet.id]) // Set the replies equal to the old replies plus this tweet's id
          }
        }
      } 

      return {
        ...state,
        [tweet.id]: tweet,
        ...replyingTo
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