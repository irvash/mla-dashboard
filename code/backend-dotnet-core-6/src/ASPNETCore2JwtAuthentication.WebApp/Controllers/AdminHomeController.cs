using System.IO;
using System.Threading.Tasks;
using ASPNETCore2JwtAuthentication.Services.SiteSetting;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Models;

namespace ASPNETCore2JwtAuthentication.WebApp.Controllers;

[IgnoreAntiforgeryToken]
[AllowAnonymous]
[Route("api/[controller]")]
[EnableCors("CorsPolicy")]
//[Authorize(Policy = CustomRoles.Admin)]
public class AdminHomeController : Controller
{
    private readonly IHomeService _homeService;
    private readonly ISliderService _sliderService;
    private readonly IDepartmentService _departmentService;
    private readonly IQuestionService _questionService;
    private readonly IAcademyService _academyService;
    private readonly IHostingEnvironment _environment;
    private readonly IWebService _webService;

    public AdminHomeController(
        IHomeService homeService,
        IHostingEnvironment environment,
        IWebService webService,
        ISliderService sliderService,
        IDepartmentService departmentService,
        IAcademyService academyService,
        IQuestionService questionService)
    {
        _homeService = homeService;
        _environment = environment;
        _webService = webService;
        _sliderService = sliderService;
        _departmentService = departmentService;
        _academyService = academyService;
        _questionService = questionService;
    }


    #region Question

    [HttpPost("[action]")]
    public Task<ResultShow2<QuestionDto>> AddOrUpdateQuestion([FromBody] QuestionDto model)
        => _questionService.AddOrUpdateQuestion(model);
    

    [HttpDelete("[action]")]
    public Task<ResultShow2<QuestionDto>> DeleteQuestion(int id) => _questionService.DeleteQuestion(id);

    #endregion


    #region Academy

    [HttpPost("[action]")]
    public async Task<ResultShow2<AcademyDto>> AddOrUpdateAcademy([FromForm] AcademyDto model)
    {
        // ایجاد مسیر فایل آپلودی 
        var fileDirectory = Path.Combine(_environment.WebRootPath, "Files\\Academy\\");
        if (!Directory.Exists(fileDirectory))
        {
            Directory.CreateDirectory(fileDirectory);
        }

        var result = await _academyService.AddOrUpdateAcademy(model);

        if (result.Status == false) return result;

        // فایل آپلود
        var files = Request.Form.Files;
        foreach (var file in files)
        {
            if (file.FileName == "picAcademy")
            {
                var fileName = "picAcademy" + GlobalRoot.randomNumer() + file.Name;
                await _webService.UploadFile(fileDirectory, fileName, file);
                await _academyService.EditAcademyPicName(fileName, result.Data.Id);
            }
        }

        return result;
    }

    [HttpDelete("[action]")]
    public Task<ResultShow2<AcademyDto>> DeleteAcademy(int id) => _academyService.DeleteAcademy(id);

    #endregion

    #region Departement

    [HttpPost("[action]")]
    public async Task<ResultShow2<DepartmentDto>> AddOrUpdateDepartment([FromForm] DepartmentDto model)
    {
        // ایجاد مسیر فایل آپلودی 
        var fileDirectory = Path.Combine(_environment.WebRootPath, "Files\\Department\\");
        if (!Directory.Exists(fileDirectory))
        {
            Directory.CreateDirectory(fileDirectory);
        }

        var result = await _departmentService.AddOrUpdateDepartment(model);

        if (result.Status == false) return result;

        // فایل آپلود
        var files = Request.Form.Files;
        foreach (var file in files)
        {
            if (file.FileName == "picDepartment")
            {
                var fileName = "picDepartment" + GlobalRoot.randomNumer() + file.Name;
                await _webService.UploadFile(fileDirectory, fileName, file);
                await _departmentService.EditDepartmentPicName(fileName, result.Data.Id);
            }
        }

        return result;
    }

    [HttpDelete("[action]")]
    public Task<ResultShow2<DepartmentDto>> DeleteDepartment(int id) => _departmentService.DeleteDepartment(id);

    #endregion

    #region Slider

    [HttpPost("[action]")]
    public async Task<ResultShow2<SliderDto>> AddOrUpdateSlider([FromForm] SliderDto model)
    {
        // ایجاد مسیر فایل آپلودی 
        var fileDirectory = Path.Combine(_environment.WebRootPath, "Files\\Slider\\");
        if (!Directory.Exists(fileDirectory))
        {
            Directory.CreateDirectory(fileDirectory);
        }

        var result = await _sliderService.AddOrUpdateSlider(model);

        if (result.Status == false) return result;

        // فایل آپلود
        var files = Request.Form.Files;
        foreach (var file in files)
        {
            if (file.FileName == "picSlider")
            {
                var fileName = "picSlider" + GlobalRoot.randomNumer() + file.Name;
                await _webService.UploadFile(fileDirectory, fileName, file);
                await _sliderService.EditSliderPicName(fileName, result.Data.Id);
            }
        }

        return result;
    }

    [HttpDelete("[action]")]
    public Task<ResultShow2<SliderDto>> DeleteSlider(int id) => _sliderService.DeleteSlider(id);

    #endregion


    #region About

    [HttpPost("[action]")]
    public async Task<ResultShow2<AboutDto>> EditAbout([FromForm] AboutDto model)
    {
        // ایجاد مسیر فایل آپلودی 
        var fileDirectory = Path.Combine(_environment.WebRootPath, "Files\\MainPage\\");
        if (!Directory.Exists(fileDirectory))
        {
            Directory.CreateDirectory(fileDirectory);
        }

        var result = await _homeService.EditAbout(model);

        if (result.Status == false) return result;

        // فایل آپلود
        var files = Request.Form.Files;
        foreach (var file in files)
        {
            if (file.FileName == "fileLogoTop")
            {
                var fileName = "fileLogoTop" + file.Name;
                await _webService.UploadFile(fileDirectory, fileName, file);
                await _homeService.EditAboutLogoTop(fileName);
            }

            if (file.FileName == "fileLogoDown")
            {
                var fileName = "fileLogoDown" + file.Name;
                await _webService.UploadFile(fileDirectory, fileName, file);
                await _homeService.EditAboutLogoDown(fileName);
            }
        }

        return result;
    }

    #endregion
}