export const hit = (players, playerId, newCard, calculateHandValue, setPlayers) => {
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
