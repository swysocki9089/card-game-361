using System;
using CardGames.Interfaces;

namespace CardGames.Model
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

	}
}
