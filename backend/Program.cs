using CardGames.Models;
using static CardGames.Models.Constants.StandardCardConstants; // suits and values can be referenced directly


namespace CardGames
{
    internal class Program
    {
        static void Main(string[] args)
        {
            StandardCard sc = new StandardCard(ace, spades);
            Console.WriteLine(sc.GetFullName());
        }
    }
}
