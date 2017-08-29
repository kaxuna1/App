using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CurrencyManagement.DataContracts
{
    public class PagingList<TList> : NormalList<TList>
    {
        public long TotalCount { get; set; }
    }
}
