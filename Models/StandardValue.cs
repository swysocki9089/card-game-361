using System;
using CardGames.Interfaces;

namespace CardGames.Models
{
	public class StandardValue : iCardValue
	{
		public string Name { get; }
		public int Rank { get; }

		public StandardValue(string name, int rank)
		{
			Name = name;
			Rank = rank;
		}
        public override bool Equals(object obj)
        {
            if (obj is StandardValue otherValue)
            {
                return Name == otherValue.Name && Rank == otherValue.Rank;
            }
            return false;
        }

        public override int GetHashCode()
        {
            return HashCode.Combine(Name, Rank);
        }

        public static bool operator ==(StandardValue left, StandardValue right)
        {
            if (left is null) return right is null;
            return left.Equals(right);
        }

        public static bool operator !=(StandardValue left, StandardValue right)
        {
            return !(left == right);
        }
    }
}
