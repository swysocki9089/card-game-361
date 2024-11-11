namespace CardGames
{
    internal class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Hello, World!");
            Card c = new Card(1, 0);
            Console.WriteLine(c.getFullCardName());
        }
    }
}
