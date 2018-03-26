import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, FlatList } from 'react-native';
import AddCardForm from './AddCardForm';
import { getDeck } from '../../utils/api.js';
import { AsyncStorage } from 'react-native'
class Cards extends Component {

    state = {
        deck: '',
        showAddCardForm: false
    }
    componentDidMount = () => {
        const deckTitle = this.props.navigation.state.params.title;
        getDeck(deckTitle).then((deck) => {
           console.log("then deck: ", deck);
           if (deck && deck.questions) {
               deck.questions.forEach((question, i) => {
                   question.key = i + 1;
                });
                console.log("deck with keys: ", deck);
            }
            this.setState({
                deck: deck
            })
        })
    }

    onShowAddCardForm = () => {
        this.setState({
            ...this.state,
            showAddCardForm: ! this.state.showAddCardForm
        })
    }

    onNewCardAdded = (deck) => {
        this.setState({
            ...this.state,
            deck: deck
        })
    }

    render() {
        const deckTitle = this.props.navigation.state.params.title;
        return (
            <View style={styles.container}>
                <Text>Cards</Text>
                {this.state.showAddCardForm &&
                    <AddCardForm title={deckTitle} onNewCardAdded={this.onNewCardAdded}/>
                }
                <Button
                    title="Add new card"
                    onPress={() => this.onShowAddCardForm()}
                />
                <FlatList
                    data={this.state.deck.questions}
                    renderItem={({item}) =>
                        <Text>{item.question}</Text>
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

export default Cards;