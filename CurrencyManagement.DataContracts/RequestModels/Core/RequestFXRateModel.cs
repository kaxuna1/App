using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CurrencyManagement.DataContracts.RequestModels.Core
{
    public class RequestFXRateModel : RequestBaseModel
    {
        public DateTime StartDate { get; set; }
    }
}
