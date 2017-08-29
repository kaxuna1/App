using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Configuration;
using System.Reflection;
using System.Text;
using System.ComponentModel;

namespace CurrencyManagement.WebApi.Controllers
{
    public class SimData
    {
        private readonly SqlConnection _sqlConnection;
        private SqlCommand _sqlCommand;
        private SqlDataAdapter _sqlDataAdapter;
        private DataTable _dataTable;
        private Dictionary<string, object> _outputParameters;

        /// <summary>
        /// SimData Contstructor
        /// </summary>
        /// <param name="command">SQL Query</param>
        /// <param name="type">CmdType</param>
        /// <param name="cString">Additional Connection String Name</param>
        public SimData(string command = null, CmdType type = CmdType.Proc, string cString = null)
        {
            if (string.IsNullOrEmpty(cString))
                cString = WebConfigurationManager.ConnectionStrings["CredoWebApiConn"].ConnectionString;
            else
                cString = WebConfigurationManager.ConnectionStrings[cString].ConnectionString;

            _sqlConnection = new SqlConnection(cString);
            _outputParameters = new Dictionary<string, object>();
            if (!String.IsNullOrEmpty(command))
                SetSqlCommand(command, type);

        }

        /// <summary>
        /// Execute SQL Command
        /// </summary>
        /// <param name="command">SQL Query</param>
        /// <param name="type">CmdType</param>
        /// <returns>SimData Object</returns>
        public SimData Execute(string command, CmdType type = CmdType.Proc)
        {
            if (_sqlCommand == null)
                SetSqlCommand(command, type);
            return this;
        }

        /// <summary>
        /// Sets SQL Query To SQL Command
        /// </summary>
        /// <param name="command">SQL Query</param>
        /// <param name="type">CmdType</param>
        private void SetSqlCommand(string command, CmdType type = CmdType.Proc)
        {
            _sqlCommand = new SqlCommand();
            _sqlCommand.Connection = _sqlConnection;
            _sqlCommand.CommandType = (CommandType)type;
            _sqlCommand.CommandText = command;
        }

        /// <summary>
        /// Add Query Param
        /// </summary>
        /// <param name="name">Param Name With @</param>
        /// <param name="value">Param Value Any DB Object</param>
        /// <returns>SimData Object</returns>
        public SimData Param(string name, object value)
        {
            return P(name, value);
        }

        /// <summary>
        /// Add Query Param Short Method Name
        /// Uses SimData.Param()
        /// </summary>
        /// <param name="name">Param Name With @</param>
        /// <param name="value">Param Value Any DB Object</param>
        /// <returns>SimData Object</returns>
        public SimData P(string name, object value)
        {
            SqlParameter param = _sqlCommand.Parameters.AddWithValue(name, value);
            // Berika Modification Bulk Insert
            if (value != null && typeof(DataTable) == value.GetType())
            {
                param.SqlDbType = SqlDbType.Structured;
            }
            //_sqlCommand.Parameters.AddWithValue(name, value);
            return this;
        }

        /// <summary>
        /// Add Return Param
        /// </summary>
        /// <param name="name">Param Name With @</param>
        /// <param name="type">DBDataType, Default Type Is String</param>
        /// <returns>SimData Object</returns>
        public SimData PO(string name, DBDataType type = DBDataType.String)
        {
            if (_outputParameters.ContainsKey(name))
                _outputParameters[name] = type;
            else
                _outputParameters.Add(name, type);
            return this;
        }

        /// <summary>
        /// Add OutPut Params To SQL Command
        /// </summary>
        private void AddOutPutParams()
        {
            SqlParameter param;
            foreach (var item in _outputParameters)
            {
                param = new SqlParameter(item.Key, (SqlDbType)item.Value, -1);
                param.Direction = System.Data.ParameterDirection.Output;
                _sqlCommand.Parameters.Add(param);
            }
        }

        /// <summary>
        /// Execute SQL Command
        /// </summary>
        /// <returns>Dictionary Of OutPut Params</returns>
        public Dictionary<string, object> Save()
        {
            AddOutPutParams();
            var outputParams = new Dictionary<string, object>();
            try
            {
                _sqlConnection.Open();
                _sqlCommand.ExecuteNonQuery();

                foreach (var item in _outputParameters)
                    outputParams.Add((string)item.Key, _sqlCommand.Parameters[item.Key].Value);
            }
            catch (Exception)
            {
                throw;
            }
            finally
            {
                _sqlConnection.Close();
            }
            return outputParams;
        }

