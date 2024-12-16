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
    public class BalanceData
    {
        private readonly string connectionString;

        public BalanceData(string connectionString)
        {
            this.connectionString = connectionString;
        }


    }
}