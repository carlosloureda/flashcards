import {
    REQUEST_DECKS,
    NEW_DECK,
    REQUEST_DECK,
    NEW_CARD
} from '../actions/types.js';

const defaultPostState = {
    decks: {
    }
}

function decks(state = defaultPostState, action) {
    let questions = null;
    switch (action.type) {

        case REQUEST_DECKS:
            let b = {
                ...state,
                decks: action.items
            }
            console.log("REQUEST_DECKS reducer, state: ", b);
            return b;
        case NEW_DECK:

        console.log("old state ", state);
            let _newState =  {
                ...state,
                decks: {
                    ...state.decks,
                    [action.title]: {
                        title:  action.title,
                        questions: []
                    }
                }
            }
            console.log("NEW_DECK reducer: ", _newState);
            return _newState;
        case REQUEST_DECK:
            let a =  {
                ...state,
                decks: {
                    ...state.decks,
                    [action.item.title]: action.item
                }
            }
            console.log("REQUEST_DECK reducer, state: ", a);
            return a;
        case NEW_CARD:
            console.log("NEW_CARD reducer: ");
            questions = state.decks[action.deckId].questions;
            questions.push(action.card)
            return {
                ...state,
                decks: {
                    ...state.decks,
                    [action.deckId]: {
                        ...state.decks[action.deckId],
                        questions: questions
                    }
                }
            }
    }
    return state;
}

export default decks;