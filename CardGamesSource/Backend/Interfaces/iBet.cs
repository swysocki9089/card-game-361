using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Backend.Interfaces
{
    public interface iBet
    {
        int betID { get; set; }
        int userID { get; set; }
        int gameID { get; set; }
        int betAmount { get; set; }
        int betOutcome { get; set; }
    }
}