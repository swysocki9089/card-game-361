using System;
using Backend.Interfaces;

namespace Backend.Models
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

        public override bool Equals(object obj)
        {
            if (obj is StandardCard otherCard)
            {
                return CardValue.Equals(otherCard.CardValue) && CardSuit.Equals(otherCard.CardSuit);
            }
            return false;
        }

        public override int GetHashCode()
        {
            return HashCode.Combine(CardValue, CardSuit);
        }

        public static bool operator ==(StandardCard left, StandardCard right)
        {
            if (left is null) return right is null;
            return left.Equals(right);
        }

        public static bool operator !=(StandardCard left, StandardCard right)
        {
            return !(left == right);
        }
    }
}
