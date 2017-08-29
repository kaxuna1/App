using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using JorJikaHelper.Items;

namespace CurrencyManagement.DataContracts.Rows.Security
{
    public class UserRow : JSelectable
    {
        public int UserId { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string FullName { get; set; }
        public string PersonalNumber { get; set; }
        public string Mobile { get; set; }
        public string Email { get; set; }
        public int? BranchId { get; set; }
        public string Branch { get; set; }
        public bool IsActive { get; set; }
    }
}
