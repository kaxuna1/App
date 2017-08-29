using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Timers;
using System.Web;
using CurrencyManagement.DataAccessLayer.Layers;
using CurrencyManagement.DataContracts;
using CurrencyManagement.DataContracts.Rows.Security;
using JorJikaHelper.AOP;
using Newtonsoft.Json;

namespace CurrencyManagement.Authorization
{
    public static class AuthInstance
    {
        #region Properties

        public static ConcurrentDictionary<string, Auth> AuthorizationList = new ConcurrentDictionary<string, Auth>();
        public static ConcurrentDictionary<int, ActionRow> ActionList = new ConcurrentDictionary<int, ActionRow>();
        public static string Token => HttpContext.Current?.Request?.Headers?.GetValues("Authorization")?.FirstOrDefault() ?? "";

        public static Auth CurrentAuth => !string.IsNullOrWhiteSpace(Token) && AuthorizationList.ContainsKey(Token) ? AuthorizationList[Token] : null;

        public static Timer AuthTimer = new Timer(1000 * 60 * 5); //5 წუთში ერთხელ ხდება შემოწმება
        public static int AuthorizationTimeOut { get; set; }

        #endregion

        #region Action Events

        /// <summary>
        /// ამ მეთოდის გამოძახება ხდება JorJikaSecurityFilter-ის შვილი ობიექტების მეთოდის გამოძახებამდე
        /// </summary>
        /// <param name="sender">JActionAspect ობიექტი</param>
        /// <param name="eventArgs">მეთოდის პარამეტრები და მათი მნიშვნელობები</param>
        public static void JActionEventOnMethodStart(object sender, JActionEventArgs eventArgs)
        {
            //bool isAuthorizationRequest = eventArgs.MethodFullName == "CurrencyManagement.BusinessLogicLayer.AccountAuth.Authorize";

            //Auth auth = null;
            //if (!isAuthorizationRequest)
            //{
            //    auth = AuthorizationList[Token];
            //    auth.LastAction = eventArgs.MethodFullName;
            //    auth.LastActionDate = DateTime.Now;
            //}

            ////თუ არ არსებობს ესეთი მოქმედება ბაზაში მაშინ ვინახავთ ახალ მოქმედებას Confirmed=False
            //if (ActionList.Values.All(row => row.ActionFullName != eventArgs.MethodFullName))
            //{
            //    var act = new ActionRow();
            //    act.Action = eventArgs.ActionName;
            //    act.ActionFullName = eventArgs.MethodFullName;
            //    act.ActionCategory = eventArgs.MethodCategory ?? eventArgs.MethodFullName.Replace($".{eventArgs.MethodName}", "");
            //    act.ActionConfirmed = false;

            //    var db = new DataBase();
            //    try
            //    {
            //        db.Open();
            //        act.ActionId = db.ActionSave(act);

            //        var permission = new ActionPermissionRow();
            //        permission.ActionId = act.ActionId.Value;
            //        permission.UserGroupId = (int)UserGroup.CashSysAdmin; //სალაროს სისტემური ადმინისტრატორის ჯგუფის Id

            //        db.ActionPermissionSave(permission);

            //        //სალაროს სისტემური ადმინისტრატორების უფლებების განახლება (ავტომატურად ვურთავთ ჯგუფს უფლებას ახალი მოქმედების დამატებისას)
            //        var affectedUserAuthorizations = AuthorizationList.Values.Where(row => row.User != null
            //                                                                            && row.UserGroupList.Any(groupRow => groupRow.UserGroupId == (int)UserGroup.CashSysAdmin)
            //                                                                       ).ToList();

            //        foreach (var affectedAuth in affectedUserAuthorizations)
            //        {
            //            affectedAuth.ActionPermissionList = db.ActionPermissionList(affectedAuth.User.UserId).ToList();
            //        }

            //        //ბაზაში ცვლილება
            //        AuthListSave(affectedUserAuthorizations);
            //        //სალაროს სისტემური ადმინისტრატორების უფლებების განახლება (ავტომატურად ვურთავთ ჯგუფს უფლებას ახალი მოქმედების დამატებისას)

            //        db.Close();
            //    }
            //    catch (Exception ex)
            //    {
            //        db.Close();
            //        throw new Exception($"ახალი მოქმედების - {eventArgs.MethodFullName} -  შენახვის დროს დაფიქსირდა შეცდომა. {Environment.NewLine}{Environment.NewLine}{ex.Message}");
            //    }

            //    //მოქმედებების განახლება
            //    LoadAllActions(refreshFromDatabase: true);



            //    ////ახალი მოქმედების დამატების შემდეგ გამოდის შეტყობინება რომ უფლება შეზღუდულია, რადგან მოქმედება პირველად დაემატა ბაზაში
            //    //throw new Exception($"უფლება მოქმედებაზე - {eventArgs.MethodFullName} - შეზღუდულია. მიმართეთ სისტემის ადმინისტრატორს.");
            //}
            ////


            //var currentAction = ActionList.Values.First(row => row.ActionFullName == eventArgs.MethodFullName);

            ////თუ სახელი შეიცვალა ატრიბუტში მაშინ უნდა მოხდეს ბაზაში განახლება
            //UpdateActionName(currentAction, eventArgs);

            ////ლოგის ობიექტი
            //var log = new ActionLogRow();
            //log.ActionId = Convert.ToInt32(currentAction.ActionId);
            //log.IpAddress = isAuthorizationRequest ? eventArgs.MethodArguments["ipAddress"].ToString() : auth.IpAddress;
            //log.UserId = isAuthorizationRequest ? null : (int?)auth.User.UserId;
            //log.LogData = Newtonsoft.Json.JsonConvert.SerializeObject(eventArgs.MethodArguments);
            //log.ActionUniqueId = eventArgs.ActionUniqueId;
            //log.OperationCompleted = false;
            ////


            ////თუ უფლებებში არ აღმოჩნდა მეთოდი რომელსაც ვიძახებთ, მაშინ უფლება შეზღუდულია
            //if (!isAuthorizationRequest)
            //    if (auth.ActionPermissionList.All(row => row.ActionFullName != eventArgs.MethodFullName))
            //    {
            //        var exceptionMsg = $"{currentAction.Action} - უფლება შეზღუდულია";
            //        log.ExceptionMessage = exceptionMsg;

            //        //ლოგის შენახვა
            //        LogInsert(log);

            //        throw new UnauthorizedAccessException(exceptionMsg);
            //    }

            ////ლოგის შენახვა
            //LogInsert(log);
        }

