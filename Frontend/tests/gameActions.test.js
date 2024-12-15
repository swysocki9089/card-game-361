import { hit, stand, dealCards } from '../src/utils/blackjack/gameActions';
import { newCard, calculateHandValue } from '../src/utils/blackjack/cardManagement';

jest.mock('../src/utils/blackjack/cardManagement');

describe('gameActions', () => {
    let players;
    let setPlayers;
    let setDealerCards;
    let setDealerBusted;
    let setCardsDealt;

    beforeEach(() => {
        players = [
            { id: 1, cards: [], isBusted: false, hasStood: false },
            { id: 2, cards: [], isBusted: false, hasStood: false }
        ];
        setPlayers = jest.fn();
        setDealerCards = jest.fn();
        setDealerBusted = jest.fn();
        setCardsDealt = jest.fn();
    });

    describe('hit', () => {
        it('should add a new card to the player\'s hand and update the player\'s state', () => {
            newCard.mockReturnValue({ suit: '♠', value: '10', isFlipped: true });
            calculateHandValue.mockReturnValue(20);

            hit(players, 1, setPlayers);

            const expectedPlayers = [
                { id: 1, cards: [{ suit: '♠', value: '10', isFlipped: true }], isBusted: false, hasStood: false },
                { id: 2, cards: [], isBusted: false, hasStood: false }
            ];
            expect(setPlayers).toHaveBeenCalledWith(expectedPlayers);
        });

        it('should mark the player as busted if hand value exceeds 21', () => {
            newCard.mockReturnValue({ suit: '♠', value: 'K', isFlipped: true });
            calculateHandValue.mockReturnValue(22);

            hit(players, 1, setPlayers);

            const expectedPlayers = [
                { id: 1, cards: [{ suit: '♠', value: 'K', isFlipped: true }], isBusted: true, hasStood: false },
                { id: 2, cards: [], isBusted: false, hasStood: false }
            ];
            expect(setPlayers).toHaveBeenCalledWith(expectedPlayers);
        });
    });

    describe('stand', () => {
        it('should mark the player as having stood', () => {
            stand(players, 1, setPlayers);

            const expectedPlayers = [
                { id: 1, cards: [], isBusted: false, hasStood: true },
                { id: 2, cards: [], isBusted: false, hasStood: false }
            ];
            expect(setPlayers).toHaveBeenCalledWith(expectedPlayers);
        });
    });

    describe('dealCards', () => {
        it('should deal two cards to each player and two cards to the dealer', () => {
            newCard.mockReturnValueOnce({ suit: '♠', value: '10', isFlipped: true })
                .mockReturnValueOnce({ suit: '♠', value: '5', isFlipped: false })
                .mockReturnValueOnce({ suit: '♠', value: '9', isFlipped: true })
                .mockReturnValueOnce({ suit: '♠', value: '8', isFlipped: true })
                .mockReturnValueOnce({ suit: '♠', value: '7', isFlipped: true })
                .mockReturnValueOnce({ suit: '♠', value: '6', isFlipped: true });
            
            dealCards(players, setDealerCards, setDealerBusted, setPlayers, setCardsDealt);

            const expectedDealerCards = [
                { suit: '♠', value: '10', isFlipped: true },
                { suit: '♠', value: '5', isFlipped: false }
            ];
            const expectedPlayers = [
                { id: 1, cards: [{ suit: '♠', value: '9', isFlipped: true }, { suit: '♠', value: '8', isFlipped: true }], isBusted: false, hasStood: false, result: '' },
                { id: 2, cards: [{ suit: '♠', value: '7', isFlipped: true }, { suit: '♠', value: '6', isFlipped: true }], isBusted: false, hasStood: false, result: '' }
            ];

            expect(setDealerCards).toHaveBeenCalledWith(expectedDealerCards);
            expect(setDealerBusted).toHaveBeenCalledWith(false);
            expect(setPlayers).toHaveBeenCalledWith(expectedPlayers);
            expect(setCardsDealt).toHaveBeenCalledWith(true);
        });
    });
});