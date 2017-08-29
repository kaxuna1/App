using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CurrencyManagement.DataAccessLayer.Layers;
using CurrencyManagement.DataContracts;
using CurrencyManagement.DataContracts.RequestModels.Config;
using CurrencyManagement.DataContracts.Rows.Config;
using JorJikaHelper.AOP;

namespace CurrencyManagement.BusinessLogicLayer
{
    public class Config : JorJikaSecurityFilter
    {
        [ActionDescription("კატეგორიების ჩამონათვალი", "კონფიგურაცია", "გიორგი ჟორჟოლიანი")]
        public NormalList<CategoryRow> CategoryList(RequestCategoryModel request)
        {
            NormalList<CategoryRow> result;

            using (var db = new DataBase())
            {
                try
                {
                    db.Open();
                    result = db.CategoryList(request);
                }
                catch (Exception ex)
                {
                    throw ex;
                }
                finally
                {
                    db.Close();
                }
            }

            return result;
        }

        [ActionDescription("კატეგორიის შენახვა, რედაქტირება, წაშლა", "კონფიგურაცია", "გიორგი ჟორჟოლიანი")]
        public int CategorySave(CategoryRow row)
        {
            int result;

            using (var db = new DataBase())
            {
                try
                {
                    db.Open();
                    result = db.CategorySave(row);
                }
                catch (Exception ex)
                {
                    throw ex;
                }
                finally
                {
                    db.Close();
                }
            }

            return result;
        }

        [ActionDescription("არხების ჩამონათვალი", "-----", "გიორგი ნადარეიშვილი")]
        public NormalList<ChannelTypeRow> ChannelTypeList(RequestChannelTypeModel request)
        {
            NormalList<ChannelTypeRow> result;

            using (var db = new DataBase())
            {
                try
                {
                    db.Open();
                    result = db.ChannelTypeList(request);
                }
                catch (Exception ex)
                {
                    throw ex;
                }
                finally
                {
                    db.Close();
                }
            }

            return result;
        }
    }
}
