using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Backend.Interfaces
{
    public interface iResult
    {
        int resultID { get; set; }
        int gameID { get; set; }
        int outcome { get; set; }
        int userID { get; set; }
        DateTime resultTime { get; set; }
    }
}