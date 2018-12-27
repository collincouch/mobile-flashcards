import React, { Component } from 'react'
import { View, Text, StyleSheet, Platform } from 'react-native'
import { connect } from 'react-redux'
import { purple, white } from '../utils/colors'

const DeckItem = props => {
  const { deck } = props

  //const id = this.props.id
  const { id, name, questions, quizResults } = deck

  return (
    <View style={styles.item}>
      <Text style={{ fontSize: 20 }}>{name}</Text>
      <Text style={{ fontSize: 16 }}>{questions.length} Cards</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: white,
    borderRadius: Platform.OS === 'ios' ? 16 : 2,
    padding: 20,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 17,
    justifyContent: 'center',
    shadowRadius: 3,
    shadowOpacity: 0.8,
    shadowColor: 'rgba(0, 0, 0, 0.24)',
    shadowOffset: {
      width: 0,
      height: 3
    }
  }
})

function mapStateToProps({ decks }, { id }) {
  const deck = decks[id]
  return {
    deck: deck
  }
}
export default connect(mapStateToProps)(DeckItem)
