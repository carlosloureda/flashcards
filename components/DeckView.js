import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, FlatList } from 'react-native';
import { getDeck } from '../utils/api.js';
import { cardsInDeck } from '../utils/model.js';
import AddCardView from './AddCardView';

class DeckView extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: `Deck: ${navigation.state.params.title}`,
            headerTintColor: '#754B8E',
            headerStyle: { backgroundColor: '#522B73' }
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
                    <View style={styles.deckTitles}>
                        <Text style={styles.title}>{deck.title}</Text>
                        <Text style={styles.totalCards} >{cardsInDeck(deck)} cards</Text>
                    </View>
                }

                <View style={styles.buttonGroup}>
                    <Button
                        title="Add card"
                        style={styles.addBtn}
                        onPress={() =>
                            navigate('AddCard', { title: deck.title })
                        }
                        />

                    <Button
                        title="Start quiz"
                        style={styles.startQuiz}
                        onPress={() =>
                            navigate('Quiz', { deck: deck })
                        }
                    />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#877CB0',
    },
    deckTitles: {
        flex: 5,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#754B8E',
        margin: 10
    },
    buttonGroup: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'stretch',
        // backgroundColor: 'blue'
    },
    title: {
        fontSize: 80,
        color: '#FFFEAA'
    },
    totalCards: {
        fontSize: 40,
        color: '#554600'
    },
    addBtn: {
        backgroundColor: '#12073B',
        borderColor: 'red'
    },
    startQuiz: {
        backgroundColor: 'yellow',
        color: 'red',
    }
});

export default DeckView;