using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ASPNETCore2JwtAuthentication.Services.SiteSetting;
using ASPNETCore2JwtAuthentication.WebApp.CustomeController;
using Microsoft.AspNetCore.Authorization;

using Microsoft.AspNetCore.Mvc;
using Models;

namespace ASPNETCore2JwtAuthentication.WebApp.Controllers;

// [Route("api/[controller]"), EnableCors("CorsPolicy"), AllowAnonymous, ]
[IgnoreAntiforgeryToken]
[AllowAnonymous]
public class HomeController : BaseController
{
    private readonly ISliderService _sliderService;
    private readonly IDepartmentService _departmentService;
    private readonly IHomeService _homeService;
    private readonly IAcademyService _academyService;
    private readonly IQuestionService _questionService;


    public HomeController(
        IHomeService homeService,
        ISliderService sliderService,
        IDepartmentService departmentService,
        IAcademyService academyService,
        IQuestionService questionService)
    {
        _homeService = homeService;
        _sliderService = sliderService;
        _departmentService = departmentService;
        _academyService = academyService;
        _questionService = questionService;
    }


    #region Question

    [HttpGet("[action]")]
    public Task<ResultShow2<QuestionDto>> GetQuestion(int id) => _questionService.GetQuestion(id);

    [HttpGet("[action]")]
    public Task<ResultShow2<List<QuestionDto>>> GetQuestions(int lang) => _questionService.GetQuestions(lang);

    #endregion


    #region Slider

    [HttpGet("[action]")]
    public Task<ResultShow2<AcademyDto>> GetAcademy(int id) => _academyService.GetAcademy(id);

    [HttpGet("[action]")]
    public async Task<ResultShow2<List<AcademyDto>>> GetAcademies(int lang)
    {
        var list = await _academyService.GetAcademies(lang);
        if (list.Status)
        {
            foreach (var item in list.Data)
            {
                if (!string.IsNullOrEmpty(item.PicName))
                {
                    item.PicName =
                        $"{this.Request.Scheme}://{this.Request.Host}{this.Request.PathBase}/{GlobalRoot.Academy}{item.PicName}";
                }
            }
        }

        return list;
    }

    #endregion

    #region Department

    [HttpGet("[action]")]
    public async Task<ResultShow2<List<DepartmentDto>>> GetAllDepartments()
    {
        var list = await _departmentService.GetAllDepartments();
        if (list.Status)
        {
            foreach (var item in list.Data.Where(item => !string.IsNullOrEmpty(item.PicName)))
            {
                item.PicName =
                    $"{this.Request.Scheme}://{this.Request.Host}{this.Request.PathBase}/{GlobalRoot.Department}{item.PicName}";
            }
        }

        return list;
    }

    #endregion

    #region Slider

    [HttpGet("[action]")]
    public Task<ResultShow2<SliderDto>> GetSlider(int id)
        => _sliderService.GetSlider(id);

    [HttpGet("[action]")]
    public async Task<ResultShow2<List<SliderDto>>> GetAllSliders(int lang)
    {
        var list = await _sliderService.GetAllSliders(lang);
        if (list.Status)
        {
            foreach (var item in list.Data)
            {
                if (!string.IsNullOrEmpty(item.PicName))
                {
                    item.PicName =
                        $"{this.Request.Scheme}://{this.Request.Host}{this.Request.PathBase}/{GlobalRoot.Slider}{item.PicName}";
                }
            }
        }

        return list;
    }

    #endregion

    #region About

    [HttpGet("[action]")]
    public async Task<ResultShow2<AboutDto>> GetAbout()
    {
        var res = await _homeService.GetAbout();
        if (res.Status == false) return res;

        if (!string.IsNullOrEmpty(res.Data.LogoTop))
        {
            res.Data.LogoTop =
                $"{this.Request.Scheme}://{this.Request.Host}{this.Request.PathBase}/{GlobalRoot.MainPage}{res.Data.LogoTop}";
        }

        if (!string.IsNullOrEmpty(res.Data.LogoDown))
        {
            res.Data.LogoDown =
                $"{this.Request.Scheme}://{this.Request.Host}{this.Request.PathBase}/{GlobalRoot.MainPage}{res.Data.LogoDown}";
        }

        return res;
    }

    #endregion
}