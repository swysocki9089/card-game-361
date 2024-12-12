
const gameReducer = (state, action) => {
    switch (action.type) {
        case 'INITIALIZE_GAME': {
            return {
                ...state,
                deck: action.payload.deck,
                tableau: action.payload.tableau,
                stockPile: action.payload.stockPile,
                foundation: action.payload.foundation,
                wastePile: [],
                gameStatus: 'IN_PROGRESS'
            };
        }
        case 'DRAW_CARD': {
            if (state.stockPile.length > 0) {
                const newStockPile = [...state.stockPile];
                const drawnCard = newStockPile.pop();
                return {
                    ...state,
                    stockPile: newStockPile,
                    wastePile: [...state.wastePile, { ...drawnCard, isFlipped: true }]
                };
            } else {
                return {
                    ...state,
                    stockPile: [...state.wastePile].reverse().map(card => ({ ...card, isFlipped: false })),
                    wastePile: []
                };
            }
        }
        case 'MOVE_CARD': {
            const { card, index, columnIndex, toColumnIndex, toFoundationSuit, fromWaste } = action.payload;

            let newState = { ...state };

            if (fromWaste && toColumnIndex !== undefined && Array.isArray(state.tableau[toColumnIndex])) {
                const toColumn = [...state.tableau[toColumnIndex]];

                if (isValidTableauMove(card, toColumn)) {
                    newState = {
                        ...state,
                        wastePile: state.wastePile.slice(0, -1),
                        tableau: state.tableau.map((col, i) => {
                            if (i === toColumnIndex) return [...toColumn, card];
                            return col;
                        })
                    };
                }
            }

            if (columnIndex !== undefined && toColumnIndex !== undefined && Array.isArray(state.tableau[toColumnIndex])) {
                const fromColumn = [...state.tableau[columnIndex]];
                const toColumn = [...state.tableau[toColumnIndex]];

                if (isValidTableauMove(card, toColumn)) {
                    const movingCards = fromColumn.splice(index);
                    if (fromColumn.length > 0) {
                        fromColumn[fromColumn.length - 1].isFlipped = true;
                    }
                    newState = {
                        ...state,
                        tableau: state.tableau.map((col, i) => {
                            if (i === columnIndex) return fromColumn;
                            if (i === toColumnIndex) return [...toColumn, ...movingCards];
                            return col;
                        })
                    };
                }
            }

            if (columnIndex !== undefined && toFoundationSuit !== undefined) {
                const fromColumn = [...state.tableau[columnIndex]];
                const toFoundation = [...state.foundation[toFoundationSuit]];

                if (isValidFoundationMove(card, toFoundation, toFoundationSuit)) {
                    fromColumn.pop();
                    if (fromColumn.length > 0) {
                        fromColumn[fromColumn.length - 1].isFlipped = true;
                    }
                    newState = {
                        ...state,
                        tableau: state.tableau.map((col, i) => (i === columnIndex ? fromColumn : col)),
                        foundation: {
                            ...state.foundation,
                            [toFoundationSuit]: [...toFoundation, card]
                        }
                    };
                }
            }

            if (columnIndex === undefined && toFoundationSuit !== undefined) {
                const toFoundation = [...state.foundation[toFoundationSuit]];

                if (isValidFoundationMove(card, toFoundation, toFoundationSuit)) {
                    newState = {
                        ...state,
                        wastePile: state.wastePile.slice(0, -1),
                        foundation: {
                            ...state.foundation,
                            [toFoundationSuit]: [...toFoundation, card]
                        }
                    };
                }
            }

            if (checkWinCondition(newState.foundation)) {
                newState.gameStatus = 'WON';
            }

            return newState;
        }
        default:
            return state;
    }
};

const isValidTableauMove = (card, toColumn) => {
    if (toColumn.length === 0) {
        return card.value === 'K';
    }
    const topCard = toColumn[toColumn.length - 1];
    return (
        (card.suit === '♠' || card.suit === '♣') !== (topCard.suit === '♠' || topCard.suit === '♣') &&
        getCardValue(card.value) === getCardValue(topCard.value) - 1
    );
};

const isValidFoundationMove = (card, toFoundation, toFoundationSuit) => {
    if (toFoundation.length === 0) {
        return card.value === 'A' && card.suit === toFoundationSuit;
    }
    const topCard = toFoundation[toFoundation.length - 1];
    return card.suit === topCard.suit && getCardValue(card.value) === getCardValue(topCard.value) + 1;
};

const getCardValue = (value) => {
    if (value === 'A') return 1;
    if (value === 'J') return 11;
    if (value === 'Q') return 12;
    if (value === 'K') return 13;
    return parseInt(value, 10);
};

const checkWinCondition = (foundation) => {
    return Object.values(foundation).every(pile => pile.length === 13);
};

export { gameReducer };