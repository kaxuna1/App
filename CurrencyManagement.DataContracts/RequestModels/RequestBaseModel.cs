using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CurrencyManagement.DataContracts.RequestModels
{
    public class RequestBaseModel
    {
        public int? Start { get; set; }
        public int? Limit { get; set; }
        // ReSharper disable once InconsistentNaming
        public string query { get; set; }
    }
}
