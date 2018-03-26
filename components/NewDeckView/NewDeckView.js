import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TabNavigator } from 'react-navigation';
import NewDeckForm from './NewDeckForm';
import Cards from './Cards';

const Tabs = TabNavigator({
    NewDeck: {
      screen: NewDeckForm
    },
    Cards: {
      screen: Cards
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