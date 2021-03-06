import { AsyncStorage } from 'react-native'
import { formatQuestion, formatDeck } from './helpers'
export const FLASHCARD_DECKS_STORAGE_KEY = 'MobileFlashcards:decks'
export const FLASHCARD_QUESTIONS_STORAGE_KEY = 'MobileFlashcards:questions'

export const decks = {
  '6ni6ok3ym7mf1p33lnez': {
    id: '6ni6ok3ym7mf1p33lnez',
    name: 'Addition Facts',
    timestamp: Date.now(),
    questions: ['8xf0y6ziyjabvozdd253nd'],
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
  //console.log('setDummyDeckData')

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
  //console.log('setDummyQuestionData')

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
  //AsyncStorage.clear()
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

export function _saveDeck(deckText) {
  //console.log('_Data:_saveDeck ' + deckText)
  const formattedDeck = formatDeck(deckText)
  //console.log(formattedDeck)
  return mergeItem(FLASHCARD_DECKS_STORAGE_KEY, {
    [formattedDeck.id]: formattedDeck
  }).then(() => {
    return formattedDeck
  })
}

export function _deleteDeck(deckId) {
  //console.log('_deleteDeck ' + deckId)
  return _getDecks()
    .then(decks => {
      //console.log(decks)

      //let obj = { ...decks } // make a copy so that the original object is not directly modified.
      delete decks[deckId]

      storeItem(FLASHCARD_DECKS_STORAGE_KEY, decks)
    })
    .then(() => {
      return deckId
    })
    .catch(e => {
      console.warn('Error in _deleteDeck: ', e)
    })
}

export function _saveQuestion(question) {
  //console.log('_Data:_saveQuestion ' + question)
  const formattedQuestion = formatQuestion(question)

  //console.log(formattedQuestion)
  return mergeItem(FLASHCARD_QUESTIONS_STORAGE_KEY, {
    [formattedQuestion.id]: formattedQuestion
  })
    .then(() => {
      _getDecks().then(decks => {
        //add quesitonId to decks.question array
        decks = {
          ...decks,
          [formattedQuestion.deck]: {
            ...decks[formattedQuestion.deck],
            questions: decks[formattedQuestion.deck].questions.concat([
              formattedQuestion.id
            ])
          }
        }

        storeItem(FLASHCARD_DECKS_STORAGE_KEY, decks)
        //console.log(formattedQuestion)
        //console.log('updateding decks')
        //console.log(decks)
      })
    })
    .then(() => {
      return formattedQuestion
    })
}

export function _saveMarkAnswer(answer) {
  return _getDecks()
    .then(decks => {
      if (answer.isCorrect === true) {
        decks = {
          ...decks,
          [answer.deckId]: {
            ...decks[answer.deckId],
            quizResults: {
              ...decks[answer.deckId].quizResults,
              correct: decks[answer.deckId].quizResults.correct.concat([
                answer.qid
              ]) //
            }
          }
        }
      } else {
        decks = {
          ...decks,
          [answer.deckId]: {
            ...decks[answer.deckId],
            quizResults: {
              ...decks[answer.deckId].quizResults,
              incorrect: decks[answer.deckId].quizResults.incorrect.concat([
                answer.qid
              ]) //
            }
          }
        }
      }
      storeItem(FLASHCARD_DECKS_STORAGE_KEY, decks)
    })
    .then(() => {
      //console.log('returning answer')
      //console.log(answer)
      return answer
    })
    .catch(e => {
      console.warn('Error in handleAddAnswer: ', e)
    })
}

export function _resetQuiz(deckId) {
  //console.log('sadfasdasd ' + deckId)
  return _getDecks()
    .then(decks => {
      decks = {
        ...decks,
        [deckId]: {
          ...decks[deckId],
          quizResults: {
            ...decks[deckId].quizResults,
            correct: [],
            //...deckId].quizResults,
            incorrect: []
          }
        }
      }
      storeItem(FLASHCARD_DECKS_STORAGE_KEY, decks)
    })
    .then(() => {
      //console.log('_resetQuiz' + deckId)
      return deckId
    })
    .catch(e => {
      console.warn('Error in _resetQuiz: ', e)
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

async function mergeItem(key, item) {
  try {
    //console.log(JSON.stringify(item))
    //we want to wait for the Promise returned by AsyncStorage.setItem()
    //to be resolved to the actual value before returning the value
    await AsyncStorage.mergeItem(key, JSON.stringify(item))

    return item
  } catch (error) {
    console.log(error.message)
    return null
  }
}

async function storeItem(key, item) {
  try {
    //console.log(JSON.stringify(item))
    //we want to wait for the Promise returned by AsyncStorage.setItem()
    //to be resolved to the actual value before returning the value
    await AsyncStorage.setItem(key, JSON.stringify(item))

    return item
  } catch (error) {
    console.log(error.message)
    return null
  }
}
