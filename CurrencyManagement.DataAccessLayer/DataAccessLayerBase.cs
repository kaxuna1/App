using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CurrencyManagement.DataAccessLayer.Properties;
using Dapper;

namespace CurrencyManagement.DataAccessLayer
{
    public abstract class DataAccessLayerBase : IDisposable
    {

        #region Constructor

        protected DataAccessLayerBase()
        {
            m_connectionTimeout = Convert.ToInt32(Settings.Default.ConnectionTimeout);
            m_connectionString = Settings.Default.ConnectionString;
        }

        protected DataAccessLayerBase(int timeOut)
        {
            m_connectionTimeout = timeOut;
            m_connectionString = Settings.Default.ConnectionString;
        }

        protected DataAccessLayerBase(string connString, int timeOut)
        {
            m_connectionTimeout = timeOut;
            m_connectionString = connString;
        }

        #endregion

        #region Properties

        private readonly int m_connectionTimeout;
        private SqlConnection m_connection;
        private SqlTransaction m_transaction;

        private readonly string m_connectionString;

        private ConnectionState State => m_connection?.State ?? ConnectionState.Closed;

        private IDbConnection SQL => m_connection;

        #endregion

        #region Base Methods

        public void Open()
        {
            if (m_connection == null)
                m_connection = new SqlConnection(m_connectionString);

            if (State == ConnectionState.Broken || State == ConnectionState.Closed)
                m_connection.Open();
        }

        public void Close()
        {
            if (m_connection != null && State != ConnectionState.Closed)
                m_connection.Close();
        }


        public void BeginTransaction()
        {
            BeginTransaction(IsolationLevel.ReadCommitted);
        }

        public void BeginTransaction(IsolationLevel il)
        {
            if (State != ConnectionState.Open)
                m_connection.Open();

            m_transaction = m_connection.BeginTransaction(il);
        }

        public void CommitTransaction()
        {
            m_transaction?.Commit();
        }

        public void RollBackTransaction()
        {
            m_transaction?.Rollback();
        }

        public void Dispose()
        {
            m_connection?.Dispose();
            m_transaction?.Dispose();
            SQL?.Dispose();
        }

        #endregion

        #region Query Methods
        internal int Query(string command)
        {
            return SQL.Execute(command, null, m_transaction, m_connectionTimeout, CommandType.StoredProcedure);
        }
        internal int Query(string command, object param)
        {
            return SQL.Execute(command, param, m_transaction, m_connectionTimeout, CommandType.StoredProcedure);
        }

        internal IEnumerable<T> Query<T>(string command)
        {
            return SQL.Query<T>(command, null, m_transaction, true, m_connectionTimeout, CommandType.StoredProcedure);
        }

        internal IEnumerable<T> Query<T>(string command, object param)
        {
            return SQL.Query<T>(command, param, m_transaction, true, m_connectionTimeout, CommandType.StoredProcedure);
        }

        internal SqlMapper.GridReader QueryMultiple(string command, object param)
        {
            return SQL.QueryMultiple(command, param, m_transaction, m_connectionTimeout, CommandType.StoredProcedure);
        }

        internal dynamic QueryFirst(string command)
        {
            return SQL.QueryFirst(command, null, m_transaction, m_connectionTimeout, CommandType.StoredProcedure);
        }

        internal T QueryFirst<T>(string command)
        {
            return SQL.QueryFirst<T>(command, null, m_transaction, m_connectionTimeout, CommandType.StoredProcedure);
        }

        internal dynamic QueryFirst(string command, object param)
        {
            return SQL.QueryFirst(command, param, m_transaction, m_connectionTimeout, CommandType.StoredProcedure);
        }

        internal T QueryFirst<T>(string command, object param)
        {
            return SQL.QueryFirst<T>(command, param, m_transaction, m_connectionTimeout, CommandType.StoredProcedure);
        }

        internal dynamic QueryFirstOrDefault(string command)
        {
            return SQL.QueryFirstOrDefault(command, null, m_transaction, m_connectionTimeout, CommandType.StoredProcedure);
        }

        internal T QueryFirstOrDefault<T>(string command)
        {
            return SQL.QueryFirstOrDefault<T>(command, null, m_transaction, m_connectionTimeout, CommandType.StoredProcedure);
        }

        internal dynamic QueryFirstOrDefault(string command, object param)
        {
            return SQL.QueryFirstOrDefault(command, param, m_transaction, m_connectionTimeout, CommandType.StoredProcedure);
        }

        internal T QueryFirstOrDefault<T>(string command, object param)
        {
            return SQL.QueryFirstOrDefault<T>(command, param, m_transaction, m_connectionTimeout, CommandType.StoredProcedure);
        }

        #endregion

    }
}
