using JorJikaHelper.Attributes;
using JorJikaHelper.Enums;
using JorJikaHelper.Items;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CurrencyManagement.DataContracts.Rows.Core
{
    public class ChannelCategoryRow : JDateTimesAndSelectable
    {
        [DisplayName("ID")]
        public int? ChannelCategoryId { get; set; }
        public int ChannelTypeId { get; set; }
        [DisplayName("არხის ტიპი")]
        public string ChannelTypeName { get; set; }
        public int ChannelId { get; set; }

        [DisplayName("არხის დასახელება")]
        public string ChannelName { get; set; }
        public int ChannelRegionId { get; set; }
        public int FirstCurrencyId { get; set; }
        public string FirstCurrencyName { get; set; }
        public int SecondCurrencyId { get; set; }
        [DisplayName("კურსთა წყვილი")]
        public string CurrencyPair { get; set; }
        public string SecondCurrencyName { get; set; }
        public int CategoryId { get; set; }

        [DisplayName("კატეგორია")]
        public string CategoryName { get; set; }

        [DisplayName("ამოქმედების თარიღი")]
        [FormatField(FieldTypeFormat.DateTime)]
        public string StartDate { get; set; }
        public int LastUserId { get; set; }

        [DisplayName("მომხმარებელი")]
        public string LastUserName { get; set; }
    }
}
