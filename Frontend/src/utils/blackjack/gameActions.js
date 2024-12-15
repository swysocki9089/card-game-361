import { newCard, calculateHandValue } from './cardManagement';

export const hit = (players, playerId, setPlayers) => {
    setPlayers(players.map(player => {
        if (player.id === playerId) {
            const newCards = [...player.cards, newCard()];
            const handValue = calculateHandValue(newCards);
            return { ...player, cards: newCards, isBusted: handValue > 21 };
        }
        return player;
    }));
};

export const stand = (players, playerId, setPlayers) => {
    setPlayers(players.map(player =>
        player.id === playerId ? { ...player, hasStood: true } : player
    ));
};

export const dealCards = (players, setDealerCards, setDealerBusted, setPlayers, setCardsDealt) => {
    const newDealerCards = [newCard(), { ...newCard(), isFlipped: false }];
    const newPlayers = players.map(player => ({
        ...player,
        cards: [newCard(), newCard()],
        hasStood: false,
        isBusted: false,
        result: ''
    }));

    setDealerCards(newDealerCards);
    setDealerBusted(false);
    setPlayers(newPlayers);
    setCardsDealt(true);
};