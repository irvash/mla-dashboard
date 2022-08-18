using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using ASPNETCore2JwtAuthentication.DomainClasses;

namespace Models;

public class SliderDto 
{
    public int Id { get; set; }
    public string Name { get; set; }
    // public string NameEn { get; set; }
    public string PicName { get; set; }
    public string Link { get; set; }

    public EnumTypeRoute TypeRoute { get; set; }
    public int Order { get; set; }
    
    public string AltAttribute { get; set; }
    
    
    // public string PicNameEn { get; set; }
    // public string AltAttributeEn { get; set; }
    // public string LinkEn { get; set; }

    public int Lang { get; set; }
    
}