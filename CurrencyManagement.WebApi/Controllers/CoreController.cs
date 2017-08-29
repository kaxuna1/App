using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using CurrencyManagement.BusinessLogicLayer;
using CurrencyManagement.DataContracts;
using CurrencyManagement.WebApi.Global;
using CurrencyManagement.WebApi.Security;
using CurrencyManagement.DataContracts.Rows.Core;
using CurrencyManagement.DataContracts.RequestModels.Core;
using CurrencyManagement.BusinessLogicLayer.Helpers;
using System.IO;
using System.Net.Http.Headers;
using HttpMultipartParser;
using OfficeOpenXml;
using System.Threading.Tasks;
using System.Web.Http.Cors;
using System.Web;
using CurrencyManagement.Authorization;
using CurrencyManagement.WebApi.Extensions;
using CurrencyManagement.WebApi.Models;
using Dapper;

namespace CurrencyManagement.WebApi.Controllers
{
    public class CoreController : ApiController
    {
        [HttpPost]
        [UserAuthorize]
        [Route(GlobalConfig.BaseUrl + "Core/CurrencyList")]
        public NormalList<CurrencyRow> CurrencyList(RequestCurrencyModel request)
        {
            var businessLayer = new Core();
            return businessLayer.CurrencyList(request);
        }

        [HttpPost]
        [UserAuthorize]
        [Route(GlobalConfig.BaseUrl + "Core/ChannelList")]
        public NormalList<ChannelRow> ChannelList(RequestChannelModel request)
        {
            var businessLayer = new Core();
            return businessLayer.ChannelList(request);
        }

        [HttpPost]
        [UserAuthorize]
        [Route(GlobalConfig.BaseUrl + "Core/ChannelCategorySave")]
        public int ChannelCategorySave(ChannelCategoryRow row)
        {
            var businessLayer = new Core();
            return businessLayer.ChannelCategorySave(row);
        }

        [HttpPost]
        [UserAuthorize]
        [Route(GlobalConfig.BaseUrl + "Core/ChannelCategoryList")]
        public PagingList<ChannelCategoryRow> ChannelCategoryList(RequestChannelCategoryModel request)
        {
            var businessLayer = new Core();
            return businessLayer.ChannelCategoryList(request);
        }

        [HttpPost]
        [UserAuthorize]
        [Route(GlobalConfig.BaseUrl + "Core/ChannelCategoryGet")]
        public ChannelCategoryRow ChannelCategoryGet(RequestChannelCategoryModel request)
        {
            var businessLayer = new Core();
            return businessLayer.ChannelCategoryGet(request.ChannelCategoryId.Value);
        }

        [HttpPost]
        [UserAuthorize]
        [Route(GlobalConfig.BaseUrl + "Core/RegionList")]
        public NormalList<RegionRow> RegionList(RequestRegionModel request)
        {
            var businessLayer = new Core();
            return businessLayer.RegionList(request);
        }

        [HttpPost]
        [UserAuthorize]
        [Route(GlobalConfig.BaseUrl + "Core/ChannelCategoryListExport")]
        public Guid ChannelCategoryListExport(RequestChannelCategoryModel request)
        {
            var businessLayer = new Core();
            return businessLayer.ChannelCategoryListExport(request);
        }




        [HttpGet]
        [UserAuthorize]
        [Route(GlobalConfig.BaseUrl + "Core/SyncService")]
        public HttpResponseMessage GetVillageList(dynamic param)
        {

            var token = Request.GetHeaderValueOrNull("Authorization");

            var authorization = AuthInstance.AuthorizationList[token];

            AllSynchronizeModel syncModel = new AllSynchronizeModel();

            try
            {
                using (var db = BaseRepository.OpenConnection())
                {
           

                    syncModel.Consuls = db.Query<ConsulModel>("GetConsulList @VillageId , @ConsulName",
                            new { VillageId = 0, ConsulName = "" })
                        .OrderBy(o => o.Id);

                    syncModel.Villages = db.Query<VillageModel>("GetVillageList").OrderBy(o => o.Id);


                    syncModel.Branches = db.Query<BranchModel>("GetBranchListConsul").OrderBy(o => o.Id);

                    syncModel.Regions = db.Query<Region>("GetRegions").OrderBy(o => o.Id);

       

                    return Request.CreateResponse(new { syncModel, success = true });
                }
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(new { success = false, errorMessage = ex.Message });
            }
            
        }

