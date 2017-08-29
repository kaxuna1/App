using System.Data;
using System.Data.SqlClient;
using System.Web.Configuration;

namespace CurrencyManagement.WebApi.Models
{
    public class BaseRepository
    {
        public static IDbConnection OpenConnection()
        {
            IDbConnection connection = new SqlConnection(WebConfigurationManager.ConnectionStrings["CredoWebApiConn"].ConnectionString);
            connection.Open();
            return connection;
        }
        public static IDbConnection OpenConnection2()
        {
            IDbConnection connection = new SqlConnection(WebConfigurationManager.ConnectionStrings["ConsulCon"].ConnectionString);
            connection.Open();
            return connection;
        }
    }
}