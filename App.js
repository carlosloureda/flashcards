import React from 'react';
import { StyleSheet, Text, View, AsyncStorage } from 'react-native';
import { StackNavigator } from 'react-navigation';
import DeckListView from './components/DeckListView';
import DeckView from './components/DeckView';
import NewDeckView from './components/NewDeckView';
import AddCardView from './components/AddCardView';
import QuizView from './components/QuizView';
import { setLocalNotification } from './utils/helpers'

const Stack = StackNavigator({
  Home: { screen: DeckListView },
  NewDeck: { screen: NewDeckView },
  DeckView: { screen: DeckView },
  AddCard: { screen: AddCardView },
  Quiz: { screen: QuizView },
});

export default class App extends React.Component {
  componentDidMount() {
    setLocalNotification()
  }

  render() {
    return (
      <Stack />
    );
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
