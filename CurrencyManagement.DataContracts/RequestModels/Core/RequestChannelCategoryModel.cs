using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CurrencyManagement.DataContracts.RequestModels.Core
{
    public class RequestChannelCategoryModel : RequestBaseModel
    {
        public int? ChannelCategoryId { get; set; }
        public int? ChannelTypeId { get; set; }
        public int? ChannelRegionId { get; set; }
        public int?[] ChannelIds { get; set; }
        public int? CategoryId { get; set; }
        public int? FirstCurrencyId { get; set; }
        public int? SecondCurrencyId { get; set; }
        public DateTime? DateRangeStart { get; set; }
        public DateTime? DateRangeEnd { get; set; }
    }
}
