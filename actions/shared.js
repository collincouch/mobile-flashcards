import { getInitialData } from '../utils/api'
import { receiveDecks } from './decks'
import { receiveQuestions } from './questions'

export function handleInitialData() {
	return dispatch => {
		return getInitialData()
			.then(({ decks, questions }) => {
				//console.log({ decks })
				dispatch(receiveDecks(decks))
				dispatch(receiveQuestions(questions))
			})
			.catch(error => {
				console.log(error.message)
			})
	}
}