        [HttpPost]
        [UserAuthorize]
        [Route(GlobalConfig.BaseUrl + "Core/report")]
        public HttpResponseMessage GetReport(ReportParams param)
        {

            var token = Request.GetHeaderValueOrNull("Authorization");

            var authorization = AuthInstance.AuthorizationList[token];

            

            try
            {
                using (var db = BaseRepository.OpenConnection2())
                {
           

                    var data = db.Query<dynamic>("[Reports].[ConsulApplicatinStatusReport] @FromDate,@ToDate,@BranchId,@ConsulId",
                            new { FromDate = param.from, ToDate = param.to, BranchId=param.branch, ConsulId=param.consul });

              

       

                    return Request.CreateResponse(new { data, success = true });
                }
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(new { success = false, errorMessage = ex.Message });
            }
            
        }


        [HttpGet]
        [Route(GlobalConfig.BaseUrl + "Core/GetFile/{fileId}/{fileName}/{extension}")]
        public HttpResponseMessage GetFile(Guid fileId, string fileName, string extension)
        {
            var response = new HttpResponseMessage();

            byte[] fileByteData = FileHelper.ReadAndRemoveFileByGuid(fileId);

            if (fileByteData != null)
            {
                var fileTitle = Path.GetFileNameWithoutExtension(fileName);

                response.Content = new ByteArrayContent(fileByteData);
                response.Content.Headers.ContentDisposition = new ContentDispositionHeaderValue("attachment");
                response.Content.Headers.ContentDisposition.FileName = fileTitle + " - " + DateTime.Now.ToString("dd.MM.yyyy") + "." + extension;
                response.Content.Headers.ContentType = new MediaTypeHeaderValue("application/octet-stream");
                response.Content.Headers.ContentLength = fileByteData.Length;
                response.StatusCode = HttpStatusCode.OK;
            }
            else
            {
                throw new Exception("ფაილი ვერ მოიძებნა");
            }

            return response;
        }


        [HttpPost]
        [UserAuthorize]
        [Route(GlobalConfig.BaseUrl + "Core/CurrencyExcelUpload")]
        public async void CurrencyExcelUpload()
        {
            var x = await Request.Content.ReadAsStreamAsync();
            var parser = new MultipartFormDataParser(x);

            DateTime startDate = DateTime.Parse(parser.Parameters[0].Data);

            var fileinfo = parser.Files[0];
            if (fileinfo == null) throw new Exception("მიუთითეთ ასატვირთი ფაილი!");

            using (ExcelPackage excelPackage = new ExcelPackage(fileinfo.Data))
            {
                ExcelWorkbook excelWorkBook = excelPackage.Workbook;
                ExcelWorksheet excelWorksheet = excelWorkBook.Worksheets.FirstOrDefault();
                var rows = ExHelper.ExcelReader(excelWorksheet);
                var businessLayer = new Core();
                businessLayer.CurrencyTableSave(rows, startDate);
            }
        }

        [HttpPost]
        [UserAuthorize]
        [Route(GlobalConfig.BaseUrl + "Core/FXRateList")]
        public PagingList<FXRateRow> FXRateList(RequestFXRateModel request)
        {
            var businessLayer = new Core();
            return businessLayer.FXRateList(request);
        }

        [HttpPost]
        [UserAuthorize]
        [Route(GlobalConfig.BaseUrl + "Core/FXRateListExport")]
        public Guid FXRateListExport(RequestFXRateModel request)
        {
            var businessLayer = new Core();
            return businessLayer.FXRateListExport(request);
        }

        [HttpPost]
        [UserAuthorize]
        [Route(GlobalConfig.BaseUrl + "Core/ChannelCategoryGoupEdit")]
        public void ChannelCategoryGoupEdit(RequestMainCurrencyGoupEditModel request)
        {
            var businessLayer = new Core();
            businessLayer.ChannelCategoryGoupEdit(request);
        }
    }
}
