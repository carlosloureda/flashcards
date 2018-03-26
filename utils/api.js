import { AsyncStorage } from 'react-native'

var decks = {
    React: {
      title: 'React',
      questions: [
        {
          question: 'What is React?',
          answer: 'A library for managing user interfaces'
        },
        {
          question: 'Where do you make Ajax requests in React?',
          answer: 'The componentDidMount lifecycle event'
        }
      ]
    },
    JavaScript: {
      title: 'JavaScript',
      questions: [
        {
          question: 'What is a closure?',
          answer: 'The combination of a function and the lexical environment within which that function was declared.'
        }
      ]
    }
}

// take in a single title argument and add it to the decks.
export function saveDeckTitle(title) {
  //TODO: check if we already have a deck with the same title?
    var deck = {
        title: title,
        questions: []
    }
    return AsyncStorage.setItem(title, JSON.stringify(deck));
}

// take in two arguments, title and card, and will add the card to the list of questions for the deck with the associated title.
export function addCardToDeck(id, card) {
  return AsyncStorage.getItem(id)
  .then((deck) => {
    console.log("deck: ", deck);
    deck = JSON.parse(deck);
    console.log("deck: ", deck);
    deck.questions.push(card);
    return AsyncStorage.setItem(id, JSON.stringify(deck))
    .then(() => {
      return AsyncStorage.getItem(id).then((res) => JSON.parse(res))
    })
  })
}

// return all of the decks along with their titles, questions, and answers.
export function getDecks() {
    return AsyncStorage.getAllKeys().then(keys => {
        var Promise = require("bluebird");
        return Promise.reduce(keys, (result, key) => {
            return AsyncStorage.getItem(key).then(value => {
              result[key] = JSON.parse(value);
              return result;
            });
        }, {})
    });
}

// take in a single id argument and return the deck associated with that id.
export function getDeck(id) {
    return AsyncStorage.getItem(id).then((res) => JSON.parse(res))
}
