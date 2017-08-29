using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CurrencyManagement.DataContracts.Rows.Security
{
    public class ActionLogRow
    {
        public int? ActionLogId { get; set; }
        public int ActionId { get; set; }
        public string IpAddress { get; set; }
        public int? UserId { get; set; }
        public string LogData { get; set; }
        public DateTime ActionStartTime { get; set; }
        public DateTime? ActionEndTime { get; set; }
        public bool OperationCompleted { get; set; }
        public string ExceptionMessage { get; set; }
        public Guid ActionUniqueId { get; set; }

    }
}
