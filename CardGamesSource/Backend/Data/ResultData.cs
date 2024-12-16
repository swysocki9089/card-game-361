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


        public 


        public void InsertUser(iUser user)
        {
            string query = "INSERT INTO User_Table (userID, username, passHash, email) VALUES (@userID, @username, @passHash, @Email)";
            using (SqlConnection connection = new SqlConnection(connectionString))
            using (SqlCommand command = new SqlCommand(query, connection))
            {
                command.Parameters.AddWithValue("@userID", user.userID);
                command.Parameters.AddWithValue("@username", user.username);
                command.Parameters.AddWithValue("@passHash", user.passwordHash);
                command.Parameters.AddWithValue("@Email", user.email ?? (object)DBNull.Value);

                connection.Open();
                command.ExecuteNonQuery();
            }
        }

        public void DeleteUser(int userID)
        {
            string query = "DELETE FROM User_Table WHERE userID = @userID";

            using (SqlConnection connection = new SqlConnection(connectionString))
            using (SqlCommand command = new SqlCommand(query, connection))
            {
                command.Parameters.AddWithValue("@userID", userID);
                connection.Open();
                command.ExecuteNonQuery();
            }
        }

        public void UpdateUsername(int userID, string username)
        {
            string query = "UPDATE User_Table SET username = @username WHERE userID = @userID";

            using (SqlConnection connection = new SqlConnection(connectionString))
            using (SqlCommand command = new SqlCommand(query, connection))
            {
                command.Parameters.AddWithValue("@userID", userID);
                command.Parameters.AddWithValue("@username", username);

                connection.Open();
                command.ExecuteNonQuery();
            }
        }

        public void UpdatePasswordHash(int userID, string passHash)
        {
            string query = "UPDATE User_Table SET passHash = @passHash WHERE userID = @userID";

            using (SqlConnection connection = new SqlConnection(connectionString))
            using (SqlCommand command = new SqlCommand(query, connection))
            {
                command.Parameters.AddWithValue("@userID", userID);
                command.Parameters.AddWithValue("@passHash", passHash);

                connection.Open();
                command.ExecuteNonQuery();
            }
        }

        public void UpdateEmail(int userID, string email)
        {
            string query = "UPDATE User_Table SET email = @Email WHERE userID = @userID";

            using (SqlConnection connection = new SqlConnection(connectionString))
            using (SqlCommand command = new SqlCommand(query, connection))
            {
                command.Parameters.AddWithValue("@userID", userID);
                command.Parameters.AddWithValue("@Email", email ?? (object)DBNull.Value);

                connection.Open();
                command.ExecuteNonQuery();
            }
        }

        public List<iUser> GetUsers()
        {
            string query = "SELECT * FROM User_Table; ";
            List<iUser> users = new List<User>();

            using (SqlConnection connection = new SqlConnection(connectionString))
            using (SqlCommand command = new SqlCommand(query, connection))
            {
                connection.Open();
                using (SqlDataReader reader = command.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        users.Add(new User(
                            reader.GetInt32(0),
                            reader.GetString(1),
                            reader.GetString(2),
                            reader.IsDBNull(3) ? null : reader.GetString(3),
                            reader.GetDateTime(4),
                            reader.GetDateTime(5)
                        ));
                    }
                }
            }

            return users;
        }

        public int VerifyUserByUsernameAndPassword(string username, string password)
        {
            string query = "SELECT 1 FROM User_Table WHERE username = @username AND passHash = @password;";

            using (SqlConnection connection = new SqlConnection(connectionString))
            using (SqlCommand command = new SqlCommand(query, connection))
            {
                command.Parameters.AddWithValue("@username", username);
                command.Parameters.AddWithValue("@password", password);

                connection.Open();
                using (SqlDataReader reader = command.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        return reader.GetInt32(0);
                    }
                }
            }

            return 0;
        }
    }
}