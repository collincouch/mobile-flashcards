import { saveDeck, saveMarkAnswer, resetQuiz } from '../utils/api'
export const RECEIVE_DECKS = 'RECEIVE_DECKS'
export const ADD_DECK = 'ADD_DECK'
export const MARK_ANSWER = 'MARK_ANSWER'
export const RESET_QUIZ = 'RESET_QUIZ'

export function receiveDecks(decks) {
	return {
		type: RECEIVE_DECKS,
		decks
	}
}

function addDeck(deck) {
	//console.log('addDeck')
	//console.log(deck)
	return {
		type: ADD_DECK,
		deck
	}
}

function markAnswer({ deckId, qid, isCorrect }) {
	return {
		type: MARK_ANSWER,
		deckId,
		qid,
		isCorrect
	}
}

function clearQuiz(deckId) {
	return {
		type: RESET_QUIZ,
		deckId
	}
}

export function handleAddDeck(deckName) {
	//console.log('handleAddDeck' + deckName)
	return dispatch => {
		return saveDeck(deckName)
			.catch(e => {
				console.warn('Error in handleAddDeck: ', e)
			})
			.then(deck => {
				//console.log('begin dispatch')
				//console.log(deck)
				dispatch(addDeck(deck))
			})
	}
}

export function handleResetQuiz(deckId) {
	// return () => {
	// 	console.log('Action-Decks: handleResetQuiz' + deckId)
	// }

	return dispatch => {
		return resetQuiz(deckId)
			.catch(e => {
				console.warn('Error in handleResetQuiz: ', e)
			})
			.then(deckId => {
				//console.log('begin dispatch')
				//console.log(deck)
				dispatch(clearQuiz(deckId))
			})
	}
}

export function handleAddAnswer(deckId, qid, isCorrect) {
	//console.log('handleAddAnswer')
	return dispatch => {
		return saveMarkAnswer({ deckId, qid, isCorrect })
			.catch(e => {
				console.warn('Error in handleAddAnswer: ', e)
			})
			.then(answer => {
				console.log('begin dispatch')
				console.log(answer)
				dispatch(markAnswer(answer))
			})
	}
}
