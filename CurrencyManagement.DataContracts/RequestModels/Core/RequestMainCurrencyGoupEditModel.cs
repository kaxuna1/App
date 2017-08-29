using CurrencyManagement.DataContracts.Rows.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CurrencyManagement.DataContracts.RequestModels.Core
{
    public class RequestMainCurrencyGoupEditModel
    {
        public ChannelCategoryRow row { get; set; }
        public RequestChannelCategoryModel request { get; set; }
    }
}
