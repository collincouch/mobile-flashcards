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
import TextButton from './TextButton'
import { purple, white } from '../utils/colors'
import { handleAddDeck } from '../actions/decks'
import { NavigationActions } from 'react-navigation'
import SubmitButton from './SubmitButton'

class AddDeck extends Component {
  state = {
    deckName: ''
  }
  submit = e => {
    e.preventDefault()
    const { deckName } = this.state
    const { dispatch } = this.props

    //console.log(deckName)

    //dispatch to handleDeck,
    //which will update local storage and
    //Redux
    dispatch(handleAddDeck(deckName))

    //this.setState(() => ({ deckName: '' }))
    this.setState({ deckName: '' })

    // Navigate to home
    this.toHome()
  }

  handleChangeDeckName = text => {
    this.setState({ deckName: text })
  }

  toHome = () => {
    this.props.navigation.dispatch(NavigationActions.back({ key: 'AddDeck' }))
  }

  render() {
    const { deckName } = this.state
    return (
      <View style={styles.container}>
        <Text style={styles.headerStyle}>Mobile Flashcards</Text>
        <View style={[{ flex: 1 }, styles.elementsContainer]}>
          <View style={{ flex: 1, alignItems: 'center' }}>
            <Text style={{ fontSize: 25 }}>Add Deck</Text>
          </View>
          <View style={{ flex: 2 }}>
            <TextInput
              style={styles.input}
              underlineColorAndroid="transparent"
              placeholder="Deck Name"
              placeholderTextColor="#9a73ef"
              autoCapitalize="none"
              onChangeText={this.handleChangeDeckName}
              value={deckName}
            />
            <SubmitButton onPress={this.submit}>Submit</SubmitButton>
          </View>
        </View>
      </View>
    )
  }
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: white
//   },
//   // row: {
//   //   flexDirection: 'row',
//   //   flex: 1,
//   //   alignItems: 'center'
//   // },
//   center: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginLeft: 30,
//     marginRight: 30
//   },
//   input: {
//     margin: 15,
//     height: 40,
//     borderColor: '#7a42f4',
//     borderWidth: 1,
//     width: 300
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
  },
  input: {
    margin: 15,
    height: 40,
    borderColor: '#7a42f4',
    borderWidth: 1
  }
}

function mapStateToProps(state) {
  return {}
}

export default connect(mapStateToProps)(AddDeck)
