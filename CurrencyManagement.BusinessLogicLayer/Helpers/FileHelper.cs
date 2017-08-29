using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;

namespace CurrencyManagement.BusinessLogicLayer.Helpers
{
    public static class FileHelper
    {
        public static string GenerateFilePathFromGuid(Guid fileId)
        {

            var workingPath = HttpContext.Current.Server.MapPath("~/");
            var workingDirectory = Path.Combine(workingPath, "ExportedFilesTMP");
            if (!Directory.Exists(workingDirectory))
                try
                {
                    Directory.CreateDirectory(workingDirectory);
                }
                catch (Exception ex)
                {
                    throw new Exception($"დროებითი Folder-ის შექმნა ფაილის შესანახად ვერ მოხერხდა {Environment.NewLine} {ex.Message}");
                }

            return workingDirectory + @"\\" + fileId;
        }

        public static byte[] ReadAndRemoveFileByGuid(Guid fileId)
        {
            var workingPath = HttpContext.Current.Server.MapPath("~/");
            var workingDirectory = Path.Combine(workingPath, "ExportedFilesTMP");
            if (!Directory.Exists(workingDirectory))
                Directory.CreateDirectory(workingDirectory);

            var filePath = workingDirectory + @"\\" + fileId;
            byte[] fileByteData = null;

            try
            {
                fileByteData = File.ReadAllBytes(filePath);
                File.Delete(filePath);
            }
            catch
            {
                // ignored
            }
            return fileByteData;
        }
    }
}
