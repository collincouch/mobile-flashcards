import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Platform
} from 'react-native'
import { connect } from 'react-redux'
import { purple, white } from '../utils/colors'
import { handleAddQuestion } from '../actions/questions'
import { NavigationActions } from 'react-navigation'
import SubmitButton from './SubmitButton'

class AddQuestion extends Component {
  state = {
    question: '',
    answer: ''
  }
  submit = e => {
    e.preventDefault()
    const { question, answer } = this.state
    const { dispatch, deck } = this.props

    //console.log(deckName)

    //dispatch to handleAddQuestion,
    //which will update local storage and
    //Redux
    dispatch(handleAddQuestion(deck.id, question, answer))

    this.setState({ question: '', answer: '' })

    // Navigate to Deck Details
    this.toDeckDetails()
  }

  handleChangeQuestion = text => {
    this.setState({ question: text })
  }

  handleChangeAnswer = text => {
    this.setState({ answer: text })
  }

  toDeckDetails = () => {
    //this.props.navigation.dispatch(NavigationActions.back({ key: 'AddDeck' }))
    const { deck } = this.props
    this.props.navigation.navigate('DeckDetail', { id: deck.id })
  }

  render() {
    const { question, answer } = this.state
    const { deck } = this.props

    const { id, name, questions, quizResults } = deck
    return (
      <View>
        <Text style={{ fontSize: 20 }}>{name}</Text>
        <TextInput
          style={styles.input}
          underlineColorAndroid="transparent"
          placeholder="Question"
          placeholderTextColor="#9a73ef"
          autoCapitalize="none"
          onChangeText={this.handleChangeQuestion}
          value={question}
        />

        <TextInput
          style={styles.input}
          underlineColorAndroid="transparent"
          placeholder="Answer"
          placeholderTextColor="#9a73ef"
          autoCapitalize="none"
          onChangeText={this.handleChangeAnswer}
          value={answer}
        />
        <SubmitButton onPress={this.submit}>Submit</SubmitButton>
      </View>
    )
  }
}

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
function mapStateToProps({ decks }, { navigation }) {
  const { deckId } = navigation.state.params
  const deck = decks[deckId]
  return {
    deck: deck
  }
}

export default connect(mapStateToProps)(AddQuestion)
