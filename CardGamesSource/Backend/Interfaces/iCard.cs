using System;

namespace Backend.Interfaces
{
	public interface iCard
	{
		iCardValue CardValue { get; }
		iCardSuit CardSuit { get; }
	}
}