using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CardGames.Interfaces
{
    public interface iResult
    {
        int gameID { get; set; }
        int outcome { get; set; }
        int userID { get; set; }
        DateTime ResultTime { get; set; }
    }
}
