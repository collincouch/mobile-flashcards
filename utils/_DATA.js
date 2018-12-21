import { AsyncStorage } from 'react-native'
import { formatQuestion } from './helpers'
export const FLASHCARD_DECKS_STORAGE_KEY = 'MobileFlashcards:decks'
export const FLASHCARD_QUESTIONS_STORAGE_KEY = 'MobileFlashcards:questions'

export const decks = {
  '6ni6ok3ym7mf1p33lnez': {
    id: '6ni6ok3ym7mf1p33lnez',
    name: 'Addition Facts',
    timestamp: Date.now(),
    questions: ['8xf0y6ziyjabvozdd253nd', 'am8ehyc8byjqgar0jgpub9'],
    quizResults: {
      correct: [],
      incorrect: []
    }
  }
}

export const questions = {
  '8xf0y6ziyjabvozdd253nd': {
    id: '8xf0y6ziyjabvozdd253nd',
    timestamp: Date.now(),
    deck: '6ni6ok3ym7mf1p33lnez',
    question: '2 + 2',
    answer: '4'
  }
}

function setDummyDeckData() {
  console.log('setDummyDeckData')

  let dummyDecksData = decks

  AsyncStorage.setItem(
    FLASHCARD_DECKS_STORAGE_KEY,
    JSON.stringify(dummyDecksData)
  )

  //we only need dummyDecksData on intial load
  //since the decks list view is the intial view.
  //console.log(dummyDecksData)
  return dummyDecksData
}

function setDummyQuestionData() {
  console.log('setDummyQuestionData')

  let dummyQuestionsData = questions

  AsyncStorage.setItem(
    FLASHCARD_QUESTIONS_STORAGE_KEY,
    JSON.stringify(dummyQuestionsData)
  )

  //we only need dummyDecksData on intial load
  //since the decks list view is the intial view.
  return dummyQuestionsData
}

export function formatDeckResults(results) {
  return results === null ? setDummyDeckData() : results
}

export function formatQuestionResults(results) {
  //console.log('question results: ' + results)
  return results === null ? setDummyQuestionData() : results
}

export function _getDecks() {
  return retrievedItem(FLASHCARD_DECKS_STORAGE_KEY)
    .then(formatDeckResults)
    .then(decks => {
      return { ...decks }
    })
    .catch(error => {
      //this callback is executed when your Promise is rejected
      console.log('Promise is rejected with error: ' + error)
    })
}

export function _getQuestions() {
  return retrievedItem(FLASHCARD_QUESTIONS_STORAGE_KEY)
    .then(formatQuestionResults)
    .then(questions => {
      return { ...questions }
    })
    .catch(error => {
      //this callback is executed when your Promise is rejected
      console.log('Promise is rejected with error: ' + error)
    })
}
async function retrievedItem(key) {
  try {
    const retrievedItem = await AsyncStorage.getItem(key)
    const item = JSON.parse(retrievedItem)
    return item
  } catch (error) {
    console.log(error.message)
  }
  return
}

// export function _saveQuestion(question) {
//   return new Promise((res, rej) => {
//     const deck = question.deck
//     const formattedQuestion = formatQuestion(question)

//     setTimeout(() => {
//       questions = {
//         ...questions,
//         [formattedQuestion.id]: formattedQuestion
//       }

//       decks = {
//         ...decks,
//         [deck]: {
//           ...decks[deck],
//           questions: decks[deck].questions.concat([formattedQuestion.id])
//         }
//       }

//       res(formattedQuestion)
//     }, 1000)
//   })
// }

// export function _saveDeck(deckText) {
//   return new Promise((res, rej) => {
//     const formattedDeck = formatDeck(deckText)

//     setTimeout(() => {
//       decks = {
//         ...decks,
//         [formattedDeck.id]: formattedDeck
//       }

//       res(formattedDeck)
//     }, 1000)
//   })
// }

// export function _saveQuestionAnswer({ did, qid, isCorrect }) {
//   return new Promise((res, rej) => {
//     setTimeout(() => {
//       decks = {
//         ...decks,
//         [did]: {
//           ...decks[did],
//           isCorrect===true?correct: decks[did].correct.concat([qid]):
//           incorrect: decks[did].incorrect.concat([qid])
//         }
//       }
//       res()
//     }, 500)
//   })