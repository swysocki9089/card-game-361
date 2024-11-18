using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CardGames.Interfaces;

namespace CardGames.Models
{
    public class User : iUser
    {
        public int userID { get; set; }
        public string username { get; set; }
        public string passwordHash { get; set; }
        public string email {get; set; }
        public DateTime CreationDate { get; set; } = DateTime.Now;
        public DateTime LastLogin { get; set; } = DateTime.Now;

        public User(int userID, string username, string passwordHash, string email)
        {
            this.userID = userID;
            this.username = username;
            this.passwordHash = passwordHash;
            this.email = email;
        }

        public override string ToString()
        {
            return $"User[ID: {userID}, Name: {username}, Email: {email}, Created: {CreationDate}, Last Login: {LastLogin}]";
        }
    }
}
