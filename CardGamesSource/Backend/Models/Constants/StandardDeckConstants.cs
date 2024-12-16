using Backend.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static Backend.Models.Constants.StandardCardConstants;

namespace Backend.Models.Constants
{
    public class StandardDeckConstants
    {
        // A -> K, Spades -> Hearts -> Clubs -> Diamonds
        public readonly List<iCard> FullDeck = new List<iCard>
        {
            // Spades
            new StandardCard(ace, spades),
            new StandardCard(two, spades),
            new StandardCard(three, spades),
            new StandardCard(four, spades),
            new StandardCard(five, spades),
            new StandardCard(six, spades),
            new StandardCard(seven, spades),
            new StandardCard(eight, spades),
            new StandardCard(nine, spades),
            new StandardCard(ten, spades),
            new StandardCard(jack, spades),
            new StandardCard(queen, spades),
            new StandardCard(king, spades),
            // Hearts
            new StandardCard(ace, hearts),
            new StandardCard(two, hearts),
            new StandardCard(three, hearts),
            new StandardCard(four, hearts),
            new StandardCard(five, hearts),
            new StandardCard(six, hearts),
            new StandardCard(seven, hearts),
            new StandardCard(eight, hearts),
            new StandardCard(nine, hearts),
            new StandardCard(ten, hearts),
            new StandardCard(jack, hearts),
            new StandardCard(queen, hearts),
            new StandardCard(king, hearts),
            // Clubs
            new StandardCard(ace, clubs),
            new StandardCard(two, clubs),
            new StandardCard(three, clubs),
            new StandardCard(four, clubs),
            new StandardCard(five, clubs),
            new StandardCard(six, clubs),
            new StandardCard(seven, clubs),
            new StandardCard(eight, clubs),
            new StandardCard(nine, clubs),
            new StandardCard(ten, clubs),
            new StandardCard(jack, clubs),
            new StandardCard(queen, clubs),
            new StandardCard(king, clubs),
            // Diamonds
            new StandardCard(ace, diamonds),
            new StandardCard(two, diamonds),
            new StandardCard(three, diamonds),
            new StandardCard(four, diamonds),
            new StandardCard(five, diamonds),
            new StandardCard(six, diamonds),
            new StandardCard(seven, diamonds),
            new StandardCard(eight, diamonds),
            new StandardCard(nine, diamonds),
            new StandardCard(ten, diamonds),
            new StandardCard(jack, diamonds),
            new StandardCard(queen, diamonds),
            new StandardCard(king, diamonds)

        };
    }
}
