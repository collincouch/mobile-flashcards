import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import SubmitButton from './SubmitButton'
import { purple, white } from '../utils/colors'

class DeckDetail extends Component {
  navigatetoAddCard = e => {
    const { deck } = this.props
    //console.log('asdfasdf ' + deck.id)
    this.props.navigation.navigate('AddQuestion', { deckId: deck.id })
  }

  render() {
    const { deck } = this.props

    //const id = this.props.id
    const { id, name, questions, quizResults } = deck

    return (
      <View style={styles.container}>
        <Text style={{ fontSize: 20 }}>{name}</Text>
        <Text style={{ fontSize: 16 }}>{questions.length} Cards</Text>

        <SubmitButton style={{ margin: 1 }}>START QUIZ</SubmitButton>
        <SubmitButton style={{ margin: 1 }} onPress={this.navigatetoAddCard}>
          ADD CARD
        </SubmitButton>
        <SubmitButton style={{ margin: 1 }}>DELETE DECK</SubmitButton>
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
