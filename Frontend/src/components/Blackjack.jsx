import React, {useEffect, useState} from 'react';
import BlackjackCard from '../utils/blackjackCard';
import './blackjack.css';

const Blackjack = () => {
    const [dealerCards, setDealerCards] = useState([]);
    const [dealerBusted, setDealerBusted] = useState(false);
    const [players, setPlayers] = useState([{ id: 1, cards: [], hasStood: false, isBusted: false, result: '' }]);
    const [cardsDealt, setCardsDealt] = useState(false);
    const [nextPlayerId, setNextPlayerId] = useState(2);

    const newCard = () => {
        const suit = ['♠', '♣', '♥', '♦'][Math.floor(Math.random() * 4)];
        const value = Math.floor(Math.random() * 13) + 1;
        const displayValue = value === 1 ? 'A' : value > 10 ? ['J', 'Q', 'K'][value - 11] : value;
        return {
            suit,
            value: displayValue,
            isFlipped: true
        };
    };

    const calculateHandValue = (cards) => {
        let value = 0;
        let aces = 0;
        cards.forEach(card => {
            if (card.value === 'A') {
                aces += 1;
                value += 11;
            } else if (['J', 'Q', 'K'].includes(card.value)) {
                value += 10;
            } else {
                value += parseInt(card.value, 10);
            }
        });
        while (value > 21 && aces > 0) {
            value -= 10;
            aces -= 1;
        }
        return value;
    };

    const dealCards = () => {
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

    const addPlayer = () => {
        if (players.length < 4) {
            const newPlayer = { id: nextPlayerId, cards: [], hasStood: false, isBusted: false, result: '' };
            setPlayers([...players, newPlayer]);
            setNextPlayerId(nextPlayerId + 1);
        } else {
            alert('Maximum number of players is 4');
        }
    };

    const removePlayer = (playerId) => {
        setPlayers(players.filter(player => player.id !== playerId));
    };

    const hit = (playerId) => {
        setPlayers(players.map(player => {
            if (player.id === playerId) {
                const newCards = [...player.cards, newCard()];
                const handValue = calculateHandValue(newCards);
                return { ...player, cards: newCards, isBusted: handValue > 21 };
            }
            return player;
        }));
    };

    const stand = (playerId) => {
        setPlayers(players.map(player =>
            player.id === playerId ? { ...player, hasStood: true } : player
        ));
    };

    const dealerTurn = () => {
        let newDealerCards = [...dealerCards];
        let dealerValue = calculateHandValue(newDealerCards);
        while (dealerValue < 17) {
            newDealerCards.push(newCard());
            dealerValue = calculateHandValue(newDealerCards);
        }
        setDealerCards(newDealerCards.map(card => ({ ...card, isFlipped: true })));
        if (dealerValue > 21) {
            setDealerBusted(true);
            setPlayers(players.map(player => ({
                ...player,
                result: player.isBusted ? 'Busted' : 'Win'
            })));
        } else {
            setPlayers(players.map(player => {
                const playerValue = calculateHandValue(player.cards);
                let result = '';
                if (player.isBusted) {
                    result = 'Busted';
                } else if (playerValue > dealerValue) {
                    result = 'Win';
                } else if (playerValue < dealerValue) {
                    result = 'Lose';
                } else {
                    result = 'Push';
                }
                return { ...player, result };
            }));
        }
    };

    const resetGame = () => {
        const resetPlayers = players.map(player => ({
            ...player,
            cards: [],
            hasStood: false,
            isBusted: false,
            result: ''
        }));
        setDealerCards([]);
        setDealerBusted(false);
        setPlayers(resetPlayers);
        setCardsDealt(false);
    };

    useEffect(() => {
        if (cardsDealt && players.every(player => player.hasStood || player.isBusted)) {
            dealerTurn();
        }
    }, [players]);

    return (
        <div className="blackjack-game centered">
            <div className="dealer-area">
                <h2>Dealer's Cards</h2>
                <div className="cards">
                    {dealerCards.map((card, index) => (
                        <BlackjackCard key={index} card={card} />
                    ))}
                </div>
                {dealerBusted && <p>Dealer Busted!</p>}
            </div>
            <div className="player-areas">
                {players.map(player => (
                    <div key={player.id} className="player-area">
                        <h2>Player {player.id}'s Cards</h2>
                        <div className="cards">
                            {player.cards.map((card, index) => (
                                <BlackjackCard key={index} card={card} />
                            ))}
                        </div>
                        {cardsDealt && (
                            <>
                                <button onClick={() => hit(player.id)} disabled={player.hasStood || player.isBusted}>Hit</button>
                                <button onClick={() => stand(player.id)} disabled={player.hasStood || player.isBusted}>Stand</button>
                            </>
                        )}
                        <button onClick={() => removePlayer(player.id)} disabled={cardsDealt || players.length <= 1}>Remove Player</button>
                        {player.isBusted && <p>Busted!</p>}
                        {player.result && <p>{player.result}</p>}
                    </div>
                ))}
            </div>
            <button onClick={dealCards}>Deal Cards</button>
            <button onClick={addPlayer}>Add Player</button>
            <button onClick={resetGame}>New Game</button>
        </div>
    );
};

export default Blackjack;