using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CurrencyManagement.DataAccessLayer.Extensions;
using CurrencyManagement.DataContracts;
using CurrencyManagement.DataContracts.RequestModels.Config;
using CurrencyManagement.DataContracts.Rows.Config;

namespace CurrencyManagement.DataAccessLayer.Layers
{
    public partial class DataBase : DataAccessLayerBase
    {
        public NormalList<CategoryRow> CategoryList(RequestCategoryModel request)
        {
            var result = Query<CategoryRow>("Config.spCategoryList", new
            {
                request.CategoryId,
            });

            return result.ToNormalList();
        }

        public int CategorySave(CategoryRow row)
        {
            var result = QueryFirst("Config.spCategorySave", new
            {
                row.CategoryId,
                row.Category,
                row.DateDeleted,
            });

            return result.CategoryId;
        }

        public NormalList<ChannelTypeRow> ChannelTypeList(RequestChannelTypeModel request)
        {
            var result = Query<ChannelTypeRow>("Config.spChannelTypeList", new
            {
                request.ChannelTypeId,
            });

            return result.ToNormalList();
        }
    }
}
