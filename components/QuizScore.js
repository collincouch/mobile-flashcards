import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import SubmitButton from './SubmitButton'
import { purple, white } from '../utils/colors'
//import { handleResetQuiz } from '../actions/decks'

export default function QuizScore({
  deckName,
  percentage,
  numberOfCorrect,
  numberOfIncorrect,
  onReset,
  onBackToDeck
}) {
  return (
    <View style={styles.container}>
      <Text style={styles.headerStyle}>Mobile Flashcards</Text>
      <View style={[{ flex: 1 }, styles.elementsContainer]}>
        <View style={{ flex: 1, alignItems: 'center' }}>
          <Text style={{ fontSize: 25 }}>Quiz Score</Text>
          <Text style={{ fontSize: 20 }}>{deckName}</Text>
          <Text style={{ fontSize: 16 }}>Your Score {percentage} %</Text>
        </View>
        <View style={{ flex: 2 }}>
          <View style={{ margin: 3 }}>
            <SubmitButton style={{ margin: 1 }} onPress={onReset}>
              RESTART QUIZ
            </SubmitButton>
          </View>
          <View style={{ margin: 3 }}>
            <SubmitButton style={{ margin: 1 }} onPress={onBackToDeck}>
              BACK TO DECK
            </SubmitButton>
          </View>
        </View>
      </View>
    </View>
  )
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: white
//   },
//   row: {
//     flexDirection: 'row',
//     flex: 1,
//     alignItems: 'center'
//   },
//   center: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginLeft: 30,
//     marginRight: 30
//   }
// })

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
