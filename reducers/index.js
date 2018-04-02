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
            return {
                ...state,
                decks: action.items
            }
        case NEW_DECK:
            return  {
                ...state,
                decks: {
                    ...state.decks,
                    [action.title]: {
                        title:  action.title,
                        questions: []
                    }
                }
            }
        case REQUEST_DECK:
            return {
                ...state,
                decks: {
                    ...state.decks,
                    [action.item.title]: action.item
                }
            }
        case NEW_CARD:
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