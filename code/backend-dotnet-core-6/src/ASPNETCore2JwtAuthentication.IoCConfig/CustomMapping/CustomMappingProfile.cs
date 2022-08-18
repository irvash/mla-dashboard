using AutoMapper;
using System.Collections.Generic;

namespace ASPNETCore2JwtAuthentication.IoCConfig.CustomMapping;

    public class CustomMappingProfile : Profile
    {
        public CustomMappingProfile(IEnumerable<IHaveCustomMapping> haveCustomMappings)
        {
            if (haveCustomMappings != null)
                foreach (var item in haveCustomMappings)
                    item.CreateMappings(this);
        }
    }

