using JorJikaHelper.Attributes;
using JorJikaHelper.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CurrencyManagement.DataContracts.Rows.Core
{
    public class FXRateRow
    {
        public int? FXRateId { get; set; }

        [DisplayName("ამოქმედების თარიღი")]
        [FormatField(FieldTypeFormat.DateOnly)]
        public string StartDate { get; set; }
        public string FirstCurrencyCode { get; set; }
        public string SecondCurrencyCode { get; set; }

        [DisplayName("კურსთა წყვილი")]
        public string CurrencyPair { get; set; }
        public decimal? B15 { get; set; }
        public decimal? B14 { get; set; }
        public decimal? B13 { get; set; }
        public decimal? B12 { get; set; }
        public decimal? B11 { get; set; }
        public decimal? B10 { get; set; }
        public decimal? B9 { get; set; }
        public decimal? B8 { get; set; }
        public decimal? B7 { get; set; }
        public decimal? B6 { get; set; }
        public decimal? B5 { get; set; }
        public decimal? B4 { get; set; }
        public decimal? B3 { get; set; }
        public decimal? B2 { get; set; }
        public decimal? B1 { get; set; }
        public decimal? S1 { get; set; }
        public decimal? S2 { get; set; }
        public decimal? S3 { get; set; }
        public decimal? S4 { get; set; }
        public decimal? S5 { get; set; }
        public decimal? S6 { get; set; }
        public decimal? S7 { get; set; }
        public decimal? S8 { get; set; }
        public decimal? S9 { get; set; }
        public decimal? S10 { get; set; }
        public decimal? S11 { get; set; }
        public decimal? S12 { get; set; }
        public decimal? S13 { get; set; }
        public decimal? S14 { get; set; }
        public decimal? S15 { get; set; }
        public decimal? NBG { get; set; }
        public int CreateUserId { get; set; }
    }
}
