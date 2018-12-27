import { View, StyleSheet, AsyncStorage } from 'react-native'
import { Notifications, Permissions } from 'expo'
const NOTIFICATION_KEY = 'MobileFlashcards:notifications'

export function formatQuestion({ deckId, questionText, answerText }) {
  return {
    id: generateUID(),
    timestamp: Date.now(),
    deck: deckId,
    question: questionText,
    answer: answerText
  }
}

export function formatDeck(deckText) {
  //console.log('helpers:formatDeck ' + deckText)
  return {
    id: generateUID(),
    timestamp: Date.now(),
    name: deckText,
    questions: [],
    quizResults: {
      correct: [],
      incorrect: []
    }
  }
}

export function generateUID() {
  return (
    Math.random()
      .toString(36)
      .substring(2, 15) +
    Math.random()
      .toString(36)
      .substring(2, 15)
  )
}

export function clearLocalNotification() {
  return AsyncStorage.removeItem(NOTIFICATION_KEY).then(
    Notifications.cancelAllScheduledNotificationsAsync
  )
}

function createNotification() {
  return {
    title: 'Take a Quiz!',
    body: "👋 don't forget to take a quiz for today!",
    ios: {
      sound: true
    },
    android: {
      sound: true,
      priority: 'high',
      sticky: false,
      vibrate: true
    }
  }
}

export function setLocalNotification() {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then(data => {
      console.log(data)
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS).then(({ status }) => {
          console.log(status)
          if (status === 'granted') {
            Notifications.cancelAllScheduledNotificationsAsync()

            //set notification for 8:00 pm
            let tomorrow = new Date()
            tomorrow.setDate(tomorrow.getDate() + 1)
            tomorrow.setHours(20)
            tomorrow.setMinutes(0)

            Notifications.scheduleLocalNotificationAsync(createNotification(), {
              time: tomorrow,
              repeat: 'day'
            })

            AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
          }
        })
      }
    })
}
