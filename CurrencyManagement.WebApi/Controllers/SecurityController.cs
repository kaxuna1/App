using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using CurrencyManagement.Authorization;
using CurrencyManagement.DataContracts;
using CurrencyManagement.DataContracts.RequestModels.Security;
using CurrencyManagement.WebApi.Global;
using CurrencyManagement.WebApi.Security;

namespace CurrencyManagement.WebApi.Controllers
{
    public class SecurityController : ApiController
    {
        [AllowAnonymous]
        [HttpPost]
        [Route(GlobalConfig.BaseUrl + "Security/Authorization")]
        public dynamic Authorization(RequestAuthorizationModel authorizationRequest)
        {
            var auth = AuthorizationHelper.Authorize(authorizationRequest.UserName, authorizationRequest.Password);
            return new { auth.Token, auth.User.FullName, auth.User.UserName };
        }

        [UserAuthorize]
        [HttpPost]
        [Route(GlobalConfig.BaseUrl + "Security/GetCurrentSession")]
        public Auth GetCurrentSession()
        {
            return AuthInstance.CurrentAuth;
        }

        [UserAuthorize]
        [HttpPost]
        [Route(GlobalConfig.BaseUrl + "Security/CheckToken")]
        public bool CheckToken()
        {
            return true;
        }

        [UserAuthorize]
        [HttpPost]
        [Route(GlobalConfig.BaseUrl + "Security/Logout")]
        public bool Logout()
        {
            var auth = AuthorizationHelper.Logout();
            return auth;
        }
    }
}
