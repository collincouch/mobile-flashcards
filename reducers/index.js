import { combineReducers } from 'redux'

import questions from './questions'
import decks from './decks'

export default combineReducers({
	decks,
	questions
})