        /// <summary>
        /// ამ მეთოდის გამოძახება ხდება JorJikaSecurityFilter-ის შვილი ობიექტების მეთოდის გამოძახების შემდეგ
        /// </summary>
        /// <param name="sender">JActionAspect ობიექტი</param>
        /// <param name="result">ობიექტი რაც დააბრუნა მეთოდმა</param>
        /// <param name="eventArgs">მეთოდის პარამეტრები და მათი მნიშვნელობები</param>
        public static void JActionEventOnMethodEnd(object sender, object result, JActionEventArgs eventArgs)
        {
            //bool isAuthorizationRequest = eventArgs.MethodFullName == "CurrencyManagement.BusinessLogicLayer.AccountAuth.Authorize";

            //Auth auth = null;
            //if (!isAuthorizationRequest)
            //    auth = AuthorizationList[Token];

            //LogComplete(eventArgs, isAuthorizationRequest);
        }

        public static void AuthTimerOnElapsed(object sender, ElapsedEventArgs elapsedEventArgs)
        {
            List<string> timeOutTokenList = AuthorizationList.Values.Where(auth => auth.LastActionDate.AddMinutes(AuthorizationTimeOut) <= DateTime.Now).Select(r => r.Token).ToList();

            //თუ ვერ მოიძებნა ვადაგასული ავტორიზაციები აღარ აგრძელებს კოდი
            if (!timeOutTokenList.Any()) return;

            Parallel.ForEach(timeOutTokenList, (token) =>
            {
                Auth a;
                AuthorizationList.TryRemove(token, out a);
            });

            //ასინქრონულად ეშვება ბაზას რომ გაუთანაბრდეს
            Task.Factory.StartNew(() =>
            {
                AuthListDelete(timeOutTokenList);
            });
        }

        #endregion

        #region HelperMethods

        //public static void LoadAllActions(bool refreshFromDatabase = false)
        //{
        //    if (ActionList.Any() && !refreshFromDatabase) return;

        //    var db = new DataBase();
        //    try
        //    {
        //        db.Open();
        //        var actions = db.ActionList();
        //        ActionList.Clear();

        //        foreach (var act in actions.Where(act => !ActionList.ContainsKey(Convert.ToInt32(act.ActionId))))
        //        {
        //            ActionList.TryAdd(Convert.ToInt32(act.ActionId), act);
        //        }
        //    }
        //    finally
        //    {
        //        db.Close();
        //    }

        //}

        //public static void LogInsert(ActionLogRow row)
        //{
        //    //ლოგის შენახვა
        //    var logDb = new DataBase();

        //    try
        //    {
        //        logDb.Open();
        //        logDb.ActionLogInsert(row);
        //    }
        //    catch (Exception)
        //    {
        //        // ignored
        //    }
        //    finally
        //    {
        //        logDb.Close();
        //    }
        //    //
        //}

        //public static void LogComplete(JActionEventArgs eventArgs, bool isAuthorizationRequest)
        //{
        //    //ლოგ ის განახლება
        //    var logDb = new DataBase();

