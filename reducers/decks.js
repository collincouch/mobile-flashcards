import { RECEIVE_DECKS, ADD_DECK, MARK_ANSWER } from '../actions/decks'
import { ADD_QUESTION } from '../actions/questions'
export default function decks(state = {}, action) {
	switch (action.type) {
		case RECEIVE_DECKS:
			return {
				...state,
				...action.decks
			}
		case ADD_DECK:
			//console.log('ADD_DECK reducer')
			//console.log(action.deck)
			//console.log(action.deck.id)
			return {
				...state,
				[action.deck.id]: action.deck
			}
		case ADD_QUESTION:
			return {
				...state,
				[action.question.deck]: {
					...state[action.question.deck],
					questions: state[action.question.deck].questions.concat([
						action.question.id
					])
				}
			}
		case MARK_ANSWER:
			if (action.isCorrect === true) {
				return {
					...state,
					[action.deckId]: {
						...state[action.deckId],
						quizResults: {
							...state[action.deckId].quizResults,
							correct: state[
								action.deckId
							].quizResults.correct.concat([action.qid]) //
						}
					}
				}
			} else {
				return {
					...state,
					[action.deckId]: {
						...state[action.deckId],
						quizResults: {
							...state[action.deckId].quizResults,
							incorrect: state[
								action.deckId
							].quizResults.incorrect.concat([action.qid]) //
						}
					}
				}
			}

		default:
			return state
	}
}
