using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CurrencyManagement.DataContracts
{
    public class NormalList<TList>
    {
        public IEnumerable<TList> ResultList { get; set; }
    }
}
