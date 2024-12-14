import React, { useState } from 'react';
import BlackjackCard from '../utils/blackjackCard';
import './blackjack.css';

const Blackjack = () => {
    const [dealerCards, setDealerCards] = useState([]);
    const [players, setPlayers] = useState([{ id: 1, cards: [] }]);

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

    const dealCards = () => {
        const newDealerCards = [newCard(), { ...newCard(), isFlipped: false }];
        const newPlayers = players.map(player => ({
            ...player,
            cards: [newCard(), newCard()]
        }));

        setDealerCards(newDealerCards);
        setPlayers(newPlayers);
    };

    const addPlayer = () => {
        if (players.length < 4) {
            const newPlayer = { id: players.length + 1, cards: [] };
            setPlayers([...players, newPlayer]);
        } else {
            alert('Maximum number of players is 4');
        }
    };

    return (
        <div className="blackjack-game centered">
            <div className="dealer-area">
                <h2>Dealer's Cards</h2>
                <div className="cards">
                    {dealerCards.map((card, index) => (
                        <BlackjackCard key={index} card={card} />
                    ))}
                </div>
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
                    </div>
                ))}
            </div>
            <button onClick={dealCards}>Deal Cards</button>
            <button onClick={addPlayer}>Add Player</button>
        </div>
    );
};

export default Blackjack;