using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Backend.Interfaces
{
    public interface iUser
    {
        int userID { get; set; }
        string username { get; set; }
        string passwordHash { get; set; }
        string email { get; set; }
        DateTime CreationDate { get; set; }
        DateTime LastLogin { get; set; }
    }
}