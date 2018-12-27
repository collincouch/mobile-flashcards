import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import SubmitButton from './SubmitButton'
import { purple, white } from '../utils/colors'
import { handleAddAnswer, handleResetQuiz } from '../actions/decks'
import QuizScore from './QuizScore'
import { clearLocalNotification, setLocalNotification } from '../utils/helpers'

class QuizQuestion extends Component {
  state = {
    showAnswer: false
  }

  handleShowHideAnswer = () => {
    this.setState(state => {
      return {
        showAnswer: !state.showAnswer
      }
    })
  }
  handleAnswer = isCorrect => {
    //dispatch to handleDeck,
    //which will update local storage and
    //Redux

    const { deck, nextQuestion } = this.props
    const { dispatch } = this.props
    dispatch(handleAddAnswer(deck.id, nextQuestion.id, isCorrect))

    this.handleShowHideAnswer()
  }

  restartQuiz = e => {
    e.preventDefault()

    const { deck, dispatch } = this.props

    //dispatch to handleResetQuiz
    //which will update local storage and
    //Redux

    dispatch(handleResetQuiz(deck.id))

    // Navigate to QuizQuestion
    //this.toQuizQuestion()
  }

  toDeckDetails = () => {
    //this.props.navigation.dispatch(NavigationActions.back({ key: 'AddDeck' }))
    const { deck } = this.props
    this.props.navigation.navigate('DeckDetail', { id: deck.id })
  }

  toDeckDetails = () => {
    //this.props.navigation.dispatch(NavigationActions.back({ key: 'AddDeck' }))
    const { deck } = this.props
    this.props.navigation.navigate('DeckDetail', { id: deck.id })
  }

  getQuestionNumber = (numberOfCorrect, numberOfIncorrect) => {
    return numberOfCorrect + numberOfIncorrect + 1
  }

  render() {
    const { showAnswer } = this.state
    const {
      deck,
      unAnsweredQuestions,
      nextQuestion,
      quizComplete,
      percentage,
      numberOfCorrect,
      numberOfIncorrect
    } = this.props

    //const id = this.props.id
    const { id, name, questions, quizResults } = deck

    if (nextQuestion == null) {
      // Clear local notification
      clearLocalNotification().then(setLocalNotification)

      return (
        <QuizScore
          deckName={deck.name}
          percentage={percentage}
          numberOfCorrect={numberOfCorrect}
          numberOfIncorrect={numberOfIncorrect}
          onReset={this.restartQuiz}
          onBackToDeck={this.toDeckDetails}
        />
      )
    }

    const questionNumber = numberOfCorrect + numberOfCorrect + 1

    const quesitonNumberText = `Question ${questionNumber} of ${
      questions.length
    }`

    return (
      <View style={styles.container}>
        <Text style={styles.headerStyle}>Mobile Flashcards</Text>
        <View style={[{ flex: 1 }, styles.elementsContainer]}>
          <View style={{ flex: 1, alignItems: 'center' }}>
            <Text style={{ fontSize: 25 }}>{name}</Text>
            <Text style={{ fontSize: 10 }}>{quesitonNumberText}</Text>
            <Text style={{ fontSize: 20, marginTop: 20 }}>
              {nextQuestion.question}
            </Text>
            {showAnswer && (
              <View>
                <Text style={{ fontSize: 15, marginTop: 40 }}>Answer</Text>
                <Text style={{ fontSize: 20, marginTop: 10 }}>
                  {nextQuestion.answer}
                </Text>
              </View>
            )}
          </View>
          <View style={{ flex: 2 }}>
            {showAnswer ? (
              <View style={styles.center}>
                <View style={{ margin: 3, marginTop: 10 }}>
                  <SubmitButton
                    style={{ margin: 1 }}
                    onPress={() => this.handleShowHideAnswer()}
                  >
                    Hide Answer
                  </SubmitButton>
                </View>
                <View style={{ margin: 3 }}>
                  <SubmitButton
                    style={{ margin: 1 }}
                    onPress={() => this.handleAnswer(true)}
                  >
                    Correct
                  </SubmitButton>
                </View>
                <View style={{ margin: 3 }}>
                  <SubmitButton
                    style={{ margin: 1 }}
                    onPress={() => this.handleAnswer(false)}
                  >
                    Incorrect
                  </SubmitButton>
                </View>
              </View>
            ) : (
              <View style={{ margin: 3 }}>
                <SubmitButton
                  style={{ margin: 1 }}
                  onPress={() => this.handleShowHideAnswer()}
                >
                  Show Answer
                </SubmitButton>
              </View>
            )}
          </View>
        </View>
      </View>
    )
  }
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: white
//   },
//   row: {
//     flexDirection: 'row',
//     flex: 1,
//     alignItems: 'center'
//   },
//   center: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginLeft: 30,
//     marginRight: 30
//   }
// })

const styles = {
  container: {
    marginTop: 48,
    flex: 1
  },
  headerStyle: {
    fontSize: 36,
    textAlign: 'center',
    fontWeight: '100',
    marginBottom: 24
  },
  elementsContainer: {
    marginLeft: 24,
    marginRight: 24,
    marginBottom: 24
  }
}

function mapStateToProps({ decks, questions }, { navigation }) {
  const { deckId } = navigation.state.params
  const deck = decks[deckId]
  //get all questions that don't exist in quiz results
  const unAnsweredQuestions = deck.questions.filter(function(item) {
    return (
      !deck.quizResults.correct.includes(item) &&
      !deck.quizResults.incorrect.includes(item)
    )
  })
  const nextQuestion = unAnsweredQuestions && questions[unAnsweredQuestions[0]]
  const totalQuestions = deck.questions.length

  const numberOfCorrect = deck.quizResults.correct.length
  const numberOfIncorrect = deck.quizResults.incorrect.length

  const percentage = Math.floor((numberOfCorrect / totalQuestions) * 100)

  return {
    deck: deck,
    unAnsweredQuestions: unAnsweredQuestions,
    nextQuestion: nextQuestion,
    numberOfCorrect: numberOfCorrect,
    numberOfIncorrect: numberOfIncorrect,
    percentage: percentage
  }
}
export default connect(
  mapStateToProps
  //mapDispatchToProps
)(QuizQuestion)
