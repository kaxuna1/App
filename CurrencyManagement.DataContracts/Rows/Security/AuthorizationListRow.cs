using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CurrencyManagement.DataContracts.Rows.Security
{
    public class AuthorizationListRow
    {
        public string Token { get; set; }
        public Auth AuthObject { get; set; }
    }
}
