import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import TextButton from './TextButton'

const DeckDetail = props => {
  const { deck } = props

  //const id = this.props.id
  const { id, name, questions, quizResults } = deck

  return (
    <View>
      <Text style={{ fontSize: 20 }}>{name}</Text>
      <Text style={{ fontSize: 16 }}>{questions.length} Cards</Text>
      <TextButton style={{ margin: 20 }}>START QUIZ</TextButton>
      <TextButton style={{ margin: 20 }}>ADD CARD</TextButton>
    </View>
  )
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
