export const addPlayer = (players, nextPlayerId, setPlayers, setNextPlayerId) => {
    if (players.length < 6) {
        const newPlayer = { id: nextPlayerId, cards: [], hasStood: false, isBusted: false, result: '', wins: 0, losses: 0 };
        setPlayers([...players, newPlayer]);
        setNextPlayerId(nextPlayerId + 1);
    } else {
        alert('Maximum number of players is 6');
    }
};

export const removePlayer = (players, playerId, setPlayers) => {
    setPlayers(players.filter(player => player.id !== playerId));
};