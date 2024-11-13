using System;

namespace CardGames.Models.Constants
{
    public static class StandardCardConstants
    {
        public static StandardValue ace = new StandardValue("Ace", 1);
        public static StandardValue two = new StandardValue("2", 2);
        public static StandardValue three = new StandardValue("3", 3);
        public static StandardValue four = new StandardValue("4", 4);
        public static StandardValue five = new StandardValue("5", 5);
        public static StandardValue six = new StandardValue("6", 6);
        public static StandardValue seven = new StandardValue("7", 7);
        public static StandardValue eight = new StandardValue("8", 8);
        public static StandardValue nine = new StandardValue("9", 9);
        public static StandardValue ten = new StandardValue("10", 10);
        public static StandardValue jack = new StandardValue("Jack", 11);
        public static StandardValue queen = new StandardValue("Queen", 12);
        public static StandardValue king = new StandardValue("King", 13);

        public static StandardSuit spades = new StandardSuit("Spades", 0);
        public static StandardSuit hearts = new StandardSuit("Hearts", 1);
        public static StandardSuit clubs = new StandardSuit("Clubs", 2);
        public static StandardSuit diamonds = new StandardSuit("Diamonds", 3);
    }
}
