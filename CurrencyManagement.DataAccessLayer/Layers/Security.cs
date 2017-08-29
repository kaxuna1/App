using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CurrencyManagement.DataAccessLayer.Extensions;
using CurrencyManagement.DataContracts;
using CurrencyManagement.DataContracts.Rows.Security;
using Newtonsoft.Json;

namespace CurrencyManagement.DataAccessLayer.Layers
{
    public partial class DataBase : DataAccessLayerBase
    {

        //public IEnumerable<ActionRow> ActionList()
        //{
        //    return Query<ActionRow>("Security.spActionList");
        //}

        //public int ActionSave(ActionRow row)
        //{
        //    var result = QueryFirst("Security.spActionSave", new
        //    {
        //        row.ActionId,
        //        row.Action,
        //        row.ActionFullName,
        //        row.ActionCategory,
        //        row.ActionConfirmed,
        //        row.ActionParentId,
        //        row.DateDeleted
        //    });

        //    return result.ActionId;
        //}

        //public void CurrentActionsClear()
        //{
        //    Query("Security.spCurrentActionsClear");
        //}

        //public void CurrentActionsInsert(IEnumerable<ActionRow> rows)
        //{
        //    foreach (var row in rows)
        //        Query("Security.spCurrentActionsInsert", new
        //        {
        //            row.Action,
        //            row.ActionFullName,
        //            row.ActionCategory,
        //            row.Author
        //        });
        //}

        public IEnumerable<UserRow> UserList(int? userId = null, string userName = "", string password = "", string personalNumber = "")
        {
            return Query<UserRow>("Security.spUserList", new
            {
                UserId = userId,
                UserName = userName,
                Password = password,
                PersonalNumber = personalNumber,
            });
        }

        public UserRow UserAuthorize(string userName = "", string password = "")
        {
            return QueryFirstOrDefault<UserRow>("Security.spUserAuthorize", new
            {
                UserName = userName,
                Password = password,
            });
        }

        //public void ActionLogInsert(ActionLogRow row)
        //{
        //    Query("Security.spActionLogInsert", new
        //    {
        //        row.ActionId,
        //        row.IpAddress,
        //        row.UserId,
        //        row.LogData,
        //        row.ExceptionMessage,
        //        row.ActionUniqueId
        //    });
        //}

        //public void ActionLogComplete(Guid actionUniqueId, string exceptionMessage, bool operationCompleted, int? userId)
        //{
        //    Query("Security.spActionLogComplete", new
        //    {
        //        ActionUniqueId = actionUniqueId,
        //        ExceptionMessage = exceptionMessage,
        //        OperationCompleted = operationCompleted,
        //        UserId = userId
        //    });
        //}


        public List<AuthorizationListRow> AuthorizationList()
        {
            var tmpResult = Query<dynamic>("Security.spAuthorizationList");

            var cd = new ConcurrentDictionary<string, AuthorizationListRow>();

            Parallel.ForEach(tmpResult, (row) =>
            {
                cd.TryAdd(row.Token, new AuthorizationListRow()
                {
                    Token = row.Token,
                    AuthObject = JsonConvert.DeserializeObject<Auth>(row.AuthObject)
                });
            });

            return cd.Values.ToList();
        }

        [SuppressMessage("ReSharper", "InconsistentNaming")]
        public void AuthorizationListSave(string Token, string AuthObject)
        {
            Query("Security.spAuthorizationListSave", new
            {
                Token,
                AuthObject
            });
        }

        [SuppressMessage("ReSharper", "InconsistentNaming")]
        public void AuthorizationListDelete(string Token = null)
        {
            Query("Security.spAuthorizationListDelete", new
            {
                Token
            });
        }
    }
}
