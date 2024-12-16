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

        public void InsertBet(iBet bet)
        {
            string query = "INSERT INTO Bet_Table (betID, userID, gameID, betAmount, betOutcome) VALUES (@betID, @userID, @gameID, @betAmount, @betOutcome)";
            using (SqlConnection connection = new SqlConnection(connectionString))
            using (SqlCommand command = new SqlCommand(query, connection))
            {
                command.Parameters.AddWithValue("@betID", bet.betID);
                command.Parameters.AddWithValue("@userID", bet.userID);
                command.Parameters.AddWithValue("@gameID", bet.gameID);
                command.Parameters.AddWithValue("@betAmount", bet.betAmount);
                command.Parameters.AddWithValue("@betOutcome", bet.betOutcome);

                connection.Open();
                command.ExecuteNonQuery();
            }
        }

        public List<iBet> GetBets()
        {
            string query = "SELECT * FROM Bet_Table; ";
            List<iBet> bets = new List<iBet>();

            using (SqlConnection connection = new SqlConnection(connectionString))
            using (SqlCommand command = new SqlCommand(query, connection))
            {
                connection.Open();
                using (SqlDataReader reader = command.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        bets.Add(new Bet(
                            reader.GetInt32(0),
                            reader.GetInt32(1),
                            reader.GetInt32(2),
                            reader.GetInt32(3),
                            reader.GetInt32(4)
                        ));
                    }
                }
            }

            return bets;
        }

    }
}