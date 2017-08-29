using JorJikaHelper.Items;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CurrencyManagement.DataContracts.Rows.Core
{
    public class CurrencyRow : JDateTimesAndSelectable
    {
        public int? CurrencyId { get; set; }
        public string Currency { get; set; }
        public string Code { get; set; }
    }
}
