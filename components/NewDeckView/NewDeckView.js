import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TabNavigator } from 'react-navigation';
import NewDeckForm from './NewDeckForm';
import AddCards from './AddCards';

const Tabs = TabNavigator({
    NewDeck: {
      screen: NewDeckForm
    },
    AddCards: {
      screen: AddCards
    },
});

class NewDeckView extends Component {

    render() {
        return (
            <Tabs />
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

export default NewDeckView;