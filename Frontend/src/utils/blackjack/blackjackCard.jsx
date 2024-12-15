import React from 'react';

/**
 * BlackjackCard component represents a single card in the Blackjack game.
 * @param {Object} props - The properties object.
 * @param {Object} props.card - The card object.
 * @returns {JSX.Element} The rendered card component.
 */
const BlackjackCard = ({ card }) => {
    const isRedSuit = card.suit === '♥' || card.suit === '♦';

    return (
        <div className={`card ${card.isFlipped ? 'flipped' : ''} ${card.isFlipped && isRedSuit ? 'red' : ''}`}>
            {card.isFlipped ? `${card.value}${card.suit}` : '🂠'}
        </div>
    );
};

export const newCard = () => {
    const suit = ['♠', '♣', '♥', '♦'][Math.floor(Math.random() * 4)];
    const value = Math.floor(Math.random() * 13) + 1;
    const displayValue = value === 1 ? 'A' : value > 10 ? ['J', 'Q', 'K'][value - 11] : value;
    return {
        suit,
        value: displayValue,
        isFlipped: true
    };
};

export const calculateHandValue = (cards) => {
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

export default BlackjackCard;