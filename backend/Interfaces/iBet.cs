using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CardGames.Interfaces
{
    public interface iBet
    {
        int userID { get; set; }
        int gameID { get; set; }
        int betAmount { get; set; }
        int betOutcome { get; set; }
    }
}
