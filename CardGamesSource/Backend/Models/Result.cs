using Backend.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Backend.Models
{
    public class Result : iResult
    {
        public int resultID { get; set; }
        public int gameID { get; set; }
        public int outcome { get; set; }
        public int userID { get; set; }
        public DateTime resultTime { get; set; }

        public Result(int resultID, int gameID, int outcome, int userID, DateTime resultTime)
        {
            this.resultID = resultID;
            this.gameID = gameID;
            this.outcome = outcome;
            this.userID = userID;
            this.resultTime = resultTime;
        }

        public override string ToString()
        {
            string outcomeString = outcome switch
            {
                0 => "Loss",
                1 => "Win",
                -1 => "Tie",
            };

            return $"Results[gameID: {gameID}, Outcome: {outcomeString}, userID: {userID}, Time: {resultTime}]";
        }
    }
}