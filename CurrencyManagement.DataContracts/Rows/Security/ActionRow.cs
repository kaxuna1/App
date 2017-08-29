using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using JorJikaHelper.Items;

namespace CurrencyManagement.DataContracts.Rows.Security
{
    public class ActionRow : JDateTimesAndSelectable
    {
        public bool IsReadOnly { get; set; }
        public int? ActionId { get; set; }
        public string Action { get; set; }
        public string ActionFullName { get; set; }
        public string ActionCategory { get; set; }
        public string Author { get; set; }
        public bool ActionConfirmed { get; set; }
        public int? ActionParentId { get; set; }
    }
}
