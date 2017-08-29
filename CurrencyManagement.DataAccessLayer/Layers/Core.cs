using CurrencyManagement.DataAccessLayer.Extensions;
using CurrencyManagement.DataContracts;
using CurrencyManagement.DataContracts.RequestModels.Core;
using CurrencyManagement.DataContracts.Rows.Core;
using Dapper;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CurrencyManagement.DataAccessLayer.Layers
{
    public partial class DataBase : DataAccessLayerBase
    {
        public NormalList<CurrencyRow> CurrencyList(RequestCurrencyModel request)
        {
            var result = Query<CurrencyRow>("Core.spCurrencyList", new
            {
                request.CurrencyId,
            });

            return result.ToNormalList();
        }
        public NormalList<ChannelRow> ChannelList(RequestChannelModel request)
        {
            var result = Query<ChannelRow>("Core.spChannelList", new
            {
                request.ChannelTypeId,
            });

            return result.ToNormalList();
        }
        public int ChannelCategorySave(ChannelCategoryRow row)
        {
            var result = QueryFirst("Core.spChannelCategorySave", new
            {
                row.ChannelCategoryId,
                row.ChannelTypeId,
                row.ChannelId,
                row.ChannelName,
                row.ChannelRegionId,
                row.FirstCurrencyId,
                row.SecondCurrencyId,
                row.CategoryId,
                row.StartDate,
                row.LastUserId,
                row.DateDeleted
            });

            return result.ChannelCategoryId;
        }
        public PagingList<ChannelCategoryRow> ChannelCategoryList(RequestChannelCategoryModel request)
        {
            PagingList<ChannelCategoryRow> result;

            var dt = new DataTable();
            dt.Columns.Add("Id", typeof(int));

            if (request.ChannelIds != null)
            {
                foreach (var channelId in request.ChannelIds)
                {
                    dt.Rows.Add(channelId);
                }
            }

            using (var query = QueryMultiple("Core.spChannelCategoryList", new
            {
                request.ChannelCategoryId,
                request.ChannelTypeId,
                request.ChannelRegionId,
                ChannelIds = dt.AsTableValuedParameter("dbo.ArrayInt"),
                request.CategoryId,
                request.FirstCurrencyId,
                request.SecondCurrencyId,
                request.DateRangeStart,
                request.DateRangeEnd,
                // request.Start,
                // request.Limit
            }))
            {
                //var totalCnt = query.ReadSingle<int>();
                //var resultList = query.Read<ChannelCategoryRow>();

                // result = resultList.ToPagingList(totalCnt);


                var resultList = query.Read<ChannelCategoryRow>();
                result = resultList.ToPagingList(resultList.Count());

            }

            return result;
        }
        public ChannelCategoryRow ChannelCategoryGet(int channelCategoryId)
        {
            return QueryFirstOrDefault<ChannelCategoryRow>("Core.spChannelCategoryGet", new
            {
                ChannelCategoryId = channelCategoryId
            });
        }
        public NormalList<RegionRow> RegionList(RequestRegionModel request)
        {
            var result = Query<RegionRow>("Core.spRegionList", new
            {
                request.RegionId,
            });

            return result.ToNormalList();
        }
        public void FXRateSave(FXRateRow row)
        {
            var result = QueryFirst("Core.spFXRateSave", new
            {
                row.FirstCurrencyCode,
                row.SecondCurrencyCode,
                row.B1,
                row.B2,
                row.B3,
                row.B4,
                row.B5,
                row.B6,
                row.B7,
                row.B8,
                row.B9,
                row.B10,
                row.B11,
                row.B12,
                row.B13,
                row.B14,
                row.B15,
                row.S1,
                row.S2,
                row.S3,
                row.S4,
                row.S5,
                row.S6,
                row.S7,
                row.S8,
                row.S9,
                row.S10,
                row.S11,
                row.S12,
                row.S13,
                row.S14,
                row.S15,
                row.StartDate,
                row.CreateUserId
            });
        }
        public void FXRateDeleteByDate(DateTime StartDate)
        {
            var result = QueryFirst("Core.spFXRateDeleteByDate", new
            {
                StartDate
            });
        }
        public PagingList<FXRateRow> FXRateList(RequestFXRateModel request)
        {
            PagingList<FXRateRow> result;

            using (var query = QueryMultiple("Core.spFXRateList", new
            {
                request.StartDate,
                request.Start,
                request.Limit
            }))
            {
                var totalCnt = query.ReadSingle<int>();
                var resultList = query.Read<FXRateRow>();

                result = resultList.ToPagingList(totalCnt);
            }

            return result;
        }
    }
}