        /// <summary>
        /// Additional Method For Returning PIVOT Grid Data
        /// </summary>
        /// <param name="operations">Dictionary For Additional Operations</param>
        /// <returns>Collection Of Dynamic Rows</returns>
        public IEnumerable<Dynamic> AsDynamic(Dictionary<string, object> operations = null)
        {
            operations = operations ?? new Dictionary<string, object>();

            _sqlDataAdapter = new SqlDataAdapter(_sqlCommand);
            _dataTable = new DataTable();
            try
            {
                _sqlDataAdapter.Fill(_dataTable);
                var ret = new List<Dynamic>();

                foreach (DataRow row in _dataTable.Rows)
                {
                    var tempDictionary = new Dynamic();

                    foreach (DataColumn column in _dataTable.Columns)
                    {
                        var columnName = column.ToString();
                        var addColumn = true;
                        object value;
                        if (operations.TryGetValue(columnName, out value))
                        {
                            //var value = operations.TryGetValue(columnName);
                            if (value.GetType() == typeof(string))
                            {
                                columnName = value.ToString();
                            }
                            else if (value.GetType() == typeof(bool))
                            {
                                addColumn = value.ToBool();
                            }
                        }
                        if (addColumn)
                        {
                            tempDictionary.Add(columnName, row[column].ToString());
                        }
                    }
                    ret.Add(tempDictionary);
                }
                return ret;
            }
            catch (Exception)
            {
                throw;
            }
            finally
            {
                _sqlDataAdapter.Dispose();
                _dataTable.Dispose();
            }
        }

        /// <summary>
        /// Additional Method For Returning Collection Of Non Specified Objects
        /// </summary>
        /// <typeparam name="T">Non Specified Object, For Returning This Type Of Collection</typeparam>
        /// <returns>Collection Of Non Specified Objects</returns>
        public IEnumerable<T> AsList<T>() where T : new()
        {
            _sqlDataAdapter = new SqlDataAdapter(_sqlCommand);
            _dataTable = new DataTable();
            try
            {
                _sqlDataAdapter.Fill(_dataTable);

                List<T> ret = new List<T>();

                PropertyInfo[] _properties = typeof(T).GetProperties();
                foreach (DataRow row in _dataTable.Rows)
                {
                    T _new = new T();
                    foreach (PropertyInfo p in _properties)
                    {
                        if (_dataTable.Columns.Contains(p.Name) && row[p.Name].GetType() != typeof(DBNull))
                        {
                            try
                            {
                                p.SetValue(_new, row[p.Name]);
                            }
                            catch (Exception)
                            {
                                p.SetValue(_new, Convert.ChangeType(row[p.Name], p.PropertyType));
                            }
                        }
                    }
                    ret.Add((T)_new);
                }
                return ret;
            }
            catch (Exception)
            {
                throw;
            }
            finally
            {
                _sqlDataAdapter.Dispose();
                _dataTable.Dispose();
            }
        }

        /// <summary>
        /// Additional Method For Returning Non Specified Objects
        /// </summary>
        /// <typeparam name="T">Non Specified Object, For Returning This Type Of Object</typeparam>
        /// <returns>Non Specified Objects</returns>
        public T As<T>() where T : new()
        {
            _sqlDataAdapter = new SqlDataAdapter(_sqlCommand);
            _dataTable = new DataTable();
            try
            {
                _sqlDataAdapter.Fill(_dataTable);
                T _new = new T();
                PropertyInfo[] _properties = typeof(T).GetProperties();
                foreach (DataRow row in _dataTable.Rows)
                {
                    foreach (PropertyInfo p in _properties)
                    {
                        if (_dataTable.Columns.Contains(p.Name) && row[p.Name].GetType() != typeof(DBNull))
                        {
                            try
                            {
                                p.SetValue(_new, row[p.Name]);
                            }
                            catch (Exception)
                            {
                                p.SetValue(_new, Convert.ChangeType(row[p.Name], p.PropertyType));
                            }
                        }
                    }
                }
                return _new;
            }
            catch (Exception)
            {
                throw;
            }
            finally
            {
                _sqlDataAdapter.Dispose();
                _dataTable.Dispose();
            }
        }

