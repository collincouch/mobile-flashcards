import { saveDeck } from '../utils/api'
export const RECEIVE_DECKS = 'RECEIVE_DECKS'
export const ADD_DECK = 'ADD_DECK'

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
