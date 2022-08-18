using ASPNETCore2JwtAuthentication.DomainClasses;
using AutoMapper;
using Models;

namespace ASPNETCore2JwtAuthentication.IoCConfig.CustomMapping;

public class AutoMapperProfileConfiguration : Profile
{
    public AutoMapperProfileConfiguration()
    {
        CreateMap<AboutSite, AboutDto>().ReverseMap();
        CreateMap<Slider, SliderDto>().ReverseMap();
        CreateMap<Department, DepartmentDto>().ReverseMap();
        CreateMap<Academy, AcademyDto>().ReverseMap();
        CreateMap<Question, QuestionDto>().ReverseMap();
        
    }
}