using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Web;

namespace CurrencyManagement.WebApi.Controllers
{
    [Serializable]
    public class Dynamic : ISerializable
    {
        Dictionary<string, object> dict = new Dictionary<string, object>();
        public Dynamic() { }
        protected Dynamic(SerializationInfo info, StreamingContext context)
        {
            foreach (var entry in info)
            {
                dict.Add(entry.Name, entry.Value);
            }
        }

        public void GetObjectData(SerializationInfo info, StreamingContext context)
        {
            foreach (string key in dict.Keys)
            {
                info.AddValue(key, dict[key], dict[key] == null ? typeof(object) : dict[key].GetType());
            }
        }

        public void Add(string key, object value)
        {
            dict.Add(key, value);
        }
    }
}