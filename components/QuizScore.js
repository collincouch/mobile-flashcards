import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import SubmitButton from './SubmitButton'
import { purple, white } from '../utils/colors'
import { handleAddAnswer } from '../actions/decks'

class QuizScore extends Component {
  render() {
    const { deck, totalQuestions, numberOfCorrect, percentage } = this.props

    //const id = this.props.id
    const { id, name, questions, quizResults } = deck
    //const { id, question, answer } = question
    //console.log(unAnsweredQuestions)
    //console.log(showAnswer)

    return (
      <View style={styles.container}>
        <Text style={{ fontSize: 20 }}>{name}</Text>
        <Text style={{ fontSize: 16 }}>Your Score {percentage}</Text>

        <SubmitButton style={{ margin: 1 }}>Show Answer</SubmitButton>
      </View>
    )
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

function mapStateToProps({ decks }, { navigation }) {
  const { deckId } = navigation.state.params
  const deck = decks[deckId]

  const totalQuestions = deck.questions.length

  const numberOfCorrect = deck.quizResults.correct.length
  const numberOfIncorrect = deck.quizResults.incorrect.length

  const percentage = Math.floor((numberOfCorrect / totalQuestions) * 100)

  return {
    deck: deck,
    totalQuestions: totalQuestions,
    numberOfCorrect: numberOfCorrect,
    percentage: percentage
  }
}
export default connect(
  mapStateToProps
  //mapDispatchToProps
)(QuizScore)
