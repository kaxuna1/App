using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CurrencyManagement.DataContracts;

namespace CurrencyManagement.DataAccessLayer.Extensions
{
    public static class EnumerableListExtensions
    {
        /// <summary>
        /// IEnumerable-სიის PagingList ში გადაყვანა
        /// </summary>
        /// <typeparam name="TList"></typeparam>
        /// <param name="resultList"></param>
        /// <param name="totalCount">ჩანაწერების ჯამური რაოდენობა</param>
        /// <returns>აბრუნებს PagingList ობიექტ</returns>
        public static PagingList<TList> ToPagingList<TList>(this IEnumerable<TList> resultList, long totalCount)
        {
            var result = new PagingList<TList>();
            var list = resultList as IList<TList> ?? resultList.ToList();

            result.TotalCount = totalCount;// == 0 && resultList != null ? list.Count() : totalCount;
            result.ResultList = list;
            return result;
        }

        public static NormalList<TList> ToNormalList<TList>(this IEnumerable<TList> resultList)
        {
            var result = new NormalList<TList>();
            var list = resultList as IList<TList> ?? resultList.ToList();

            result.ResultList = list;
            return result;
        }
    }
}
