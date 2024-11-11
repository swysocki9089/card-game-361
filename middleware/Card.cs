using System;
using System.Xml.Linq;

public class Card
{
	private int value;
	private int suit;


	/*
	 * SUIT
	 *  0 - SPADES
	 *  1 - HEARTS
	 *  2 - CLUBS
	 *  3 - DIAMONDS
	 */
	/*
	 * VALUE
	 * 1 - ACE
	 * 2 - 2
	 * 3 - 3
	 * 4 - 4
	 * 5 - 5
	 * 6 - 6
	 * 7 - 7
	 * 8 - 8
	 * 9 - 9
	 * 10 - 10
	 * 11 - J
	 * 12 - Q
	 * 13 - K
	 */

	public Card(int value, int suit)
	{
		setCardValue(value);
		setCardSuit(suit);
	}

	public int getCardValue()
	{
		return this.value;
	}

	public void setCardValue(int value)
	{
		this.value = value;
	}

    public void setCardSuit(int suit)
    {
        this.suit = suit;
    }

    public int getCardSuit()
	{
		return this.suit;
	}

	public int getCardColor()
	{
		/*
		 * 0 - BLACK
		 * 1 - RED
		 */
		return this.suit % 2;
	}

	public string getFullCardName()
	{
		return getCardValueName() + " of " + getCardSuitName();
    }

	public string getCardValueName()
	{
		string valueName;
        switch (this.getCardValue())
        {
            case 1: // Ace
                valueName = "Ace";
                break;
            case 2: // 2
                valueName = "2";
                break;
            case 3: // 3
                valueName = "3";
                break;
            case 4: // 4
                valueName = "4";
                break;
            case 5: // 5
                valueName = "5";
                break;
            case 6: // 6
                valueName = "6";
                break;
            case 7: // 7
                valueName = "7";
                break;
            case 8: // 8
                valueName = "8";
                break;
            case 9: // 9
                valueName = "9";
                break;
            case 10: // 10
                valueName = "10";
                break;
            case 11: // Jack
                valueName = "Jack";
                break;
            case 12: // Queen
                valueName = "Queen";
                break;
            case 13: // King
                valueName = "King";
                break;
            default:
                throw new Exception("Invalid Card! Value is not an integer between 1 and 13");
        }
		return valueName;
    }
	public string getCardSuitName()
	{
		string suitName;
        switch (this.getCardSuit())
        {
            case 0:
                suitName = "Spades";
                break;
            case 1:
                suitName = "Hearts";
                break;
            case 2:
                suitName = "Clubs";
                break;
            case 3:
                suitName = "Diamonds";
                break;
            default:
                throw new Exception("Invalid Card! Value must be an integer between 0 and 3.");
        } 
        return suitName;
    }
}
