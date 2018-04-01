import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, FlatList, Animated } from 'react-native';
import { fetchDeck } from '../actions/index';
import { cardsInDeck } from '../utils/model.js';
import AddCardView from './AddCardView';
import {
    secondaryColor, primaryColor, titleColor,
    textColor, primaryButton, secondaryButton
} from '../utils/colors.js';
import { connect } from 'react-redux'

class DeckView extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: `Deck: ${navigation.state.params.title}`,
            headerTintColor: '#754B8E',
            headerStyle: { backgroundColor: '#522B73' }
        }
    }

    state = {
        fadeAnim: new Animated.Value(0),  // Initial value for opacity: 0
    }

    componentDidMount = () => {
        const deckTitle = this.props.navigation.state.params.title;

        Animated.timing(
            this.state.fadeAnim,
            {
              toValue: 1,
              duration: 5000,
            }
        ).start();
    }

    render() {
        const deckTitle = this.props.navigation.state.params.title;
        const { navigate } = this.props.navigation;
        const deck = this.props.decks[deckTitle];
        const { fadeAnim } = this.state;

        return (
            <Animated.View style={[styles.container, {opacity: fadeAnim} ]}>
                {deck &&
                    <View style={styles.deckTitles}>
                        <Text style={styles.title}>{deck.title}</Text>
                        <Text style={styles.totalCards} >{cardsInDeck(deck)} cards</Text>
                    </View>
                }

                <View style={styles.buttonGroup}>
                    <Button
                        title="Add card"
                        style={styles.addBtn}
                        color={primaryButton}
                        onPress={() =>
                            navigate('AddCard', { title: deck.title })
                        }
                        />
                    {!!cardsInDeck(deck) &&
                        <Button
                            title="Start quiz"
                            color={secondaryButton}
                            style={styles.startQuiz}
                            onPress={() =>
                                navigate('Quiz', { deck: deck })
                            }
                        />
                    }
                </View>
            </Animated.View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: secondaryColor,
    },
    deckTitles: {
        flex: 5,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: primaryColor,
        margin: 10
    },
    buttonGroup: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'stretch',
        // backgroundColor: 'blue'
    },
    title: {
        fontSize: 50,
        color: titleColor
    },
    totalCards: {
        fontSize: 25,
        color: textColor
    },
    addBtn: {
        backgroundColor: primaryButton,
        // borderColor: 'red'
    },
    startQuiz: {
        // backgroundColor: 'yellow',
        // color: 'red',
    }
});

function mapStateToProps(state) {
    return {
        decks: state.decks,
    };
}

function mapDispatchToProps (dispatch) {
    return {
        fetchDeck: (id) => dispatch(fetchDeck(id)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeckView)