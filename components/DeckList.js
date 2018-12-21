import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { handleInitialData } from '../actions/shared'
import DeckItem from './DeckItem'

import { connect } from 'react-redux'

class DeckList extends Component {
	componentDidMount() {
		const { dispatch } = this.props
		this.props.dispatch(handleInitialData())
	}

	render() {
		const { decks } = this.props

		return (
			<View>
				{Object.values(decks).map(d => (
					<TouchableOpacity
						onPress={() =>
							this.props.navigation.navigate('DeckDetail', {
								id: d.id
							})
						}
						key={d.id}
					>
						<DeckItem id={d.id} />
					</TouchableOpacity>
				))}
			</View>
		)
	}
}

function mapStateToProps({ decks }) {
	return {
		decks
	}
}

export default connect(mapStateToProps)(DeckList)
