using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;

namespace CurrencyManagement.WebApi.Security
{
    public class JsonDateTimeConverter : DateTimeConverterBase
    {
        public override void WriteJson(JsonWriter writer, object value, JsonSerializer serializer)
        {
            var d = (DateTime)value;
            if (d.Hour == 0 && d.Minute == 0 && d.Second == 0)
            {
                writer.WriteValue(((DateTime)value).ToString("yyyy-MM-dd"));
            }
            else
            {
                writer.WriteValue(((DateTime)value).ToString("yyyy-MM-dd HH:mm:ss"));
            }
        }

        public override object ReadJson(JsonReader reader, Type objectType, object existingValue, JsonSerializer serializer)
        {
            DateTime d;
            if (DateTime.TryParse(reader.Value?.ToString(), out d))
            {
                return d;
            }
            return null;
        }
    }
}