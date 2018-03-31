import { getDecks, saveDeckTitle, getDeck, addCardToDeck } from '../utils/api.js';
import {
    REQUEST_DECKS,
    NEW_DECK,
    REQUEST_DECK,
    NEW_CARD
} from './types.js';


/*******************************************************************************
 *                              FECTCH DECKS
 ******************************************************************************/
function requestDecks(data) {
    console.log("[requestDecks] Data is: ", data);
    return {
        type: REQUEST_DECKS,
        items: data,
        receivedAt: Date.now()
    }
}

export function fetchDecks() {
    return (dispatch) => {
        return getDecks()
        .then(data =>
            {
                return dispatch(requestDecks(data));
            }
        )

    }
}

/*******************************************************************************
 *                              NEW DECK
 ******************************************************************************/
function newDeck(title) {
    console.log("[newDeck] Data is: ", title);
    return {
        type: NEW_DECK,
        title: title,
        receivedAt: Date.now()
    }
}

export function addNewDeck(title) {
    console.log("[addNEwDEck] title is: ", title);
    return (dispatch) => {
        return saveDeckTitle(title)
        .then(data =>
            {
                return dispatch(newDeck(title));
            }
        )

    }
}

/*******************************************************************************
 *                              FETCH DECK
 ******************************************************************************/
function requestDeck(deck) {
    console.log("[requestDeck] deck is: ", deck);
    return {
        type: REQUEST_DECK,
        item: deck,
        receivedAt: Date.now()
    }
}

export function fetchDeck(id) {
    return (dispatch) => {
        return getDeck(id)
        .then(data =>
            {
                return dispatch(requestDeck(data));
            }
        )

    }
}

/*******************************************************************************
 *                              NEW CARD
 ******************************************************************************/
function saveCard(id, card) {
    console.log("[saveCard] card is: ", card);
    return {
        type: NEW_CARD,
        deckId: id,
        card: card,
        receivedAt: Date.now()
    }
}

export function newCard(id, card) {
    return (dispatch) => {
        return addCardToDeck(id, card)
        .then(data =>
            {
                return dispatch(saveCard(id, card));
            }
        )

    }
}