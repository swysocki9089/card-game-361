import React, { useReducer, useEffect, useCallback, useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import createDeck from '../utils/solitaire/deck';
import shuffleDeck from '../utils/solitaire/shuffle';
import gameReducer from '../utils/solitaire/gameReducer';
import Popup from '../utils/solitaire/popup';
import Card from '../utils/solitaire/card';
import TableauColumn from '../utils/solitaire/tableau';
import FoundationPile from '../utils/solitaire/foundation';

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
                    {/* foundation area */}
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

                    {/* tableau area */}
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

                    {/* stock and waste pile area */}
                    <div className="stock-waste">
                        {/* stockpile: click to draw a card */}
                        <div className="stock-pile" onClick={drawCard}>
                            {state.stockPile.length > 0 ? 'Draw Card' : 'Reset Stock'}
                        </div>

                        {/* waste pile: display only the top card */}
                        <div className="waste-pile">
                            {state.wastePile.length > 0 ? (
                                <Card
                                    card={state.wastePile[state.wastePile.length - 1]}
                                    index={state.wastePile.length - 1}
                                    columnIndex={undefined}
                                    fromWaste={true}
                                />
                            ) : (
                                <div className="empty-column"></div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </DndProvider>
    );
};

export default Solitaire;