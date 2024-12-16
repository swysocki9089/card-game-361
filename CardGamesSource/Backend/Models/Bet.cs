using Backend.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Backend.Models
{
    public class Bet : iBet
    {
        public int userID { get; set; }
        public int gameID { get; set; }
        public int betAmount { get; set; }
        public int betOutcome { get; set; }

        public Bet(int userID, int gameID, int betAmount, int betOutcome)
        {
            this.userID = userID;
            this.gameID = gameID;
            this.betAmount = betAmount;
            this.betOutcome = betOutcome;
        }

        public override string ToString()
        {
            string outcomeString = betOutcome switch
            {
                0 => "Loss",
                1 => "Win",
                -1 => "Tie",
            };

            return $"Bet[userID: {userID}, gameID: {gameID}, Amount: {betAmount}, Outcome: {outcomeString}]";
        }
    }
}