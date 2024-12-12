//Many sections adapted by bgreiner2 from the Solitaire.jsx file authored by TheDevChuck
import React, { useReducer, useCallback, useEffect } from 'react';
import createDeck from '../utils/deck';
import shuffleDeck from '../utils/shuffle';
import getCardUnicode from '../utils/cardUnicode';

// Initial game state
const initialState = {
    deck: [], // The shuffled deck of cards
    playerHand: [], // Player's hand
    playerScore: 0, // Player's score
    dealerHand: [], // Dealer's hand
    dealerScore: 0, // Dealer's score
    gameStatus: 'NOT_STARTED' // Status of the game ('NOT_STARTED', 'IN_PROGRESS', 'PLAYER_WINS', 'DEALER_WINS', 'TIE')
};

// Reducer function to handle game state transitions
const blackjackReducer = (state, action) => {
    switch (action.type) {
        case 'INITIALIZE_GAME': {
            const deck = shuffleDeck(createDeck());
            const playerHand = [deck.pop(), deck.pop()];
            const dealerHand = [deck.pop(), deck.pop()];

            return {
                ...state,
                deck,
                playerHand,
                playerScore: calculateScore(playerHand),
                dealerHand,
                dealerScore: calculateScore(dealerHand),
                gameStatus: 'IN_PROGRESS'
            };
        }
        
        //Player chooses the 'Hit' button to draw another card to add to their score
        case 'PLAYER_HIT': {
            const newDeck = [...state.deck];
            const playerHand = [...state.playerHand, newDeck.pop()];
            const playerScore = calculateScore(playerHand);

            if (playerScore > 21) {
                return {
                    ...state,
                    deck: newDeck,
                    playerHand,
                    playerScore,
                    gameStatus: 'DEALER_WINS'
                };
            }

            return {
                ...state,
                deck: newDeck,
                playerHand,
                playerScore
            };
        }

        //Player chooses the 'Stand' button to make no move
        case 'PLAYER_STAND': {
            return {
                ...state,
                gameStatus: 'DEALER_TURN'
            };
        }
        case 'DEALER_TURN': {
            let { dealerHand, deck } = state;
            let dealerScore = calculateScore(dealerHand);

            //dealer must continue to draw cards until their score is 17 or greater
            while (dealerScore < 17) {
                dealerHand = [...dealerHand, deck.pop()];
                dealerScore = calculateScore(dealerHand);
            }

            let gameStatus;
            if (dealerScore > 21 || state.playerScore > dealerScore) {
                gameStatus = 'PLAYER_WINS';
            } else if (state.playerScore < dealerScore) {
                gameStatus = 'DEALER_WINS';
            } else {
                gameStatus = 'TIE';
            }

            return {
                ...state,
                dealerHand,
                dealerScore,
                gameStatus
            };
        }
        default:
            return state;
    }
};

// Utility function to calculate the score of a hand
const calculateScore = (hand) => {
    let total = 0;
    let aces = 0;

    hand.forEach((card) => {
        if (card.value === 'A') {
            aces += 1;
            total += 11;
        } else if (['K', 'Q', 'J'].includes(card.value)) {
            total += 10;
        } else {
            total += parseInt(card.value, 10);
        }
    });

    //if an ace would put the total at over 21, then the value of the ace becomes 1 rather than 11
    while (total > 21 && aces > 0) {
        total -= 10;
        aces -= 1;
    }

    return total;
};

//Card component to use the unicode for card icons rather than just a symbol and number
const Card = ({ card }) => {
    if (!card) return null;

    const unicodeCard = getCardUnicode(card.value, card.suit);

    // Inline styles for card rendering
    const cardStyle = {
        fontSize: '8em', // Adjust size
        margin: '5px',    // Add spacing between cards
        display: 'inline-block', // Ensure cards are displayed inline
        textAlign: 'center', // Center align text
        color: card.suit === '♥' || card.suit === '♦' ? 'red' : 'black', // Updates color of card symbols to match suit
    };

    return (
        <span
            style={cardStyle}
            role="img"
            aria-label={`${card.value} of ${card.suit}`}
        >
            {String.fromCodePoint(parseInt(unicodeCard.replace('\\u{', '').replace('}', ''), 16))}
        </span>
    );
};

// Main Blackjack component
const Blackjack = () => {
    const [state, dispatch] = useReducer(blackjackReducer, initialState);

    const initializeGame = useCallback(() => {
        dispatch({ type: 'INITIALIZE_GAME' });
    }, []);

    const playerHit = () => {
        dispatch({ type: 'PLAYER_HIT' });
    };

    const playerStand = () => {
        dispatch({ type: 'PLAYER_STAND' });
        setTimeout(() => dispatch({ type: 'DEALER_TURN' }), 1000);
    };

    useEffect(() => {
        initializeGame();
    }, [initializeGame]);

    return (
        <div className="blackjack-container">
            <h1>Blackjack</h1>

            <div className="game-area">
                {state.gameStatus === 'NOT_STARTED' && (
                    <button className="start-button" onClick={initializeGame}>Start Game</button>
                )}

                {state.gameStatus === 'IN_PROGRESS' && (
                    <div className="player-area">
                        <h2>Player's Hand ({state.playerScore})</h2>
                        <div className="cards">{state.playerHand.map((card, i) => (<Card key={i} card={card} />))}</div>
                        <div className="actions">
                            <button className="hit-button" onClick={playerHit}>Hit</button>
                            <button className="stand-button" onClick={playerStand}>Stand</button>
                        </div>
                    </div>
                )}

                {(state.gameStatus === 'PLAYER_WINS' ||
                    state.gameStatus === 'DEALER_WINS' ||
                    state.gameStatus === 'TIE') && (
                    <div className="results-area">
                        <h2>Game Over: {state.gameStatus.replace('_', ' ')}</h2>
                        <h3>Dealer's Hand ({state.dealerScore})</h3>
                        <div className="cards">{state.dealerHand.map((card, i) => (<Card key={i} card={card} />))}</div>
                        <button className="restart-button" onClick={initializeGame}>Play Again</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Blackjack;