using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using System.Web.Http.Cors;
using CurrencyManagement.WebApi.Security;
using Newtonsoft.Json;

namespace CurrencyManagement.WebApi
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            // Web API configuration and services

            // Web API routes
            config.MapHttpAttributeRoutes();

            EnableCrossSiteRequests(config);

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );
            // Remove Xml Support
            config.Formatters.Remove(config.Formatters.XmlFormatter);

            JsonSerializerSettings jSettings = new JsonSerializerSettings() { Formatting = Formatting.Indented };
            jSettings.Converters.Add(new JsonDateTimeConverter());
            config.Formatters.JsonFormatter.SerializerSettings = jSettings;

            config.MessageHandlers.Add(new RequestHandlerWrapper());
        }

        private static void EnableCrossSiteRequests(HttpConfiguration config)
        {
            var cors = new EnableCorsAttribute(
                origins: "*",
                headers: "*",
                methods: "*");
            config.EnableCors(cors);
        }
    }
}
