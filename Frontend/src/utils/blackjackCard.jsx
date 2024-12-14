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

export default BlackjackCard;