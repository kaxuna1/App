using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Newtonsoft.Json;

namespace CurrencyManagement.WebApi.Controllers
{
    public static class Extentions
    {
        /// <summary>
        /// Converts Object To Int
        /// </summary>
        /// <param name="value"></param>
        /// <returns></returns>
        public static int ToInt(this object value)
        {
            return Convert.ToInt32(value);
        }

        /// <summary>
        /// Converts Object To DateTime
        /// </summary>
        /// <param name="value"></param>
        /// <returns></returns>
        public static DateTime ToDate(this object value)
        {
            return Convert.ToDateTime(value);
        }

        /// <summary>
        /// Converts Object To Long (Int64)
        /// </summary>
        /// <param name="value"></param>
        /// <returns></returns>
        public static long ToLong(this string value)
        {
            return Convert.ToInt64(value);
        }

        /// <summary>
        /// Converts Object To Boolean
        /// </summary>
        /// <param name="value"></param>
        /// <returns></returns>
        public static bool ToBool(this object value)
        {
            return Convert.ToBoolean(value);
        }

        /// <summary>
        /// Converts Object To Decimal
        /// </summary>
        /// <param name="value"></param>
        /// <returns></returns>
        public static decimal ToDecimal(this object value)
        {
            return Convert.ToDecimal(value);
        }
        /*
        /// <summary>
        /// * Extention Method For Generate Return Result With Skip/Taking Any Type Of Collections
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="value"></param>
        /// <param name="start">Default Is 0</param>
        /// <param name="limit">Default is 0</param>
        /// <returns>If <paramref name="limit" /> Is Grater Then 0, Then Returns Part Of Collection Depending on <paramref name="start" /></returns>
        public static GenericItemsModel<T> ToResult<T>(this IEnumerable<T> value, int start = 0, int limit = 0)
        {
            if (limit > 0)
            {
                return new GenericItemsModel<T>()
                {
                    Items = value.Skip(start).Take(limit),
                    Rows = value.Count()
                };
            }
            return new GenericItemsModel<T>()
            {
                Items = value,
                Rows = value.Count()
            };
        }

        /// <summary>
        /// Converts SimData Standart Output Params To Result Object
        /// </summary>
        /// <param name="value">SimData Standart Output Object</param>
        /// <returns>Result Object</returns>
        public static StatusResult ToResult(this Dictionary<string, object> value)
        {
            var result = new StatusResult();
            var properties = typeof(StatusResult).GetProperties();

            foreach (var p in properties)
            {
                if (value.ContainsKey(p.Name) && value[p.Name].GetType() != typeof(DBNull))
                {
                    try
                    {
                        p.SetValue(result, value[p.Name]);
                    }
                    catch (Exception)
                    {
                        p.SetValue(result, Convert.ChangeType(value[p.Name], p.PropertyType));
                    }
                    if (p.Name == "id" && result.id <= 0)
                    {
                        result.status = Config.Response.ERROR;
                    }
                }
            }
            return result;
        }
        */
        /// <summary>
        /// Converts Json String To Object
        /// </summary>
        /// <typeparam name="T">Any Type Of T Object</typeparam>
        /// <param name="value">JsonString</param>
        /// <returns>T Object</returns>
        public static T As<T>(this string value)
        {
            return JsonConvert.DeserializeObject<T>(value);
        }
    }
}