        //    try
        //    {
        //        logDb.Open();
        //        logDb.ActionLogComplete(
        //                                eventArgs.ActionUniqueId,
        //                                eventArgs.ExceptionObject?.Message,
        //                                eventArgs.HasException == false,
        //                                isAuthorizationRequest ? (int?)eventArgs.MethodArguments["UserId"] : null
        //                               );
        //    }
        //    catch (Exception)
        //    {
        //        // ignored
        //    }
        //    finally
        //    {
        //        logDb.Close();
        //    }
        //    //
        //}

        //public static void UpdateActionPermissions(int actionId, bool isSelected, int userGroupId)
        //{

        //    var affectedUserAuthorizations = AuthorizationList.Values.Where(row => row.User != null
        //                                                                        && row.UserGroupList.Any(groupRow => groupRow.UserGroupId == userGroupId)
        //                                                                   ).ToList();

        //    var db = new DataBase();
        //    try
        //    {
        //        db.Open();
        //        foreach (var affectedAuth in affectedUserAuthorizations)
        //        {
        //            affectedAuth.ActionPermissionList = db.ActionPermissionList(affectedAuth.User.UserId).ToList();
        //        }

        //    }
        //    catch (Exception)
        //    {
        //        //ignored
        //    }
        //    finally
        //    {
        //        db.Close();
        //    }

        //    //
        //}

        //public static void UpdateBranchPermissions(int branchId, bool isSelected, int userGroupId)
        //{

        //    var affectedUserAuthorizations = AuthorizationList.Values.Where(row => row.User != null
        //                                                                        && row.UserGroupList.Any(groupRow => groupRow.UserGroupId == userGroupId)
        //                                                                   ).ToList();

        //    var db = new DataBase();
        //    try
        //    {
        //        db.Open();
        //        foreach (var affectedAuth in affectedUserAuthorizations)
        //        {
        //            affectedAuth.BranchPermissionList = db.BranchPermissionList(affectedAuth.User.UserId).ToList();
        //        }

        //    }
        //    catch (Exception)
        //    {
        //        //ignored
        //    }
        //    finally
        //    {
        //        db.Close();
        //    }

        //    //
        //}

        //public static void UpdateActionName(ActionRow row, JActionEventArgs eventArgs)
        //{
        //    //თუ მეთოდის სახელი ატრიბუტში არსებობს
        //    if (!string.IsNullOrWhiteSpace(eventArgs.MethodName) || !string.IsNullOrWhiteSpace(eventArgs.MethodCategory))
        //    {
        //        //თუ მეთოდის სახელი შეიცვალა ატრიბუტში მაშინ ხდება განახლება ბაზაში
        //        if (!string.IsNullOrWhiteSpace(eventArgs.MethodName) && row.Action != eventArgs.ActionName)
        //            row.Action = eventArgs.ActionName;

        //        //თუ მეთოდის კატეგორია შეიცვალა ატრიბუტში მაშინ ხდება განახლება ბაზაში
        //        if (!string.IsNullOrWhiteSpace(eventArgs.MethodCategory) && row.ActionCategory != eventArgs.MethodCategory)
        //            row.ActionCategory = eventArgs.MethodCategory;

        //        var db = new DataBase();
        //        try
        //        {
        //            db.Open();
        //            db.ActionSave(row);
        //        }
        //        catch (Exception)
        //        {
        //            //ignored
        //        }
        //        finally
        //        {
        //            db.Close();
        //        }
        //    }
        //}


        public static void AuthListLoad()
        {
            if (!AuthorizationList.Any())
            {
                IEnumerable<AuthorizationListRow> result = null;
                var db = new DataBase();
                try
                {
                    db.Open();
                    result = db.AuthorizationList();
                }
                catch (Exception)
                {
                    //ignored
                }
                finally
                {
                    db.Close();
                }


                if (result != null)
                    Parallel.ForEach(result.ToList(), (row) =>
                    {
                        AuthorizationList.TryAdd(row.Token, row.AuthObject);
                    });
            }
        }

        public static void AuthListSave(List<Auth> authList = null)
        {
            var db = new DataBase();
            try
            {
                db.Open();
                db.BeginTransaction();

                if (authList == null)
                {
                    db.AuthorizationListDelete();
                    foreach (var auth in AuthorizationList)
                    {
                        db.AuthorizationListSave(auth.Key, JsonConvert.SerializeObject(auth.Value));
                    }
                }
                else
                {
                    foreach (var auth in authList)
                    {
                        db.AuthorizationListSave(auth.Token, JsonConvert.SerializeObject(auth));
                    }
                }

                db.CommitTransaction();
            }
            catch (Exception)
            {
                db.RollBackTransaction();
            }
            finally
            {
                db.Close();
            }
        }

        public static void AuthListDelete(List<string> tokenList)
        {
            var db = new DataBase();
            try
            {
                db.Open();
                db.BeginTransaction();

                foreach (var token in tokenList)
                    db.AuthorizationListDelete(token);

                db.CommitTransaction();
            }
            catch (Exception)
            {
                db.RollBackTransaction();
                //ignored
            }
            finally
            {
                db.Close();
            }
        }

        #endregion
    }
}
