using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CurrencyManagement.DataContracts.Rows.Security;
using JorJikaHelper.Items;

namespace CurrencyManagement.DataContracts
{
    public class Auth : JSelectable
    {
        public string Token { get; set; }
        public string IpAddress { get; set; }
        public string UserAgent { get; set; }
        public DateTime AuthorizationDate { get; set; }
        public DateTime LastActionDate { get; set; }
        public string LastAction { get; set; }
        public UserRow User { get; set; }
        //public List<UserInGroupRow> UserGroupList { get; set; }
        //public List<ActionPermissionRow> ActionPermissionList { get; set; }
        //public List<BranchPermissionRow> BranchPermissionList { get; set; }

    }
}
