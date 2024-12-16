using Backend.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.SqlClient;

namespace Backend.Data
{
    public class BetData
    {
        private readonly string connectionString;

        public BetData(string connectionString)
        {
            this.connectionString = connectionString;
        }


    }
}