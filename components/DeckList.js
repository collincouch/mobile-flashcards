import React, { Component } from 'react'
import {
	View,
	Text,
	TouchableOpacity,
	StyleSheet,
	Platform,
	ScrollView,
	FlatList
} from 'react-native'
import { handleInitialData } from '../actions/shared'
import DeckItem from './DeckItem'
import { AppLoading } from 'expo'
import { purple, white } from '../utils/colors'
import { connect } from 'react-redux'

class DeckList extends Component {
	state = {
		ready: false
	}

	componentDidMount() {
		const { dispatch } = this.props
		this.props
			.dispatch(handleInitialData())
			.then(() => this.setState(() => ({ ready: true })))
	}

	renderItem = ({ item }) => {
		return (
			<TouchableOpacity
				onPress={() =>
					this.props.navigation.navigate('DeckDetail', {
						id: item[1].id
					})
				}
				key={item[1].id}
			>
				<DeckItem id={item[1].id} />
			</TouchableOpacity>
		)
	}

	render() {
		const { ready } = this.state
		if (ready === false) {
			return <AppLoading />
		}

		const { decks } = this.props

		return (
			<View style={styles.container}>
				<Text style={styles.headerStyle}>Mobile Flashcards</Text>
				<View style={[{ flex: 1 }, styles.elementsContainer]}>
					<View style={{ alignItems: 'center' }}>
						<Text style={{ fontSize: 25 }}>Decks</Text>
					</View>
					<View style={{ flex: 2 }}>
						<FlatList
							data={Object.entries(decks)}
							renderItem={this.renderItem}
							keyExtractor={(item, index) => index.toString()}
						/>
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
	},
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
}

function mapStateToProps({ decks }) {
	return {
		decks
	}
}

export default connect(mapStateToProps)(DeckList)
