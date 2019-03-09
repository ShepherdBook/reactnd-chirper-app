import { combineReducers } from 'redux'
import authedUser from '../reducers/authedUser'
import tweets from '../reducers/tweets'
import users from '../reducers/users'

export default combineReducers({
  authedUser,
  users,
  tweets
})