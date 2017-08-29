using OfficeOpenXml;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CurrencyManagement.BusinessLogicLayer.Helpers
{
    public static class ExHelper
    {
        public static List<Dictionary<string, object>> ExcelReader(ExcelWorksheet excelWorksheet)
        {
            try
            {
                if (excelWorksheet == null) return null;

                List<Dictionary<string, object>> rows = new List<Dictionary<string, object>>();
                int rowInd = 2;

                int startColumn = excelWorksheet.Dimension.Start.Column;
                int endColumn = excelWorksheet.Dimension.End.Column;

                while (excelWorksheet.Cells[rowInd, startColumn, rowInd, endColumn].Where(i => i.Value != null).FirstOrDefault() != null)
                {
                    var rowCells = new Dictionary<string, object>();
                    for (int c = startColumn; c <= endColumn; c++)
                    {
                        rowCells.Add(excelWorksheet.Cells[1, c].Value.ToString(), excelWorksheet.Cells[rowInd, c].Value);
                    }

                    rows.Add(rowCells);

                    rowInd++;
                }

                return rows;
            }
            catch (Exception)
            {
                throw;
            }
        }

        public static decimal? GetDecimalValue(Dictionary<string, object> row, string key)
        {
            return row.ContainsKey(key) ? (decimal?)Convert.ToDecimal(row[key]) : null;
        }
    }
}
