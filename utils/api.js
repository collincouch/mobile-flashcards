import {
	_getDecks,
	_getQuestions,
	_saveDeck,
	_saveQuestion,
	_saveMarkAnswer,
	_resetQuiz,
	_deleteDeck
} from './_DATA'

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

export function deleteDeck(info) {
	console.log('api:deleteDeck ' + info)
	return _deleteDeck(info)
}

export function saveQuestion(info) {
	//console.log('api:saveQuestion ' + info)
	return _saveQuestion(info)
}

export function saveMarkAnswer(info) {
	//console.log('api:saveMarkAnswer ' + info)

	return _saveMarkAnswer(info)
}

export function resetQuiz(info) {
	//console.log('api:resetQuiz ' + info)

	return _resetQuiz(info)
}
