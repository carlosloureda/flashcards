import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, FlatList } from 'react-native';
import { getDeck } from '../utils/api.js';
import { cardsInDeck } from '../utils/model.js';
import AddCardView from './AddCardView';

class DeckView extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: `Deck: ${navigation.state.params.title}`
        }
    }

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
        const { navigate } = this.props.navigation;
        const { deck } = this.state;
        return (
            <View style={styles.container}>
                {this.state.deck &&
                    <View>
                        <Text>Title: {deck.title}</Text>
                        <Text>{cardsInDeck(deck)} cards</Text>
                    </View>
                }

                {/* {this.state.deck && this.state.deck.questions &&
                    this.state.deck.questions.map(question => (
                        <Text key={question.question}>
                            <Text>question: {question.question}</Text>
                            <Text>answer: {question.answer}</Text>
                        </Text>
                    ))
                } */}
                <Button
                    title="Add card"
                    onPress={() =>
                        navigate('AddCard', { title: deck.title })
                    }
                />

                <Button
                    title="Start quiz"
                    onPress={() =>
                        navigate('Quiz', { deck: deck })
                    }
                />

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