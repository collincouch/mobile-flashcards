import { _getDecks, _getQuestions, _saveDeck, _saveQuestion } from './_DATA'

export function getInitialData() {
	//console.log('getInitialData')
	return Promise.all([_getDecks(), _getQuestions()]).then(
		([decks, questions]) => ({
			decks,
			questions
		})
	)
}

export function saveDeck(info) {
	//console.log('api:saveDeck ' + info)
	return _saveDeck(info)
}

export function saveQuestion(info) {
	//console.log('api:saveQuestion ' + info)
	return _saveQuestion(info)
}
