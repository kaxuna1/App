using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Web;

namespace CurrencyManagement.WebApi.Extensions
{
    public static class HttpRequestMessageExtensions
    {
        public static string GetHeaderValueOrNull(this HttpRequestMessage request, string headerKey)
        {
            string result = null;

            IEnumerable<string> headerList;
            if (!request.Headers.TryGetValues(headerKey, out headerList)) return null;

            var headerValue = headerList.First();
            if (!string.IsNullOrWhiteSpace(headerValue))
                result = headerValue;

            return result;
        }
    }
}