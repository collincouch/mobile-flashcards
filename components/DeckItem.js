import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { connect } from 'react-redux'

const DeckItem = props => {
  const { deck } = props

  //const id = this.props.id
  const { id, name, questions, quizResults } = deck

  return (
    <View>
      <Text style={{ fontSize: 20 }}>{name}</Text>
      <Text style={{ fontSize: 16 }}>{questions.length} Cards</Text>
    </View>
  )
}

function mapStateToProps({ decks }, { id }) {
  const deck = decks[id]
  return {
    deck: deck
  }
}
export default connect(mapStateToProps)(DeckItem)
