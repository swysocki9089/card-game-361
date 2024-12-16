using Backend.Interfaces;
using Backend.Models.Constants;
using Backend.Models.Utilities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.InteropServices;
using System.Text;
using System.Threading.Tasks;
using static Backend.Models.Constants.StandardDeckConstants;

namespace Backend.Models
{
    public class StandardDeck : iDeck
    {
        private List<iCard> _cards;
        private StandardDeckConstants _deckConsts = new();

        public bool isEmpty => _cards.Count == 0;
        
        public int remainingCards => _cards.Count;


        // Initialize new deck and shuffle
        public StandardDeck()
        {
            reset();
        }

        // Initialize new deck from given cards
        public StandardDeck(List<iCard> cards)
        {
            _cards = cards;
        }
        
        // Shuffle using Fisher-Yates algorithm, seeded with current Epoch Time
        public void shuffle()        
        {
            _cards.Shuffle();
        }
        
        // Returns ordered deck constant
        private List<iCard> generateStandardDeck()
        {
            return _deckConsts.FullDeck;
        }

        // returns full shuffled deck
        public void reset()
        {
            _cards = new List<iCard>(generateStandardDeck());
            shuffle();
        }

        public void addCard(iCard card)
        {
            _cards.Add(card);
        }

        public bool removeCard(iCard card) 
        { 
            return _cards.Remove(card); 
        }

        public iCard drawCard()
        {
            if (isEmpty) return null;
            StandardCard card = (StandardCard) _cards[0];
            _cards.RemoveAt(0);
            Console.WriteLine(card.GetFullName());
            return card;
        } 

    }
}
