using CardGames.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CardGames.Models
{
    public class Result : iResult
    {
        public int gameID { get; set; }
        public int outcome { get; set; }
        public int userID { get; set; }
        public DateTime ResultTime { get; set; }

        public Result(int gameID, int outcome, int userID, DateTime ResultTime)
        {
            this.gameID = gameID;
            this.outcome = outcome;
            this.userID = userID;
            this.ResultTime = ResultTime;
        }

        public override string ToString()
        {
            string outcomeString = outcome switch
            {
                0 => "Loss",
                1 => "Win",
                -1 => "Tie",
            };

            return $"Results[gameID: {gameID}, Outcome: {outcomeString}, userID: {userID}, Time: {ResultTime}]";
        }
    }
}
