using System;
using System.IO;
using System.Threading.Tasks;
using ASPNETCore2JwtAuthentication.Common.Api;
using DNTPersianUtils.Core;
using Microsoft.AspNetCore.Http;
using Models;

namespace ASPNETCore2JwtAuthentication.Services.SiteSetting;

public interface IWebService
{
    Task<ResultShow2<string>> UploadFile(string fileDirectory, string name, IFormFile file);
}

public class WebService : IWebService
{
    public async Task<ResultShow2<string>> UploadFile(
        string fileDirectory,
        string name,
        IFormFile file)
    {
        var result = new ResultShow2<string>();
        try
        {
            var filePath = Path.Combine(fileDirectory, name);
            using (var fileStream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(fileStream).ConfigureAwait(false);
            }

            result.Status = true;
            result.Data = name;
            return result;
        }
        catch (Exception e)
        {
            result.Status = false;
            result.Message = e.ToString();
            result.Message = ErrorName.server;
            return result;
        }
    }
}