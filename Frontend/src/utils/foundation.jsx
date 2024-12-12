import React from 'react';
import { useDrop } from 'react-dnd';

/**
 * FoundationPile component represents a single pile in the foundation.
 * It uses the useDrop hook to make the pile droppable.
 * @param {Object} props - The properties object.
 * @param {string} props.suit - The suit of the foundation pile.
 * @param {Array} props.cards - The array of cards in the foundation pile.
 * @param {Function} props.moveCard - The function to move a card.
 * @returns {JSX.Element} The rendered foundation pile component.
 */
export const FoundationPile = ({ suit, cards, moveCard }) => {
    const [, drop] = useDrop(() => ({
        accept: 'CARD',
        drop: (item) => {
            console.log('Card dropped on foundation:', item);
            moveCard(item, undefined, suit);
        }
    }));

    const isRedSuit = suit === '♥' || suit === '♦';

    return (
        <div ref={drop} className="foundation-pile">
            {cards.length > 0 ? (
                <div className={`card ${isRedSuit ? 'red' : ''}`}>
                    {`${cards[cards.length - 1].value}${suit}`}
                </div>
            ) : (
                <div className={`card empty ${isRedSuit ? 'red' : ''}`}>{suit}</div>
            )}
        </div>
    );
};