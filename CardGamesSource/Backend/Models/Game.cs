using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Backend.Interfaces;

namespace Backend.Models
{
    public class Game : iGame
    {
        public int gameID {  get; set; }
        public int gameType {  get; set; }

        public Game(int gameID, int gameType)
        {
            this.gameID = gameID;
            this.gameType = gameType;
        }
    

    }
}