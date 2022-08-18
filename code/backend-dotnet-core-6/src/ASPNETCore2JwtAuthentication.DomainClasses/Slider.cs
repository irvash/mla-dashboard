using System.ComponentModel.DataAnnotations;
using ASPNETCore2JwtAuthentication.DomainClasses.Common;

namespace ASPNETCore2JwtAuthentication.DomainClasses;

public class Slider : BaseEntity
{
    [StringLength(100)] public string Name { get; set; }
    
    [StringLength(500)] public string PicName { get; set; }
    [StringLength(500)] public string AltAttribute { get; set; }
    [StringLength(500)] public string Link { get; set; }
    
    public int Order { get; set; }
    public EnumTypeRoute TypeRoute { get; set; }

    public int Lang { get; set; }
    
}