import React, { useState, useEffect } from 'react';
import { useDrag } from 'react-dnd';

/**
 * Card component represents a single card in the game.
 * It uses the useDrag hook to make the card draggable.
 * @param {Object} props - The properties object.
 * @param {Object} props.card - The card object.
 * @param {number} props.index - The index of the card in its column.
 * @param {number} props.columnIndex - The index of the column the card belongs to.
 * @param {boolean} [props.fromWaste=false] - Indicates if the card is from the waste pile.
 * @returns {JSX.Element} The rendered card component.
 */
const Card = ({ card, index, columnIndex, fromWaste = false }) => {
    const [dragItem, setDragItem] = useState({ card, index, columnIndex, fromWaste });

    useEffect(() => {
        setDragItem({ card, index, columnIndex, fromWaste });
    }, [card, index, columnIndex, fromWaste]);

    const [{ isDragging }, drag] = useDrag(() => ({
        type: 'CARD',
        item: dragItem,
        collect: (monitor) => ({
            isDragging: monitor.isDragging()
        })
    }), [dragItem]);

    const isRedSuit = card.suit === '♥' || card.suit === '♦';

    return (
        <div
            ref={drag}
            className={`card ${card.isFlipped ? 'flipped' : ''} ${card.isFlipped && isRedSuit ? 'red' : ''}`}
            style={{ opacity: isDragging ? 0.5 : 1 }}
        >
            {card.isFlipped ? `${card.value}${card.suit}` : '🂠'}
        </div>
    );
};

export default Card;