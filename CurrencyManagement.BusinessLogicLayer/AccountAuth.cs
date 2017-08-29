using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Authentication;
using System.Text;
using System.Threading.Tasks;
using CurrencyManagement.Authorization;
using CurrencyManagement.DataAccessLayer.Layers;
using CurrencyManagement.DataContracts;
using JorJikaHelper.AOP;

namespace CurrencyManagement.BusinessLogicLayer
{
    public static class AccountAuth
    {
        [ActionDescription("ავტორიზაცია", "უსაფრთხოება", "გიორგი ჟორჟოლიანი")]
        public static Auth Authorize(string userName, string password, string ipAddress, string userAgent)
        {
            const string authMethodFullName = "CurrencyManagement.BusinessLogicLayer.AccountAuth.Authorize";
            Auth result = null;

            //მომხმარებლის ველის შემოწმება ცარიელია თუ არა
            if (string.IsNullOrWhiteSpace(userName))
                throw new AuthenticationException("მომხმარებლის ველი ცარიელია.");

            //პაროლის ველის შემოწმება ცარიელია თუ არა
            if (string.IsNullOrWhiteSpace(password))
                throw new AuthenticationException("მომხმარებლის ველი ცარიელია.");

            var logUniqueId = Guid.NewGuid();
            AuthInstance.JActionEventOnMethodStart(null, new JActionEventArgs()
            {

                MethodFullName = authMethodFullName,
                MethodName = "Authorize",
                ActionName = "ავტორიზაცია",
                MethodCategory = "უსაფრთხოება",
                MethodAuthor = "გიორგი ჟორჟოლიანი",
                ActionUniqueId = logUniqueId,
                MethodArguments = new Dictionary<string, object>()
                    {
                        { "userName", userName},
                        { "ipAddress", ipAddress},
                        { "userAgent", userAgent},
                    }
            });


            using (var db = new DataBase())
            {
                try
                {
                    db.Open();

                    var user = db.UserAuthorize(userName: userName, password: password);

                    //თუ ვერ მოიძებნა მომხმარებელი ესეიგი პაროლი ან მომხმარებელი არასწორად არის შეყვანილი
                    if (user == null)
                        throw new AuthenticationException("პაროლი არასწორია ან მომხმარებელი ვერ მოიძებნა");

                    //არის თუ არა აქტიური მომხმარებელი
                    if (!user.IsActive)
                        throw new AuthenticationException($"{user.UserName} - მომხმარებელი არ არის აქტიური");

                    var token = Guid.NewGuid().ToString();

                    result = new Auth();
                    result.Token = token;
                    result.IpAddress = ipAddress;
                    result.UserAgent = userAgent;
                    result.AuthorizationDate = DateTime.Now;
                    result.LastActionDate = DateTime.Now;
                    result.LastAction = authMethodFullName;
                    result.User = user;
                    result.User.Password = "";
                    //result.UserGroupList = db.UserInGroupList(user.UserId).ToList();
                    //result.ActionPermissionList = db.ActionPermissionList(user.UserId).ToList();
                    //result.BranchPermissionList = db.BranchPermissionList(user.UserId).ToList();

                    //if (!result.ActionPermissionList.Select(row => row.ActionFullName).Contains(authMethodFullName))
                    //    throw new Exception("ავტორიზაციის უფლება შეზღუდულია.");


                    db.Close();

                }
                catch (Exception)
                {
                    db.Close();
                    throw;
                }
            }

            AuthInstance.JActionEventOnMethodEnd(null, result, new JActionEventArgs()
            {
                MethodFullName = authMethodFullName,
                MethodName = "Authorize",
                ActionName = "ავტორიზაცია",
                MethodCategory = "უსაფრთხოება",
                MethodAuthor = "გიორგი ჟორჟოლიანი",
                ActionUniqueId = logUniqueId,
                MethodArguments = new Dictionary<string, object>()
                    {
                        { "UserId", result.User.UserId},
                        { "userName", userName},
                        { "ipAddress", ipAddress},
                        { "userAgent", userAgent},
                    }
            });

            return result;
        }
    }
}
