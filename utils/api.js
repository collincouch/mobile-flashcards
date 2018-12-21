import { _getDecks, _getQuestions } from './_DATA'

export function getInitialData() {
	//console.log('getInitialData')
	return Promise.all([_getDecks(), _getQuestions()]).then(
		([decks, questions]) => ({
			decks,
			questions
		})
	)
}
