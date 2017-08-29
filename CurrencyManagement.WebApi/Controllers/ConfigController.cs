using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using CurrencyManagement.BusinessLogicLayer;
using CurrencyManagement.DataContracts;
using CurrencyManagement.DataContracts.RequestModels.Config;
using CurrencyManagement.DataContracts.Rows.Config;
using CurrencyManagement.WebApi.Global;
using CurrencyManagement.WebApi.Security;

namespace CurrencyManagement.WebApi.Controllers
{
    public class ConfigController : ApiController
    {
        [HttpPost]
        [UserAuthorize]
        [Route(GlobalConfig.BaseUrl + "Config/CategoryList")]
        public NormalList<CategoryRow> CategoryList(RequestCategoryModel request)
        {
            var businessLayer = new Config();
            return businessLayer.CategoryList(request);
        }

        [HttpPost]
        [UserAuthorize]
        [Route(GlobalConfig.BaseUrl + "Config/CategorySave")]
        public int CategorySave(CategoryRow row)
        {
            var businessLayer = new Config();
            return businessLayer.CategorySave(row);
        }

        [HttpPost]
        [UserAuthorize]
        [Route(GlobalConfig.BaseUrl + "Config/ChannelTypeList")]
        public NormalList<ChannelTypeRow> ChannelTypeList(RequestChannelTypeModel request)
        {
            var businessLayer = new Config();
            return businessLayer.ChannelTypeList(request);
        }
    }
}
