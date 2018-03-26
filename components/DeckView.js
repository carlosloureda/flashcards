import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, FlatList } from 'react-native';
import { getDeck } from '../utils/api.js';

class DeckView extends Component {

    state = {
        deck: []
    }

    componentDidMount = () => {
        const deckTitle = this.props.navigation.state.params.title;
        getDeck(deckTitle).then((res) => {
            this.setState({
                deck: res
            })
        })
    }

    render() {
        // const { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>
                <Text>Deck Detail View</Text>
                {this.state.deck &&
                    <Text>Title: {this.state.deck.title}</Text>
                }

                {this.state.deck && this.state.deck.questions &&
                    this.state.deck.questions.map(question => (
                        <Text key={question.question}>
                            <Text>question: {question.question}</Text>
                            <Text>answer: {question.answer}</Text>
                        </Text>
                    ))
                }

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default DeckView;