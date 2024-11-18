using CardGames.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CardGames.Models
{
    public class Balance : iBalance
    {
        public int balanceID { get; set; }
        public int userID { get; set; }
        public int currentBalance { get; set; }
        public string reason { get; set; }

        public Balance(int balanceID, int userID, int currentBalance, string reason)
        {
            this.balanceID = balanceID;
            this.userID = userID;
            this.currentBalance = currentBalance;
            this.reason = reason;
        }

        public override string ToString()
        {
            return $"Balance[balanceID: {balanceID}, userID: {userID}, Balance: {currentBalance}, Reason: {reason}]";
        }
    }
}
