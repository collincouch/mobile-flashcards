import { saveQuestion } from '../utils/api'
export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const ADD_QUESTION = 'ADD_QUESTION'

export function receiveQuestions(questions) {
	return {
		type: RECEIVE_QUESTIONS,
		questions
	}
}
function addQuestion(question) {
	//console.log('addQuestion')
	//console.log(question)
	return {
		type: ADD_QUESTION,
		question
	}
}

export function handleAddQuestion(deckId, questionText, answerText) {
	console.log('handleAddQuestion ' + questionText + ' ' + answerText)
	return dispatch => {
		return saveQuestion({
			deckId: deckId,
			questionText: questionText,
			answerText: answerText
		})
			.catch(e => {
				console.warn('Error in handleAddQuestion: ', e)
			})
			.then(question => {
				//console.log('begin dispatch')
				//console.log(question)
				dispatch(addQuestion(question))
			})
	}
}
