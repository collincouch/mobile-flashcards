export function formatQuestion({ questionText, answerText, deck }) {
  return {
    id: generateUID(),
    timestamp: Date.now(),
    deck,
    question: questionText,
    answer: answerText
  }
}

export function formatDeck(deckText) {
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
