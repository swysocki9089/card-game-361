using System;
using CardGames.Interfaces;

namespace CardGames.Model
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
	}
}
