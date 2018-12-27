import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import SubmitButton from './SubmitButton'
import { purple, white } from '../utils/colors'

class DeckDetail extends Component {
  navigateToAddCard = e => {
    const { deck } = this.props
    //console.log('asdfasdf ' + deck.id)
    this.props.navigation.navigate('AddQuestion', { deckId: deck.id })
  }

  navigateToQuizQuestion = e => {
    const { deck } = this.props
    //console.log('asdfasdf ' + deck.id)
    this.props.navigation.navigate('QuizQuestion', { deckId: deck.id })
  }

  render() {
    const { deck } = this.props

    //const id = this.props.id
    const { id, name, questions, quizResults } = deck

    return (
      <View style={styles.container}>
        <Text style={styles.headerStyle}>Mobile Flashcards</Text>
        <View style={[{ flex: 1 }, styles.elementsContainer]}>
          <View style={{ flex: 1, alignItems: 'center' }}>
            <Text style={{ fontSize: 25 }}>{name}</Text>
            <Text style={{ fontSize: 16 }}>{questions.length} Card(s)</Text>
          </View>
          <View style={{ flex: 2 }}>
            {deck.questions.length > 0 && (
              <View style={{ margin: 3 }}>
                <SubmitButton
                  style={{ margin: 1 }}
                  onPress={this.navigateToQuizQuestion}
                >
                  START QUIZ
                </SubmitButton>
              </View>
            )}
            <View style={{ margin: 3 }}>
              <SubmitButton
                style={{ margin: 1 }}
                onPress={this.navigateToAddCard}
              >
                ADD CARD
              </SubmitButton>
            </View>
            <View style={{ margin: 3 }}>
              <SubmitButton style={{ margin: 1 }}>DELETE DECK</SubmitButton>
            </View>
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
  }
}

function mapDispatchToProps(dispatch, { navigation }) {
  const { id } = navigation.state.params
  return {
    goBack: () => navigation.goBack()
  }
}

function mapStateToProps({ decks }, { navigation }) {
  const { id } = navigation.state.params
  const deck = decks[id]
  return {
    deck: deck
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeckDetail)
