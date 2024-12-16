using System;
using Backend.Interfaces;

namespace Backend.Models
{
	public class StandardSuit : iCardSuit
	{
		public string Name { get; }
		public int id { get; }

		public StandardSuit(string name, int id) 
		{
			Name = name;
			this.id = id;

		}

        public override bool Equals(object? obj)
        {
            if (obj is StandardSuit otherValue)
            {
                return Name == otherValue.Name && id == otherValue.id;
            }
            return false;
        }

        public override int GetHashCode()
        {
            return HashCode.Combine(id, Name);
        }

        public static bool operator ==(StandardSuit left, StandardSuit right)
        {
            if (left is null) return right is null;
            return left.Equals(right);
        }

        public static bool operator !=(StandardSuit left, StandardSuit right)
        {
            return !(left == right);
        }

    }
}
