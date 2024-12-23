﻿import React, { useEffect, useState } from 'react';
import BlackjackCard, { newCard, calculateHandValue } from '../utils/blackjack/cardManagement';
import { addPlayer, removePlayer } from '../utils/blackjack/playerManagement';
import { hit, stand, dealCards } from '../utils/blackjack/gameActions';
import './blackjack.css';

const Blackjack = () => {
    const [dealerCards, setDealerCards] = useState([]);
    const [dealerBusted, setDealerBusted] = useState(false);
    const [players, setPlayers] = useState([{ id: 1, cards: [], hasStood: false, isBusted: false, result: '', wins: 0, losses: 0 }]);
    const [cardsDealt, setCardsDealt] = useState(false);
    const [nextPlayerId, setNextPlayerId] = useState(2);

    const dealerTurn = () => {
        let newDealerCards = [...dealerCards];
        let dealerValue = calculateHandValue(newDealerCards);
        while (dealerValue < 17) {
            newDealerCards.push(newCard());
            dealerValue = calculateHandValue(newDealerCards);
        }
        setDealerCards(newDealerCards.map(card => ({ ...card, isFlipped: true })));
        if (dealerValue > 21) {
            setDealerBusted(true);
            setPlayers(players.map(player => ({
                ...player,
                result: player.isBusted ? 'You Lose!' : 'You Win!',
                wins: player.isBusted ? player.wins : player.wins + 1,
                losses: player.isBusted ? player.losses + 1 : player.losses
            })));
        } else {
            setPlayers(players.map(player => {
                const playerValue = calculateHandValue(player.cards);
                let result = '';
                let wins = player.wins;
                let losses = player.losses;
                if (!player.isBusted) {
                    if (playerValue > dealerValue) {
                        result = 'You Win!';
                        wins += 1;
                    } else if (playerValue < dealerValue) {
                        result = 'You Lose!';
                        losses += 1;
                    } else {
                        result = 'Push';
                    }
                } else {
                    result = 'You Lose!';
                    losses += 1;
                }
                return { ...player, result, wins, losses };
            }));
        }
    };

    useEffect(() => {
        if (cardsDealt && players.every(player => player.hasStood || player.isBusted)) {
            dealerTurn();
            setCardsDealt(false); //only call the dealer once
        }
    }, [players]);

    return (
        <div className="blackjack-game centered">
            <div className="dealer-area">
                <h2>Dealer's Cards</h2>
                <div className="cards">
                    {dealerCards.length > 0 ? (
                        dealerCards.map((card, index) => (
                            <BlackjackCard key={index} card={card}/>
                        ))
                    ) : (
                        <div className="empty-cards"></div>
                    )}
                </div>
                <p className="hand-value">Hand
                    Value: {calculateHandValue(dealerCards.filter(card => card.isFlipped))}</p>
                {dealerBusted ? <p className="win-condition">Bust!</p> :
                    <p className="invisible-text win-condition">Bust!</p>}
            </div>
            <div className="player-areas">
                {players.map(player => (
                    <div key={player.id} className="player-area">
                        <h2>Player {player.id}'s Cards</h2>
                        <div className="cards">
                            {player.cards.length > 0 ? (
                                player.cards.map((card, index) => (
                                    <BlackjackCard key={index} card={card}/>
                                ))
                            ) : (
                                <div className="empty-cards"></div>
                            )}
                        </div>
                        <p className="hand-value">Hand Value: {calculateHandValue(player.cards)}</p>
                        <button onClick={() => hit(players, player.id, setPlayers)}
                                disabled={!cardsDealt || player.hasStood || player.isBusted}>Hit
                        </button>
                        <button onClick={() => stand(players, player.id, setPlayers)}
                                disabled={!cardsDealt || player.hasStood || player.isBusted}>Stand
                        </button>
                        <button onClick={() => removePlayer(players, player.id, setPlayers)}
                                disabled={cardsDealt || players.length <= 1}>Remove Player
                        </button>
                        {player.isBusted ? <p className="win-condition">Bust!</p> : player.result ?
                            <p className="win-condition">{player.result}</p>
                            : <p className="invisible-text win-condition">Result</p>}
                        <p className="wins">Wins: {player.wins}</p>
                        <p className="losses">Losses: {player.losses}</p>
                    </div>
                ))}
            </div>
            <button onClick={() => dealCards(players, setDealerCards, setDealerBusted, setPlayers, setCardsDealt)} disabled={cardsDealt}>Deal Cards</button>
            <button onClick={() => addPlayer(players, nextPlayerId, setPlayers, setNextPlayerId)} disabled={cardsDealt}>Add Player</button>
        </div>
    );
};

export default Blackjack;