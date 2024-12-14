import React, { useState } from 'react';
import BlackjackCard from '../utils/blackjackCard';
import './blackjack.css';

const Blackjack = () => {
    const [dealerCards, setDealerCards] = useState([]);
    const [playerCards, setPlayerCards] = useState([]);

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
        const newPlayerCards = [newCard(), newCard()];

        setDealerCards(newDealerCards);
        setPlayerCards(newPlayerCards);
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
            <div className="player-area">
                <h2>Player's Cards</h2>
                <div className="cards">
                    {playerCards.map((card, index) => (
                        <BlackjackCard key={index} card={card} />
                    ))}
                </div>
            </div>
            <button onClick={dealCards}>Deal Cards</button>
        </div>
    );
};

export default Blackjack;