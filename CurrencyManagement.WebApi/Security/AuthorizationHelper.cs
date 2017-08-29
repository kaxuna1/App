using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Authentication;
using System.Threading.Tasks;
using System.Web;
using CurrencyManagement.Authorization;
using CurrencyManagement.DataContracts;
using JorJikaHelper.Helpers;

namespace CurrencyManagement.WebApi.Security
{
    public static class AuthorizationHelper
    {
        public static Auth Authorize(string username, string password)
        {
            Logout();
            var passHash = SecurityHelper.GenerateMD5Hash(password);
            var auth = BusinessLogicLayer.AccountAuth.Authorize(username, passHash, HttpContext.Current.Request.UserHostAddress, HttpContext.Current.Request.UserAgent);

            if (AuthInstance.AuthorizationList.TryAdd(auth.Token, auth))
            {
                //ასინქრონულად ეშვება ბაზას რომ გაუთანაბრდეს
                Task.Factory.StartNew(() =>
                {
                    AuthInstance.AuthListSave(new List<Auth>() { auth });
                });

                return auth;
            }
            else
                throw new AuthenticationException("ავტორიზაციის დროს დაფიქსირდა შეცდომა");
        }

        public static bool Logout()
        {
            try
            {
                var token = AuthInstance.Token;
                Auth auth;
                var removed = AuthInstance.AuthorizationList.TryRemove(token, out auth);

                //ასინქრონულად ეშვება ბაზას რომ გაუთანაბრდეს
                Task.Factory.StartNew(() =>
                {
                    AuthInstance.AuthListDelete(new List<string>() { token });
                });

                return removed;
            }
            catch (Exception)
            {
                return false;
            }
        }
    }
}