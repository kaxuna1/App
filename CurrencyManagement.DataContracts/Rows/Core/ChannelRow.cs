using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CurrencyManagement.DataContracts.Rows.Core
{
    public class ChannelRow
    {
        public int? Id { get; set; }
        public string Name { get; set; }
        public int? RegionId { get; set; }
    }
}
