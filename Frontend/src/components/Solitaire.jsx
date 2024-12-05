import React, { useReducer, useEffect, useCallback } from 'react';
import { createDeck } from '../utils/deck';
import { shuffleDeck } from '../utils/shuffle';

const initialState = {
    deck: [],
    tableau: [],
    foundation: { '♠': [], '♣': [], '♥': [], '♦': [] },
    stockPile: [],
    wastePile: [],
    score: 0,
    moves: 0,
    gameStatus: 'NOT_STARTED'
};

const gameReducer = (state, action) => {
    switch (action.type) {
        case 'INITIALIZE_GAME':
            return {
                ...state,
                deck: action.payload.deck,
                tableau: action.payload.tableau,
                stockPile: action.payload.stockPile,
                wastePile: [],
                gameStatus: 'IN_PROGRESS'
            };
        case 'DRAW_CARD':
            if (state.stockPile.length > 0) {
                const newStockPile = [...state.stockPile];
                const drawnCard = newStockPile.pop();
                return {
                    ...state,
                    stockPile: newStockPile,
                    wastePile: [...state.wastePile, { ...drawnCard, isFlipped: true }]
                };
            } else {
                //reset the stock from the waste pile
                return {
                    ...state,
                    stockPile: [...state.wastePile].reverse().map(card => ({ ...card, isFlipped: false })),
                    wastePile: []
                };
            }
        default:
            return state;
    }
};

const Solitaire = () => {
    const [state, dispatch] = useReducer(gameReducer, initialState);

    const initializeGame = useCallback(() => {
        const newDeck = shuffleDeck(createDeck());
        const newTableau = Array(7).fill().map((_, i) =>
            newDeck.splice(0, i + 1).map((card, j) => ({
                ...card,
                isFlipped: j === i
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

    useEffect(() => {
        initializeGame();
    }, [initializeGame]);

    const drawCard = () => {
        dispatch({ type: 'DRAW_CARD' });
    };

    return (
        <div>
            <h1>Klondike Solitaire</h1>
            <div className="game-area">
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
                <div className="stock-waste">
                    <div className="stock-pile" onClick={drawCard}>
                        {state.stockPile.length > 0 ? '🂠' : 'Reset Stock'}
                    </div>
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
