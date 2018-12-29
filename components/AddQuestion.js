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
import { purple, white, red } from '../utils/colors'
import { handleAddQuestion } from '../actions/questions'
import { NavigationActions } from 'react-navigation'
import SubmitButton from './SubmitButton'

class AddQuestion extends Component {
  state = {
    question: '',
    answer: '',
    questionError: '',
    answerError: ''
  }
  submit = e => {
    e.preventDefault()
    const { question, answer, questionError, answerError } = this.state
    const { dispatch, deck } = this.props

    if (question.trim() !== '' && answer.trim() !== '') {
      //dispatch to handleAddQuestion,
      //which will update local storage and
      //Redux
      dispatch(handleAddQuestion(deck.id, question, answer))

      this.setState({ question: '', answer: '' })

      // Navigate to Deck Details
      this.toDeckDetails()
    } else {
      if (question.trim() === '')
        this.setState({ questionError: 'Question is required' })
      if (answer.trim() === '')
        this.setState({ answerError: 'Answer is required' })
    }
  }

  handleChangeQuestion = text => {
    this.setState({ question: text })
    this.setState({ questionError: '' })
  }

  handleChangeAnswer = text => {
    this.setState({ answer: text })
    this.setState({ answerError: '' })
  }

  toDeckDetails = () => {
    //this.props.navigation.dispatch(NavigationActions.back({ key: 'AddDeck' }))
    const { deck } = this.props
    this.props.navigation.navigate('DeckDetail', { id: deck.id })
  }

  render() {
    const { question, answer, questionError, answerError } = this.state
    const { deck } = this.props

    const { id, name, questions, quizResults } = deck
    return (
      <View style={styles.container}>
        <Text style={styles.headerStyle}>Mobile Flashcards</Text>
        <View style={[{ flex: 1 }, styles.elementsContainer]}>
          <View style={{ flex: 1, alignItems: 'center' }}>
            <Text style={{ fontSize: 25 }}>Add Card</Text>
            <Text style={{ fontSize: 20 }}>{name}</Text>
          </View>
          <View style={{ flex: 2 }}>
            <TextInput
              style={styles.input}
              underlineColorAndroid="transparent"
              placeholder="Question"
              placeholderTextColor="#9a73ef"
              autoCapitalize="none"
              onChangeText={this.handleChangeQuestion}
              value={question}
            />
            <View style={{ alignItems: 'center' }}>
              <Text style={{ color: red }}>{questionError}</Text>
            </View>
            <TextInput
              style={styles.input}
              underlineColorAndroid="transparent"
              placeholder="Answer"
              placeholderTextColor="#9a73ef"
              autoCapitalize="none"
              onChangeText={this.handleChangeAnswer}
              value={answer}
            />
            <View style={{ alignItems: 'center' }}>
              <Text style={{ color: red }}>{answerError}</Text>
            </View>
            <SubmitButton onPress={this.submit}>Submit</SubmitButton>
          </View>
        </View>
      </View>
    )
  }
}

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
  },
  input: {
    margin: 15,
    height: 40,
    borderColor: '#7a42f4',
    borderWidth: 1
  }
}

function mapStateToProps({ decks }, { navigation }) {
  const { deckId } = navigation.state.params
  const deck = decks[deckId]
  return {
    deck: deck
  }
}

export default connect(mapStateToProps)(AddQuestion)
