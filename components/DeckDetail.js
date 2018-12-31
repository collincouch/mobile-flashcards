import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import SubmitButton from './SubmitButton'
import { purple, white } from '../utils/colors'
import Prompt from 'react-native-actually-usable-prompt'
import { handleDeleteDeck } from '../actions/decks'

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

  delete = e => {
    const { deck } = this.props
    const { dispatch } = this.props

    console.log('dispatch')
    console.log(dispatch)

    confirm(
      'Are you sure you want to delete?',
      'You can still change your mind.',
      '👌',
      '🤔',
      sure => {
        if (sure === true) {
          dispatch(handleDeleteDeck(deck.id)).then(this.toHome())
        }
      }
    )
  }

  toHome = () => {
    console.log('toHome')
    this.props.navigation.navigate('Home')
  }
  render() {
    const { deck } = this.props

    if (deck == null) return null

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
              <SubmitButton style={{ margin: 1 }} onPress={this.delete}>
                DELETE DECK
              </SubmitButton>
            </View>
          </View>
        </View>
        <Prompt ref={ref => (p = ref)} config={config} />
      </View>
    )
  }
}

const config = {
  autoFocus: true,
  clearButtonMode: 'always',
  placeholder: 'Type here ..',
  underlineColorAndroid: 'transparent',
  autoCorrect: false
}

let p

const prompt = (
  title,
  subtitle,
  submitLabel,
  cancelLabel,
  onSubmit,
  onCancel
) =>
  p && // flow-disable-next-line
  p.prompt(title, onSubmit, {
    subtitle,
    submitLabel,
    cancelLabel,
    onCancel
  })

const confirm = (title, subtitle, submitLabel, cancelLabel, onConfirm) =>
  p && // flow-disable-next-line
  p.confirm(title, onConfirm, {
    subtitle,
    submitLabel,
    cancelLabel
  })

const alert = (
  title,
  subtitle,
  submitLabel,
  onAlert // flow-disable-next-line
) => p && p.alert(title, { subtitle, submitLabel, onAlert })

let round = 0
let score = 0

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

// function mapDispatchToProps(dispatch, { navigation }) {
//   const { id } = navigation.state.params

//   return {
//     goBack: () => navigation.goBack()
//   }
// }

function mapStateToProps({ decks }, { navigation }) {
  const { id } = navigation.state.params
  console.log('mapStateToProps ' + id)

  const deck = decks[id]
  return {
    deck: deck
  }
}
export default connect(
  mapStateToProps
  //mapDispatchToProps
)(DeckDetail)
