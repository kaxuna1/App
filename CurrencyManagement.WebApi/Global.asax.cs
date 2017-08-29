using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;
using CurrencyManagement.Authorization;

namespace CurrencyManagement.WebApi
{
    public class WebApiApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();
            GlobalConfiguration.Configure(WebApiConfig.Register);
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);

            //JorJikaHelper Initialization
            if (JorJikaHelper.AOP.JActionEvent.MethodStartIsNull())
                JorJikaHelper.AOP.JActionEvent.MethodStart += AuthInstance.JActionEventOnMethodStart;
            if (JorJikaHelper.AOP.JActionEvent.MethodEndIsNull())
                JorJikaHelper.AOP.JActionEvent.MethodEnd += AuthInstance.JActionEventOnMethodEnd;
        }

        public override void Init()
        {
            //აქ სტატიკური ცხრილების ინიციალიზაცია თუ დაგვჭირდება


            //სესიების ინიციალიზაციისთვის
            BeginRequest += OnBeginRequest;
            PostAuthenticateRequest += OnPostAuthenticateRequest;
            base.Init();
        }

        private void OnBeginRequest(object sender, EventArgs eventArgs)
        {
            //Thread-ზე აყენებს კულტურას - yyyy-MM-dd HH:mm:ss <-ამ ფორმატით
            JorJikaHelper.Helpers.CultureHelper.StandardCulture();
        }

        //სესიების ინიციალიზაცია - თუ არ გვჭირდება მივაკომენტარებთ
        private void OnPostAuthenticateRequest(object sender, EventArgs eventArgs)
        {
            //HttpContext.Current.SetSessionStateBehavior(SessionStateBehavior.Required);
        }
    }
}
