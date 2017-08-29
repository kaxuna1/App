using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CurrencyManagement.DataContracts.Rows.Config
{
    public class ChannelTypeRow
    {
        [DisplayName("არხის Id")]
        public int? ChannelTypeId { get; set; }

        [DisplayName("არხი")]
        public string Name { get; set; }
    }
}
