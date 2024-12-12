import React, { useReducer, useEffect, useCallback, useState } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { createDeck } from '../utils/deck';
import { shuffleDeck } from '../utils/shuffle';
import { gameReducer } from '../utils/gameReducer';
import Popup from './Popup';

//initial game state
const initialState = {
    deck: [], //array to hold the deck of cards
    tableau: [], //column of cards in the tableau area
    foundation: { '♠': [], '♣': [], '♥': [], '♦': [] }, //foundation piles for each suit
    stockPile: [], //cards in the stockpile
    wastePile: [], //cards drawn from the stockpile
    moves: 0, //players moves (unimplemented)
    gameStatus: 'NOT_STARTED' //game status 
};

/**Card component represents a single card in the game.
 * It uses the useDrag hook to make the card draggable.
 * @param {Object} props - The properties object.
 * @param {Object} props.card - The card object.
 * @param {number} props.index - The index of the card in its column.
 * @param {number} props.columnIndex - The index of the column the card belongs to.
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

/**TableauColumn component represents a single column in the tableau.
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

/**FoundationPile component represents a single pile in the foundation.
 * It uses the useDrop hook to make the pile droppable.
 * @param {Object} props - The properties object.
 * @param {string} props.suit - The suit of the foundation pile.
 * @param {Array} props.cards - The array of cards in the foundation pile.
 * @param {Function} props.moveCard - The function to move a card.
 * @returns {JSX.Element} The rendered foundation pile component.
 */
const FoundationPile = ({ suit, cards, moveCard }) => {
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

/**main solitaire component to manage the game state and render the UI
 */
const Solitaire = () => {
    //manage the game state using the useReducer function
    const [state, dispatch] = useReducer(gameReducer, initialState);
    const [showPopup, setShowPopup] = useState(false);

    //initialize the game by creating a shuffled deck and dealing cards to the tableau area
    const initializeGame = useCallback(() => {
        const newDeck = shuffleDeck(createDeck());
        const newTableau = Array(7)
            .fill()
            .map((_, i) =>
                //deal 1 extra card in each tableau column
                newDeck.splice(0, i + 1).map((card, j) => ({
                    ...card,
                    isFlipped: j === i //only flip the last card in each column
                }))
            );

        dispatch({
            type: 'INITIALIZE_GAME',
            payload: {
                deck: newDeck,
                tableau: newTableau,
                stockPile: newDeck,
                foundation: { '♠': [], '♣': [], '♥': [], '♦': [] } // Reset foundation
            }
        });
    }, []);

    //initialize the game when the component mounts
    useEffect(() => {
        initializeGame();
    }, [initializeGame]);

    useEffect(() => {
        if (state.gameStatus === 'WON') {
            setShowPopup(true);
        }
    }, [state.gameStatus]);

    /**
     * Draw the top card from the stockpile into the waste pile.
     */
    const drawCard = () => {
        dispatch({ type: 'DRAW_CARD' });
    };

    /**
     * Move a card to a tableau column or foundation pile.
     * @param {Object} item - The item being moved.
     * @param {number} toColumnIndex - The index of the destination column.
     * @param {string} toFoundationSuit - The suit of the destination foundation pile.
     */
    const moveCard = (item, toColumnIndex, toFoundationSuit) => {
        const { card, fromWaste } = item;
        const index = fromWaste ? state.wastePile.length - 1 : item.index;
        const columnIndex = fromWaste ? undefined : item.columnIndex;

        console.log('Moving card:', item, 'toColumnIndex:', toColumnIndex, 'toFoundationSuit:', toFoundationSuit);
        dispatch({ type: 'MOVE_CARD', payload: { card, index, columnIndex, toColumnIndex, toFoundationSuit, fromWaste } });
    };

    const handleRestart = () => {
        setShowPopup(false);
        initializeGame();
    };

    return (
        <DndProvider backend={HTML5Backend}>
            <div>
                {showPopup && <Popup message="You Win!" onClose={() => setShowPopup(false)} onRestart={handleRestart}/>}
                <button className="center-button" onClick={handleRestart}>Forfeit</button>
                <div className="game-area">
                    {/* Foundation area */}
                    <div className="foundation">
                        {Object.keys(state.foundation).map((suit) => (
                            <FoundationPile
                                key={suit}
                                suit={suit}
                                cards={state.foundation[suit]}
                                moveCard={moveCard}
                            />
                        ))}
                    </div>

                    {/* Tableau area */}
                    <div className="tableau">
                        {state.tableau.map((column, columnIndex) => (
                            <TableauColumn
                                key={columnIndex}
                                column={column}
                                columnIndex={columnIndex}
                                moveCard={moveCard}
                            />
                        ))}
                    </div>

                    {/* Stock and waste pile area */}
                    <div className="stock-waste">
                        {/* Stockpile: click to draw a card */}
                        <div className="stock-pile" onClick={drawCard}>
                            {state.stockPile.length > 0 ? 'Draw Card' : 'Reset Stock'}
                        </div>

                        {/* Waste pile: display only the top card */}
                        <div className="waste-pile">
                            {state.wastePile.length > 0 ? (
                                <Card
                                    card={state.wastePile[state.wastePile.length - 1]}
                                    index={state.wastePile.length - 1}
                                    columnIndex={undefined}
                                    fromWaste={true}
                                />
                            ) : (
                                <div className="card empty"></div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </DndProvider>
    );
};

export default Solitaire;