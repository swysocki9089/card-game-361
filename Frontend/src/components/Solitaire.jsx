import React, { useReducer, useEffect, useCallback } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { createDeck } from '../utils/deck';
import { shuffleDeck } from '../utils/shuffle';

//initial game state
const initialState = {
    deck: [], //array to hold the deck of cards
    tableau: [], //column of cards in the tableau area
    foundation: { '♠': [], '♣': [], '♥': [], '♦': [] }, //foundation piles for each suit
    stockPile: [], //cards in the stockpile
    wastePile: [], //cards drawn from the stockpile
    score: 0, //players score (unimplemented)
    moves: 0, //players moves (unimplemented)
    gameStatus: 'NOT_STARTED' //game status (unimplemented)
};

/**reducer function to handle game state transitions.
 */
const gameReducer = (state, action) => {
    switch (action.type) {
        case 'INITIALIZE_GAME': {
            //initialize the game with a shuffled deck and tableau area
            return {
                ...state,
                deck: action.payload.deck,
                tableau: action.payload.tableau,
                stockPile: action.payload.stockPile,
                wastePile: [],
                gameStatus: 'IN_PROGRESS'
            };
        }
        case 'DRAW_CARD': {
            //allows cards to be drawn from stockpile
            if (state.stockPile.length > 0) {
                const newStockPile = [...state.stockPile];
                const drawnCard = newStockPile.pop();
                return {
                    ...state,
                    stockPile: newStockPile,
                    wastePile: [...state.wastePile, { ...drawnCard, isFlipped: true }]
                };
            } else {
                //resets the stockpile when it is empty
                return {
                    ...state,
                    stockPile: [...state.wastePile].reverse().map(card => ({ ...card, isFlipped: false })),
                    wastePile: []
                };
            }
        }
        case 'MOVE_CARD': {
            const { item, toColumnIndex, toFoundationSuit } = action.payload;
            const { card, index, columnIndex } = item;

            //moving card within tableau
            if (toColumnIndex !== undefined && Array.isArray(state.tableau[toColumnIndex])) {
                const fromColumn = [...state.tableau[columnIndex]];
                const toColumn = [...state.tableau[toColumnIndex]];

                //check if the move is valid
                if (isValidTableauMove(card, toColumn)) {
                    const movingCards = fromColumn.splice(index);
                    return {
                        ...state,
                        tableau: state.tableau.map((col, i) => {
                            if (i === columnIndex) return fromColumn;
                            if (i === toColumnIndex) return [...toColumn, ...movingCards];
                            return col;
                        })
                    };
                }
            }

            //moving card to foundation
            if (toFoundationSuit !== undefined) {
                const fromColumn = [...state.tableau[columnIndex]];
                const toFoundation = [...state.foundation[toFoundationSuit]];

                //check if the move is valid
                if (isValidFoundationMove(card, toFoundation)) {
                    fromColumn.pop();
                    return {
                        ...state,
                        tableau: state.tableau.map((col, i) => (i === columnIndex ? fromColumn : col)),
                        foundation: {
                            ...state.foundation,
                            [toFoundationSuit]: [...toFoundation, card]
                        }
                    };
                }
            }

            return state;
        }
        default:
            return state;
    }
};

/**function to check if a card can be moved to a tableau column.
 * @param {Object} card - The card object.
 * @param {Array} toColumn - The array of cards in the destination column.
 * @returns {boolean} True if the move is valid, false otherwise.
 */
const isValidTableauMove = (card, toColumn) => {
    if (toColumn.length === 0) {
        return card.value === 'K'; // Only Kings can be placed on empty columns
    }
    const topCard = toColumn[toColumn.length - 1];
    return (
        (card.suit === '♠' || card.suit === '♣') !== (topCard.suit === '♠' || topCard.suit === '♣') &&
        getCardValue(card.value) === getCardValue(topCard.value) - 1
    );
};

/**function to check if a card can be moved to a foundation pile.
 * @param {Object} card - The card object.
 * @param {Array} toFoundation - The array of cards in the destination foundation pile.
 * @returns {boolean} True if the move is valid, false otherwise.
 */
const isValidFoundationMove = (card, toFoundation) => {
    if (toFoundation.length === 0) {
        return card.value === 'A'; // Only Aces can be placed on empty foundation piles
    }
    const topCard = toFoundation[toFoundation.length - 1];
    return card.suit === topCard.suit && getCardValue(card.value) === getCardValue(topCard.value) + 1;
};

/**function to convert card values to numerical values for comparison.
 * @param {string} value - The card value.
 * @returns {number} The numerical value of the card.
 */
const getCardValue = (value) => {
    if (value === 'A') return 1;
    if (value === 'J') return 11;
    if (value === 'Q') return 12;
    if (value === 'K') return 13;
    return parseInt(value, 10);
};

/**Card component represents a single card in the game.
 * It uses the useDrag hook to make the card draggable.
 * @param {Object} props - The properties object.
 * @param {Object} props.card - The card object.
 * @param {number} props.index - The index of the card in its column.
 * @param {number} props.columnIndex - The index of the column the card belongs to.
 * @returns {JSX.Element} The rendered card component.
 */
const Card = ({ card, index, columnIndex }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: 'CARD',
        item: { card, index, columnIndex },
        collect: (monitor) => ({
            isDragging: monitor.isDragging()
        })
    }));

    return (
        <div
            ref={drag}
            className={`card ${card.isFlipped ? 'flipped' : ''}`}
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
            {column.map((card, cardIndex) => (
                <Card key={cardIndex} card={card} index={cardIndex} columnIndex={columnIndex} />
            ))}
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
        drop: (item) => moveCard(item, undefined, suit)
    }));

    return (
        <div ref={drop} className="foundation-pile">
            {cards.length > 0 ? (
                <div className="card">
                    {`${cards[cards.length - 1].value}${suit}`}
                </div>
            ) : (
                <div className="card empty">Empty</div>
            )}
        </div>
    );
};

/**main solitaire component to manage the game state and render the UI
 */
const Solitaire = () => {
    //manage the game state using the useReducer function
    const [state, dispatch] = useReducer(gameReducer, initialState);

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
                stockPile: newDeck
            }
        });
    }, []);

    //initialize the game when the component mounts
    useEffect(() => {
        initializeGame();
    }, [initializeGame]);

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
        dispatch({ type: 'MOVE_CARD', payload: { item, toColumnIndex, toFoundationSuit } });
    };

    return (
        <DndProvider backend={HTML5Backend}>
            <div>
                <h1>Klondike Solitaire</h1>
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

                    {/*stock and waste pile area */}
                    <div className="stock-waste">
                        {/*stockpile: click to draw a card */}
                        <div className="stock-pile" onClick={drawCard}>
                            {state.stockPile.length > 0 ? '🂠' : 'Reset Stock'}
                        </div>

                        {/*waste pile: display only the top card */}
                        <div className="waste-pile">
                            {state.wastePile.length > 0 ? (
                                <div className="card">
                                    {`${state.wastePile[state.wastePile.length - 1].value}${state.wastePile[state.wastePile.length - 1].suit}`}
                                </div>
                            ) : (
                                <div className="card empty">Empty</div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </DndProvider>
    );
};

export default Solitaire;