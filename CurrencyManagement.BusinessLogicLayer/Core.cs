using CurrencyManagement.Authorization;
using CurrencyManagement.BusinessLogicLayer.Helpers;
using CurrencyManagement.DataAccessLayer.Layers;
using CurrencyManagement.DataContracts;
using CurrencyManagement.DataContracts.RequestModels.Core;
using CurrencyManagement.DataContracts.Rows.Core;
using JorJikaHelper.AOP;
using JorJikaHelper.Helpers;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CurrencyManagement.BusinessLogicLayer
{
    public class Core : JorJikaSecurityFilter
    {
        [ActionDescription("ვალუტების ჩამონათვალი", "-----", "გიორგი ნადარეიშვილი")]
        public NormalList<CurrencyRow> CurrencyList(RequestCurrencyModel request)
        {
            NormalList<CurrencyRow> result;

            using (var db = new DataBase())
            {
                try
                {
                    db.Open();
                    result = db.CurrencyList(request);
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
        public NormalList<ChannelRow> ChannelList(RequestChannelModel request)
        {
            NormalList<ChannelRow> result;

            using (var db = new DataBase())
            {
                try
                {
                    db.Open();
                    result = db.ChannelList(request);
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

        [ActionDescription("არხების კატეგორიების ჯგუფური შენახვა", "-----", "გიორგი ნადარეიშვილი")]
        public void ChannelCategoryGoupEdit(RequestMainCurrencyGoupEditModel request)
        {
            using (var db = new DataBase())
            {
                try
                {
                    db.Open();
                    db.BeginTransaction();

                    request.request.Start = 0;
                    request.request.Limit = 1000000;
                    PagingList<ChannelCategoryRow> result = db.ChannelCategoryList(request.request);

                    request.row.LastUserId = AuthInstance.CurrentAuth.User.UserId;

                    foreach (var item in result.ResultList)
                    {
                        item.CategoryId = request.row.CategoryId;
                        item.StartDate = request.row.StartDate;
                        item.LastUserId = request.row.LastUserId;
                        db.ChannelCategorySave(item);
                    }

                    db.CommitTransaction();
                    db.Close();
                }
                catch (Exception ex)
                {
                    db.RollBackTransaction();
                    throw ex;
                }
                finally
                {
                    db.Close();
                }
            }
        }

        [ActionDescription("არხების კატეგორიების შენახვა, რედაქტირება, წაშლა", "-----", "გიორგი ნადარეიშვილი")]
        public int ChannelCategorySave(ChannelCategoryRow row)
        {
            int result;

            row.LastUserId = AuthInstance.CurrentAuth.User.UserId;

            using (var db = new DataBase())
            {
                try
                {
                    db.Open();
                    result = db.ChannelCategorySave(row);
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

        [ActionDescription("არხების კატეგორიების ჩამონათვალი", "-----", "გიორგი ნადარეიშვილი")]
        public PagingList<ChannelCategoryRow> ChannelCategoryList(RequestChannelCategoryModel request)
        {
            PagingList<ChannelCategoryRow> result;

            using (var db = new DataBase())
            {
                try
                {
                    db.Open();
                    result = db.ChannelCategoryList(request);
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

        [ActionDescription("არხების კატეგორიების წამორება", "-----", "გიორგი ნადარეიშვილი")]
        public ChannelCategoryRow ChannelCategoryGet(int channelCategoryId)
        {
            ChannelCategoryRow result;

            using (var db = new DataBase())
            {
                try
                {
                    db.Open();
                    result = db.ChannelCategoryGet(channelCategoryId);
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

        [ActionDescription("რეგიონების ჩამონათვალი", "-----", "გიორგი ნადარეიშვილი")]
        public NormalList<RegionRow> RegionList(RequestRegionModel request)
        {
            NormalList<RegionRow> result;

            using (var db = new DataBase())
            {
                try
                {
                    db.Open();
                    result = db.RegionList(request);
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

        [ActionDescription("არხების კატეგორიების ჩამონათვალის ექსელში ექსპორტი", "-----", "გიორგი ნადარეიშვილი")]
        public Guid ChannelCategoryListExport(RequestChannelCategoryModel request)
        {
            PagingList<ChannelCategoryRow> result;

            var fileUniqueId = Guid.NewGuid();

            request.Start = null;
            request.Limit = null;

            using (var db = new DataBase())
            {
                try
                {
                    db.Open();
                    result = db.ChannelCategoryList(request);
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

            var file = ExcelHelper.ToExcel(result.ResultList, "",
                                                 "ChannelCategoryId",
                                                 "ChannelTypeName",
                                                 "ChannelName",
                                                 "CategoryName",
                                                 "CurrencyPair",
                                                 "StartDate",
                                                 "LastUserName"
                                                );

            var fileFullPath = FileHelper.GenerateFilePathFromGuid(fileUniqueId);
            File.WriteAllBytes(fileFullPath, file);
            return fileUniqueId;
        }

        [ActionDescription("კურსის ტაბლოს ფაილის ატვირთვა", "-----", "გიორგი ნადარეიშვილი")]
        public void CurrencyTableSave(List<Dictionary<string, object>> rows, DateTime startDate)
        {

            using (var db = new DataBase())
            {
                try
                {
                    db.Open();
                    db.BeginTransaction();
                    if (rows != null)
                    {
                        db.FXRateDeleteByDate(startDate);

                        foreach (var row in rows)
                        {
                            FXRateRow fxrow = new FXRateRow();

                            fxrow.FirstCurrencyCode = (string)row["Curr"];
                            fxrow.SecondCurrencyCode = (string)row["Curr2"];
                            fxrow.B1 = ExHelper.GetDecimalValue(row, "B1");
                            fxrow.B2 = ExHelper.GetDecimalValue(row, "B2");
                            fxrow.B3 = ExHelper.GetDecimalValue(row, "B3");
                            fxrow.B4 = ExHelper.GetDecimalValue(row, "B4");
                            fxrow.B5 = ExHelper.GetDecimalValue(row, "B5");
                            fxrow.B6 = ExHelper.GetDecimalValue(row, "B6");
                            fxrow.B7 = ExHelper.GetDecimalValue(row, "B7");
                            fxrow.B8 = ExHelper.GetDecimalValue(row, "B8");
                            fxrow.B9 = ExHelper.GetDecimalValue(row, "B9");
                            fxrow.B10 = ExHelper.GetDecimalValue(row, "B10");
                            fxrow.B11 = ExHelper.GetDecimalValue(row, "B11");
                            fxrow.B12 = ExHelper.GetDecimalValue(row, "B12");
                            fxrow.B13 = ExHelper.GetDecimalValue(row, "B13");
                            fxrow.B14 = ExHelper.GetDecimalValue(row, "B14");
                            fxrow.B15 = ExHelper.GetDecimalValue(row, "B15");
                            fxrow.S1 = ExHelper.GetDecimalValue(row, "S1");
                            fxrow.S2 = ExHelper.GetDecimalValue(row, "S2");
                            fxrow.S3 = ExHelper.GetDecimalValue(row, "S3");
                            fxrow.S4 = ExHelper.GetDecimalValue(row, "S4");
                            fxrow.S5 = ExHelper.GetDecimalValue(row, "S5");
                            fxrow.S6 = ExHelper.GetDecimalValue(row, "S6");
                            fxrow.S7 = ExHelper.GetDecimalValue(row, "S7");
                            fxrow.S8 = ExHelper.GetDecimalValue(row, "S8");
                            fxrow.S9 = ExHelper.GetDecimalValue(row, "S9");
                            fxrow.S10 = ExHelper.GetDecimalValue(row, "S10");
                            fxrow.S11 = ExHelper.GetDecimalValue(row, "S11");
                            fxrow.S12 = ExHelper.GetDecimalValue(row, "S12");
                            fxrow.S13 = ExHelper.GetDecimalValue(row, "S13");
                            fxrow.S14 = ExHelper.GetDecimalValue(row, "S14");
                            fxrow.S15 = ExHelper.GetDecimalValue(row, "S15");
                            fxrow.StartDate = startDate.ToString();

                            fxrow.CreateUserId = AuthInstance.CurrentAuth.User.UserId;
                            db.FXRateSave(fxrow);
                        }
                    }
                    db.CommitTransaction();
                    db.Close();
                }
                catch (Exception ex)
                {
                    db.RollBackTransaction();
                    throw ex;
                }
                finally
                {
                    db.Close();
                }
            }

        }

        [ActionDescription("კურსის ტაბლოს  ჩამონათვალი", "-----", "გიორგი ნადარეიშვილი")]
        public PagingList<FXRateRow> FXRateList(RequestFXRateModel request)
        {
            PagingList<FXRateRow> result;

            using (var db = new DataBase())
            {
                try
                {
                    db.Open();
                    result = db.FXRateList(request);
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

        [ActionDescription("კურსის ტაბლოს ჩამონათვალის ექსელში ექსპორტი", "-----", "გიორგი ნადარეიშვილი")]
        public Guid FXRateListExport(RequestFXRateModel request)
        {
            PagingList<FXRateRow> result;

            var fileUniqueId = Guid.NewGuid();

            request.Start = null;
            request.Limit = null;

            using (var db = new DataBase())
            {
                try
                {
                    db.Open();
                    result = db.FXRateList(request);
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

            List<string> headers = new List<string>();
            var resultOfHeades = result.ResultList.FirstOrDefault();
            if (resultOfHeades != null)
            {
                foreach (var prop in resultOfHeades.GetType().GetProperties())
                {
                    if (prop.GetValue(resultOfHeades) != null && prop.Name != "FXRateId" &&
                        prop.Name != "FirstCurrencyCode" && prop.Name != "SecondCurrencyCode" && prop.Name != "CreateUserId")
                        headers.Add(prop.Name);
                }
            }

            var file = ExcelHelper.ToExcel(result.ResultList, "", headers.ToArray());

            var fileFullPath = FileHelper.GenerateFilePathFromGuid(fileUniqueId);
            File.WriteAllBytes(fileFullPath, file);
            return fileUniqueId;
        }
    }
}
