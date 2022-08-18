using AutoMapper;

namespace ASPNETCore2JwtAuthentication.IoCConfig.CustomMapping;

public interface IHaveCustomMapping
{
    void CreateMappings(Profile profile);
}