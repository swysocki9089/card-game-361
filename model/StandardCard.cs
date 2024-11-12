using System;
using CardGames.Interfaces;

namespace CardGames.Model
{
	public class StandardCard : iCard
	{
		public iCardValue CardValue { get; set; }
		public iCardSuit CardSuit { get; set; }

		public StandardCard(iCardValue value, iCardSuit suit)
		{
			CardSuit = suit ?? throw new ArgumentNullException(nameof(suit));
			CardValue = value ?? throw new ArgumentNullException(nameof(value));
		}

        public string GetSuitName()
        {
            return CardSuit.Name;
        }

        public string GetValueName()
        {
            return CardValue.Name;
        }

        public string GetFullName()
        {
            return $"{GetValueName()} of {GetSuitName()}";
        }
    }
}
