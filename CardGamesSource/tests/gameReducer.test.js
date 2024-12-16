import gameReducer from '../src/utils//solitaire/gameReducer';

describe('gameReducer', () => {
    const initialState = {
        deck: [],
        tableau: [[], [], [], [], [], [], []],
        stockPile: [],
        foundation: { '♠': [], '♣': [], '♥': [], '♦': [] },
        wastePile: [],
        gameStatus: 'NOT_STARTED'
    };

    it('should initialize the game', () => {
        const action = {
            type: 'INITIALIZE_GAME',
            payload: {
                deck: [{ suit: '♠', value: 'A' }],
                tableau: [[{ suit: '♠', value: '2' }]],
                stockPile: [{ suit: '♠', value: '3' }],
                foundation: { '♠': [], '♣': [], '♥': [], '♦': [] }
            }
        };
        const newState = gameReducer(initialState, action);
        expect(newState.deck).toEqual(action.payload.deck);
        expect(newState.tableau).toEqual(action.payload.tableau);
        expect(newState.stockPile).toEqual(action.payload.stockPile);
        expect(newState.foundation).toEqual(action.payload.foundation);
        expect(newState.wastePile).toEqual([]);
        expect(newState.gameStatus).toBe('IN_PROGRESS');
    });

    it('should draw a card from stockPile to wastePile', () => {
        const state = {
            ...initialState,
            stockPile: [{ suit: '♠', value: 'A' }],
            wastePile: []
        };
        const action = { type: 'DRAW_CARD' };
        const newState = gameReducer(state, action);
        expect(newState.stockPile).toHaveLength(0);
        expect(newState.wastePile).toHaveLength(1);
        expect(newState.wastePile[0]).toEqual({ suit: '♠', value: 'A', isFlipped: true });
    });

    it('should move a card from wastePile to tableau', () => {
        const state = {
            ...initialState,
            wastePile: [{ suit: '♠', value: 'K', isFlipped: true }],
            tableau: [[], [], [], [], [], [], []]
        };
        const action = {
            type: 'MOVE_CARD',
            payload: {
                card: { suit: '♠', value: 'K', isFlipped: true },
                toColumnIndex: 0,
                fromWaste: true
            }
        };
        const newState = gameReducer(state, action);
        expect(newState.wastePile).toHaveLength(0);
        expect(newState.tableau[0]).toHaveLength(1);
        expect(newState.tableau[0][0]).toEqual({ suit: '♠', value: 'K', isFlipped: true });
            });

    it('should move a card from tableau to foundation', () => {
        const state = {
            ...initialState,
            tableau: [[{ suit: '♠', value: 'A', isFlipped: true }]],
            foundation: { '♠': [], '♣': [], '♥': [], '♦': [] }
        };
        const action = {
            type: 'MOVE_CARD',
            payload: {
                card: { suit: '♠', value: 'A', isFlipped: true },
                columnIndex: 0,
                toFoundationSuit: '♠'
            }
        };
        const newState = gameReducer(state, action);
        expect(newState.tableau[0]).toHaveLength(0);
        expect(newState.foundation['♠']).toHaveLength(1);
        expect(newState.foundation['♠'][0]).toEqual({ suit: '♠', value: 'A', isFlipped: true });
    });

    it('should detect a win condition', () => {
        const state = {
            ...initialState,
            foundation: {
                '♠': Array(13).fill({ suit: '♠', value: 'A' }),
                '♣': Array(13).fill({ suit: '♣', value: 'A' }),
                '♥': Array(13).fill({ suit: '♥', value: 'A' }),
                '♦': Array(13).fill({ suit: '♦', value: 'A' })
            }
        };
        const action = { type: 'MOVE_CARD', payload: {} };
        const newState = gameReducer(state, action);
        expect(newState.gameStatus).toBe('WON');
    });
});