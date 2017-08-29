using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace CurrencyManagement.DataContracts
{
    [DataContract]
    public class Response
    {
        #region DataMembers

        [DataMember]
        // ReSharper disable once InconsistentNaming
        public bool success { get; set; }

        [DataMember]
        public string Version => "1.0.0";

        [DataMember]
        public int StatusCode { get; set; }

        [DataMember(EmitDefaultValue = false)]
        public string Description { get; set; }

        [DataMember(EmitDefaultValue = false)]
        public object Result { get; set; }

        #endregion

        #region Helper Methods

        public static Response CreateSuccess(object resultObject, HttpStatusCode statusCode = HttpStatusCode.OK)
        {
            var r = new Response
            {
                success = true,
                StatusCode = (int)statusCode,
                Description = "success",
                Result = resultObject
            };
            return r;
        }

        public static Response CreateTwoStepAuthenticationSuccess(string message, HttpStatusCode statusCode = HttpStatusCode.Accepted)
        {
            var r = new Response
            {
                success = true,
                StatusCode = (int)statusCode,
                Description = message,
                Result = null
            };
            return r;
        }

        public static Response CreateError(string message, HttpStatusCode statusCode = HttpStatusCode.Forbidden)
        {
            var r = new Response
            {
                success = false,
                StatusCode = (int)statusCode,
                Description = message,
                Result = null
            };
            return r;
        }


        #endregion
    }
}
