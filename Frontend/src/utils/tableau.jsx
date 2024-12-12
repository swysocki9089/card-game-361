import React from 'react';
import { useDrop } from 'react-dnd';
import Card from './card';

/**
 * TableauColumn component represents a single column in the tableau.
 * It uses the useDrop hook to make the column droppable.
 * @param {Object} props - The properties object.
 * @param {Array} props.column - The array of cards in the column.
 * @param {number} props.columnIndex - The index of the column.
 * @param {Function} props.moveCard - The function to move a card.
 * @returns {JSX.Element} The rendered tableau column component.
 */
const TableauColumn = ({ column, columnIndex, moveCard }) => {
    const [, drop] = useDrop(() => ({
        accept: 'CARD',
        drop: (item) => moveCard(item, columnIndex)
    }));

    return (
        <div ref={drop} className="tableau-column">
            {column.length === 0 ? (
                <div className="empty-column"></div>
            ) : (
                column.map((card, cardIndex) => (
                    <Card key={cardIndex} card={card} index={cardIndex} columnIndex={columnIndex} />
                ))
            )}
        </div>
    );
};

export default TableauColumn;