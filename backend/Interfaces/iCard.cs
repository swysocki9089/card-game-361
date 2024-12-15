using System;

namespace CardGames.Interfaces
{
	public interface iCard
	{
		iCardValue CardValue { get; }
		iCardSuit CardSuit { get; }
	}
}