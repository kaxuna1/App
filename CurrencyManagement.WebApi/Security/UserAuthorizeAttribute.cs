using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Authentication;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http.Controllers;
using System.Web.Http.Filters;
using CurrencyManagement.Authorization;
using CurrencyManagement.DataContracts;
using CurrencyManagement.WebApi.Extensions;

namespace CurrencyManagement.WebApi.Security
{
    public class UserAuthorizeAttribute : AuthorizationFilterAttribute
    {
        public override void OnAuthorization(HttpActionContext actionContext)
        {
            var authToken = actionContext.Request.GetHeaderValueOrNull("Authorization");
            if (authToken != null && AuthInstance.AuthorizationList.ContainsKey(authToken))
            {
                var auth = AuthInstance.AuthorizationList[authToken];
                var clientIp = HttpContext.Current.Request.UserHostAddress;
                var clientAgent = HttpContext.Current.Request.UserAgent;

                if (auth.IpAddress == clientIp && auth.UserAgent == clientAgent)
                {
                    if (auth.LastActionDate.AddMinutes(Properties.Settings.Default.AuthorizationTimeOut) < DateTime.Now)
                    {
                        Auth authTmp;

                        if (AuthInstance.AuthorizationList.TryRemove(authToken, out authTmp))
                        {
                            //ასინქრონულად ეშვება ბაზას რომ გაუთანაბრდეს
                            Task.Factory.StartNew(() =>
                            {
                                AuthInstance.AuthListDelete(new List<string>() { authToken });
                            });
                        }

                        throw new AuthenticationException("სესიის დრო ამოიწურა");
                    }
                    else
                        auth.LastActionDate = DateTime.Now;
                }
                else
                    throw new AuthenticationException("ავტორიზაცია არ არის ვალიდური");

            }
            else
                throw new AuthenticationException("ავტორიზაცია არ ფიქსირდება");
        }
    }
}