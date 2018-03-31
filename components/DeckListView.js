import React, { Component } from 'react';
import {
    View, Text, StyleSheet,
    Button, FlatList, TouchableOpacity,
    Platform
} from 'react-native';
// import { getDecks } from '../utils/api.js';
import { connect } from 'react-redux'
import { fetchDecks } from '../actions/index'
import {
    primaryButton, primaryColor, secondaryColor,
    titleColor, textColor
} from '../utils/colors.js';
import { cardsInDeck } from '../utils/model.js';
import { FontAwesome, Ionicons } from '@expo/vector-icons';

const DeckListItem = ({deck, navigate}) => {
    // TODO: fix why there is deck inside deck
    const numberOfCards = cardsInDeck(deck);
    return (
        <TouchableOpacity
            onPress={() => navigate('DeckView', {title: deck.title}) }
        >
            <View style={styles.deck}>
                <Text style={styles.title}>{deck.title}</Text>
                <Text style={styles.row}>{numberOfCards} cards</Text>
                {/* <Text>{numberOfCards} {numberOfCards == 1 ? 'card' : 'cardS'}</Text> */}
            </View>
        </TouchableOpacity>
    )
}
class DeckListView extends Component {

    static navigationOptions = {
        title: 'Flashcards',
        headerTintColor: '#754B8E',
        headerStyle: { backgroundColor: '#522B73' }
    };

    state = {
        decks: []
    }

    componentWillMount = () => {
        console.log("componentWillMount");
    }
    componentDidMount = () => {
        this.props.fetchDecks().then((res) => {

        }).catch(err => {
            console.log("err: ", err);
        })
    }

    parseDecks = () => {
        var decks = Object.values(this.props.decks).map(v => v);
        let positionForNotKey = -1;
        // trick to avoid: VirtualizedList: missing keys for items, make sure to specify a key property on each item or provide a custom keyExtractor.
        decks.forEach((deck, i) => {
            if (deck && typeof deck === 'object') {
                deck.key = i + 1;
            } else {
                positionForNotKey = i;
            }
        });

        decks.splice(positionForNotKey, 1);
        return decks;
    }

    render() {
        const { navigate } = this.props.navigation;
        const navigation = this.props.navigation;
        const decks = this.parseDecks();
        return (
            <View style={styles.container}>
                <FlatList
                    data={decks}
                    renderItem={({item}) =>
                        <DeckListItem deck={item} navigate={navigate} />
                    }
                />
                {Platform.OS === 'ios' ?
                    <Ionicons
                        style={styles.fabButton}
                        name='ios-add-circle' size={60} color={primaryButton}
                        onPress={() => navigate('NewDeck', { })}
                        />
                        :
                    <Ionicons
                        style={styles.fabButton}
                        name='md-add-circle' size={60} color={primaryButton}
                        onPress={() => navigate('NewDeck', { })}
                    />
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: secondaryColor,
        alignItems: 'center',
        justifyContent: 'center',
    },
    row: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
        color: textColor
    },
    title: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
        fontSize: 30,
        color: titleColor
    },
    deck: {
        // flex: 1,
        backgroundColor: primaryColor,
        alignItems: 'center',
        width: 300,
        height: 100,
        marginTop: 20,
        borderRadius: 10,
    },
    fabButton: {
        alignSelf: 'flex-end',
        margin: 5
        // flexDirection: 'column',
        // justifyContent: 'flex-end'
    }

});

function mapStateToProps(state) {
    return {
        decks: state.decks,
    };
}

function mapDispatchToProps (dispatch) {
    return {
        fetchDecks: () => dispatch(fetchDecks()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeckListView)