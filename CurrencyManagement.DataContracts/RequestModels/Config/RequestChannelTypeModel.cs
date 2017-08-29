using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CurrencyManagement.DataContracts.RequestModels.Config
{
   public class RequestChannelTypeModel
    {
        [DisplayName("კატეგორიის Id")]
        public int? ChannelTypeId { get; set; }
    }
}
