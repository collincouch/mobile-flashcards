import { RECEIVE_QUESTIONS, ADD_QUESTION } from '../actions/questions'
export default function questions(state = {}, action) {
	switch (action.type) {
		case RECEIVE_QUESTIONS:
			return {
				...state,
				...action.questions
			}
		case ADD_QUESTION:
			//console.log('ADD_QUESTION reducer')
			//console.log(action.question)
			//console.log(action.question.id)
			return {
				...state,
				[action.question.id]: action.question
			}
		default:
			return state
	}
}
