import { saveDeck, saveMarkAnswer } from '../utils/api'
export const RECEIVE_DECKS = 'RECEIVE_DECKS'
export const ADD_DECK = 'ADD_DECK'
export const MARK_ANSWER = 'MARK_ANSWER'

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
