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
    public class ResultData
    {
        private readonly string connectionString;

        public ResultData(string connectionString)
        {
            this.connectionString = connectionString;
        }


        public void InsertResult(iResult result)
        {
            string query = "INSERT INTO User_Table (resultID, gameID, outcome, userID, resultTime) VALUES (@resultID, @gameID, @outcome, @userID, @resultTime)";
            using (SqlConnection connection = new SqlConnection(connectionString))
            using (SqlCommand command = new SqlCommand(query, connection))
            {
                command.Parameters.AddWithValue("@resultID", result.resultID);
                command.Parameters.AddWithValue("@gameID", result.gameID);
                command.Parameters.AddWithValue("@outcome", result.outcome);
                command.Parameters.AddWithValue("@userID", result.userID);
                command.Parameters.AddWithValue("@resultTime", result.resultTime);

                connection.Open();
                command.ExecuteNonQuery();
            }
        }

        public List<iResult> GetResults()
        {
            string query = "SELECT * FROM Result_Table; ";
            List<iResult> results = new List<iResult>();

            using (SqlConnection connection = new SqlConnection(connectionString))
            using (SqlCommand command = new SqlCommand(query, connection))
            {
                connection.Open();
                using (SqlDataReader reader = command.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        results.Add(new Result(
                            reader.GetInt32(0),
                            reader.GetInt32(1),
                            reader.GetInt32(2),
                            reader.GetInt32(3),
                            reader.GetDateTime(4)
                        ));
                    }
                }
            }

            return results;
        }
    }
}