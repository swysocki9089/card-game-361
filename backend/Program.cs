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

            User user = new User(1, "User1", "hashed_password", "example@example.com");
            Console.WriteLine(user);
            Balance balance = new Balance(1, 2, 5000, "Deposit");
            Console.WriteLine(balance);
            Result result = new Result(1, 0, 2, DateTime.Now);
            Console.WriteLine(result);
            Bet bet = new Bet(2, 1, 100, 1);
            Console.WriteLine(bet);

        }
    }
}
