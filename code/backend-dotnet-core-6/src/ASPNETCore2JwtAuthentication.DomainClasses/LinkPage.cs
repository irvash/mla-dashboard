using System.ComponentModel.DataAnnotations;
using ASPNETCore2JwtAuthentication.DomainClasses.Common;

namespace ASPNETCore2JwtAuthentication.DomainClasses;

public class LinkPage : BaseEntity
{
    [StringLength(100)] public int Name { get; set; }
    [StringLength(500)] public string Link { get; set; }
    public EnumTypeRoute TypeRoute { get; set; }
}

public enum EnumTypeRoute
{
    [Display(Name = "تب جدید")] NewTab = 1,

    [Display(Name = "در همان صفحه")] OnPage = 2
}