import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, FlatList, TouchableOpacity } from 'react-native';
import { getDecks } from '../utils/api.js';
import { cardsInDeck } from '../utils/model.js';

const DeckListItem = ({deck, navigate}) => {
    console.log("~deck: ", deck);
    console.log("navigate: ", navigate);
    // TODO: fix why there is deck inside deck
    const numberOfCards = cardsInDeck(deck);
    return (
        <TouchableOpacity
            style={styles.deckCard}
            onPress={() => navigate('DeckView', {title: deck.title}) }
        >
            <Text>{deck.title}</Text>
            <Text>{numberOfCards} cards</Text>
            {/* <Text>{numberOfCards} {numberOfCards == 1 ? 'card' : 'cardS'}</Text> */}
        </TouchableOpacity>
    )
}
class DeckListView extends Component {

    static navigationOptions = {
        title: 'Flashcards',
    };

    state = {
        decks: []
    }

    componentDidMount = () => {
        console.log("ComponentDIdMount called");
        getDecks().then((res) => {
            console.log("Res: ", res);
            var decks = Object.values(res).map(v => v);
            console.log("decks: ", decks);
            // trick to avoid: VirtualizedList: missing keys for items, make sure to specify a key property on each item or provide a custom keyExtractor.
            decks.forEach((deck, i) => {
                deck.key = i + 1;
            });
            this.setState({
                decks: decks
            })
            console.log("DECKS: ", decks);
        }).catch(err => {
            console.log("err: ", err);
        })
    }

    render() {
        const { navigate } = this.props.navigation;
        const navigation = this.props.navigation;
        return (
            <View style={styles.container}>
                <FlatList
                    data={this.state.decks}
                    renderItem={({item}) =>
                        <DeckListItem deck={item} navigate={navigate} />
                    }
                />
                <Button
                    title="Create new deck"
                    onPress={() =>
                        navigate('NewDeck', { })
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
    deckCard: {
        // display: 'flex',
        // flex: 1,
        // // width:400,
        // borderStyle: 'solid',
        // borderColor: 'black',
        // borderRadius: 10,
        // color: 'red',
        // backgroundColor: 'blue'
    }
});

export default DeckListView;