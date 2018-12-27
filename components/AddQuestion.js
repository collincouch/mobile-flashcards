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
      <View style={styles.container}>
        <View style={{ alignItems: 'center', marginTop: 150 }}>
          <Text style={{ fontSize: 25 }}>{name}</Text>
        </View>
        <View style={[styles.center, { marginTop: -350 }]}>
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
  // row: {
  //   flexDirection: 'row',
  //   flex: 1,
  //   alignItems: 'center'
  // },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 30,
    marginRight: 30
  },
  input: {
    margin: 15,
    height: 40,
    borderColor: '#7a42f4',
    borderWidth: 1,
    //flexDirection: 'row',
    //flex: 1
    width: 300
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
