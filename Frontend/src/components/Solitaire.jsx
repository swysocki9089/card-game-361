import React, { useReducer, useEffect, useCallback } from 'react';
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
        default:
            return state;
    }
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

    return (
        <div>
            <h1>Klondike Solitaire</h1>
            <div className="game-area">
                {/* Foundation area */}
                <div className="foundation">
                    {Object.keys(state.foundation).map((suit) => (
                        <div key={suit} className="foundation-pile">
                            {state.foundation[suit].length > 0 ? (
                                <div className="card">
                                    {`${state.foundation[suit][state.foundation[suit].length - 1].value}${suit}`}
                                </div>
                            ) : (
                                <div className="card empty">Empty</div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Tableau area */}
                <div className="tableau">
                    {state.tableau.map((column, columnIndex) => (
                        <div key={columnIndex} className="tableau-column">
                            {column.map((card, cardIndex) => (
                                <div key={cardIndex} className={`card ${card.isFlipped ? 'flipped' : ''}`}>
                                    {card.isFlipped ? `${card.value}${card.suit}` : '🂠'}
                                </div>
                            ))}
                        </div>
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
    );
};

export default Solitaire;