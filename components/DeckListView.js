import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, FlatList } from 'react-native';
import { getDeck, getDecks } from '../utils/api.js';

class DeckListView extends Component {

    // static navigationOptions = {
    //     title: 'Welcome',
    // };

    state = {
        decks: []
    }

    componentDidMount = () => {
        getDecks().then((res) => {

            var decks = Object.values(res).map(v => JSON.parse(v));
            // trick to avoid: VirtualizedList: missing keys for items, make sure to specify a key property on each item or provide a custom keyExtractor.
            decks.forEach((deck, i) => {
                deck.key = i + 1;
            });
            this.setState({
                decks: decks
            })
        }).catch(err => {
            console.log("err: ", err);
        })
    }

    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>
                <Text>Deck List View</Text>
                <FlatList
                    data={this.state.decks}
                    renderItem={({item}) =>
                        <Text onPress={() =>
                            navigate('DeckView', {title: item.title})
                        }>{item.title}</Text>
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
});

export default DeckListView;