        /// <summary>
        /// Fills &amp; Returns Query Result Data In DataTable Object
        /// </summary>
        /// <returns>Returns DataTable Object</returns>
        public DataTable AsTable()
        {
            _sqlDataAdapter = new SqlDataAdapter(_sqlCommand);
            _dataTable = new DataTable();
            try
            {
                _sqlDataAdapter.Fill(_dataTable);
                return _dataTable;
            }
            catch (Exception)
            {
                throw;
            }
            finally
            {
                _sqlDataAdapter.Dispose();
                _dataTable.Dispose();
            }
        }

        /// <summary>
        /// Returns Query Result Data In HTML &lt;table&gt;
        /// </summary>
        /// <param name="dt">DataTable Object</param>
        /// <param name="cols">List Of Columns</param>
        /// <returns>HTML table</returns>
        public string AsGrid(DataTable dt, params string[] cols)
        {
            StringBuilder str = new StringBuilder();
            str.Append("<table align=\"left\" cellpadding=\"2\" cellspacing=\"2\" border=\"1\">");
            foreach (DataRow row in dt.Rows)
            {
                str.Append("<tr>");
                if (cols.Length == 0)
                {
                    foreach (DataColumn myColumns in dt.Columns)
                    {
                        if (row[myColumns].ToString() != "")
                        {
                            str.Append("<td align=\"left\">" + row[myColumns] + "</td>");
                        }
                        else
                        {
                            str.Append("<td align=\"left\">&nbsp;</td>");
                        }
                    }
                }
                else
                {
                    foreach (string myColumns in cols)
                    {
                        if (row[myColumns].ToString() != "")
                        {
                            str.Append("<td align=\"left\">" + row[myColumns] + "</td>");
                        }
                        else
                        {
                            str.Append("<td align=\"left\">&nbsp;</td>");
                        }
                    }
                }

                str.Append("</tr>");
            }
            str.Append("<table>");
            return str.ToString();
        }

        /// <summary>
        /// Converts Generic List Into DataTable
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="data"> Generic List</param>
        /// <returns>DataTable</returns>
        public static DataTable ConvertToDatatable<T>(List<T> data)
        {
            PropertyDescriptorCollection props =
                TypeDescriptor.GetProperties(typeof(T));
            DataTable table = new DataTable();
            for (int i = 0; i < props.Count; i++)
            {
                PropertyDescriptor prop = props[i];
                if (prop.PropertyType.IsGenericType && prop.PropertyType.GetGenericTypeDefinition() == typeof(Nullable<>))
                    table.Columns.Add(prop.Name, prop.PropertyType.GetGenericArguments()[0]);
                else
                {
                    if (prop.PropertyType.Name.ToLower() == "stream")
                    {
                        table.Columns.Add(prop.Name, typeof(Byte[]));
                    }
                    else
                    {
                        table.Columns.Add(prop.Name, prop.PropertyType);
                    }
                }
            }
            object[] values = new object[props.Count];
            foreach (T item in data)
            {
                for (int i = 0; i < values.Length; i++)
                {
                    if (props[i].PropertyType.Name.ToLower() == "stream")
                    {
                        values[i] = ((System.IO.MemoryStream)props[i].GetValue(item)).ToArray();
                    }
                    else
                    {
                        values[i] = props[i].GetValue(item);
                    }
                }
                table.Rows.Add(values);
            }
            return table;
        }
    }

    /// <summary>
    /// Enum For SQL Command Type
    /// </summary>
    public enum CmdType
    {
        /// <summary>
        /// Procedure
        /// </summary>
        Proc = CommandType.StoredProcedure,

        /// <summary>
        /// Simple Command
        /// </summary>
        Text = CommandType.Text
    }

    /// <summary>
    /// Enum For SQL Data Type
    /// </summary>
    public enum DBDataType
    {
        /// <summary>
        /// Integer
        /// </summary>
        Int = SqlDbType.Int,
        /// <summary>
        /// NVARCHAR as string
        /// </summary>
        String = SqlDbType.NVarChar,
        /// <summary>
        /// DateTime
        /// </summary>
        Date = SqlDbType.DateTime,
        /// <summary>
        /// BIT as Bool
        /// </summary>
        Bool = SqlDbType.Bit,
        /// <summary>
        /// Binary
        /// </summary>
        Binary = SqlDbType.VarBinary,
        /// <summary>
        /// Image
        /// </summary>
        Image = SqlDbType.Image,
        /// <summary>
        /// Float
        /// </summary>
        Float = SqlDbType.Float,
        /// <summary>
        /// Money
        /// </summary>
        Money = SqlDbType.Money
    }
}