using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using CurrencyManagement.DataContracts;

namespace CurrencyManagement.WebApi.Security
{
    public class RequestHandlerWrapper : DelegatingHandler
    {
        protected override async Task<HttpResponseMessage> SendAsync(HttpRequestMessage request, CancellationToken cancellationToken)
        {
            var response = await base.SendAsync(request, cancellationToken);

            return BuildApiResponse(request, response);
        }

        private static HttpResponseMessage BuildApiResponse(HttpRequestMessage request, HttpResponseMessage response)
        {
            //if (request.Content?.Headers?.ContentType?.MediaType == "multipart/form-data")
            //    return response;

            object content;
            string errorMessage = null;
            Response resultResponse = null;

            if (response.TryGetContentValue(out content) && !response.IsSuccessStatusCode)
            {
                HttpError error = content as HttpError;

                if (error != null)
                {
                    errorMessage = error.ExceptionMessage;

                    switch (error.ExceptionType)
                    {
                        case "System.Security.Authentication.AuthenticationException":
                            resultResponse = Response.CreateError(errorMessage, HttpStatusCode.Unauthorized);
                            break;

                        case "CurrencyManagement.DataContracts.Exceptions.ResponsibleUserPasswordRequiredException": //Custom Exception for Accept
                            resultResponse = Response.CreateTwoStepAuthenticationSuccess(errorMessage);
                            break;

                        default:
                            resultResponse = Response.CreateError(errorMessage);
                            break;
                    }
                }
                else
                {
                    resultResponse = Response.CreateError("დაფიქსირდა შეცდომა");
                }
            }
            else
            {
                if (response.Content?.Headers?.ContentDisposition?.DispositionType == "attachment")
                    return response;


                resultResponse = Response.CreateSuccess(content);
            }

            var newResponse = request.CreateResponse((HttpStatusCode)resultResponse.StatusCode, resultResponse);

            foreach (var header in response.Headers)
            {
                newResponse.Headers.Add(header.Key, header.Value);
            }

            return newResponse;
        }
    }
}