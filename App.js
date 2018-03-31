import React from 'react';
import { StyleSheet, Text, View, AsyncStorage } from 'react-native';
import { StackNavigator } from 'react-navigation';
import DeckListView from './components/DeckListView';
import DeckView from './components/DeckView';
import NewDeckView from './components/NewDeckView';
import AddCardView from './components/AddCardView';
import QuizView from './components/QuizView';
import FlexboxExamples from './components/FlexboxExamples';
import { setLocalNotification } from './utils/helpers'

import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import { createLogger } from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import reducer from './reducers/index.js'
import {composeWithDevTools} from 'remote-redux-devtools';

const loggerMiddleware = createLogger()

const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(
      thunkMiddleware, // lets us dispatch() functions
      // loggerMiddleware // neat middleware that logs actions
    ),
  )
);

const Stack = StackNavigator({
  Home: { screen: DeckListView },
  // Home: { screen: FlexboxExamples },
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
      <Provider store={store}>
        <Stack />
      </Provider>
    );
  }
}
