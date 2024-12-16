export const addPlayer = (players, nextPlayerId, setPlayers, setNextPlayerId) => {
    if (players.length < 4) {
        const newPlayer = { id: nextPlayerId, cards: [], hasStood: false, isBusted: false, result: '', wins: 0, losses: 0 };
        setPlayers([...players, newPlayer]);
        setNextPlayerId(nextPlayerId + 1);
    } else {
        alert('Maximum number of players is 4');
    }
};

export const removePlayer = (players, playerId, setPlayers) => {
    setPlayers(players.filter(player => player.id !== playerId));
};