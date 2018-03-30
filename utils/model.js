export const cardsInDeck = (deck) => {
    return deck && deck.questions ? deck.questions.length :  0;
}