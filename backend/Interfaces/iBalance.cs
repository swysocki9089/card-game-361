using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CardGames.Interfaces
{
    public interface iBalance
    {
        int balanceID { get; set; }
        int userID { get; set; }
        int currentBalance { get; set; }
        string reason { get; set; }
    }
}
