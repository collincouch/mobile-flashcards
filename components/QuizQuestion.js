import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import SubmitButton from './SubmitButton'
import { purple, white } from '../utils/colors'
import { handleAddAnswer } from '../actions/decks'

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

    // this.setState(state => {
    //   return {
    //     showAnswer: !state.showAnswer
    //   }
    // })
  }

  toDeckDetails = () => {
    console.log('to deck detail')
    //this.props.navigation.dispatch(NavigationActions.back({ key: 'AddDeck' }))
    const { deck } = this.props
    this.props.navigation.navigate('QuizScore', { deckId: deck.id })
  }
  render() {
    const { showAnswer } = this.state
    const { deck, unAnsweredQuestions, nextQuestion } = this.props

    //const id = this.props.id
    const { id, name, questions, quizResults } = deck
    //const { id, question, answer } = question
    //console.log(unAnsweredQuestions)
    //console.log(showAnswer)

    console.log('next quesion is')
    console.log(nextQuestion)
    if (nextQuestion == null) {
      console.log('it is null')
      this.toDeckDetails()
      return null
    } else {
      return (
        <View style={styles.container}>
          <Text style={{ fontSize: 20 }}>{name}</Text>
          <Text style={{ fontSize: 16 }}>{nextQuestion.question}</Text>
          {showAnswer ? (
            <View>
              <Text style={{ fontSize: 16 }}>{nextQuestion.answer}</Text>
              <SubmitButton
                style={{ margin: 1 }}
                onPress={() => this.handleShowHideAnswer()}
              >
                Hide Answer
              </SubmitButton>
              <SubmitButton
                style={{ margin: 1 }}
                onPress={() => this.handleAnswer(true)}
              >
                Correct
              </SubmitButton>
              <SubmitButton
                style={{ margin: 1 }}
                onPress={() => this.handleAnswer(false)}
              >
                Incorrect
              </SubmitButton>
            </View>
          ) : (
            <SubmitButton
              style={{ margin: 1 }}
              onPress={() => this.handleShowHideAnswer()}
            >
              Show Answer
            </SubmitButton>
          )}
        </View>
      )
    }
  }
}
// onPress={() =>
//   this.props.navigation.navigate('AddQuestion', {
//     id: deck.id
//   })
// }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: white
  },
  row: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center'
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 30,
    marginRight: 30
  }
})

// function mapDispatchToProps(dispatch, { navigation }) {
//   const { id } = navigation.state.params
//   return {
//     goBack: () => navigation.goBack()
//   }
// }

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
  return {
    deck: deck,
    unAnsweredQuestions: unAnsweredQuestions,
    nextQuestion: nextQuestion
  }
}
export default connect(
  mapStateToProps
  //mapDispatchToProps
)(QuizQuestion)
