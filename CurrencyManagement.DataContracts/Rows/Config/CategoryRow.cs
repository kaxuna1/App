using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using JorJikaHelper.Items;

namespace CurrencyManagement.DataContracts.Rows.Config
{
    public class CategoryRow: JDateTimesAndSelectable
    {
        [DisplayName("კატეგორიის Id")]
        public int? CategoryId { get; set; }

        [DisplayName("კატეგორია")]
        public string Category { get; set; }

    }
}
