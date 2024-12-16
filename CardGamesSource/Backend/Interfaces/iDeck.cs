using Backend.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Backend.interfaces
{
    public interface iDeck
    {

        bool isEmpty { get; }

        int remainingCards { get; }

        void shuffle();

        iCard drawCard();

        void reset();

        void addCard(iCard card);

        bool removeCard(iCard card);

    }
}
