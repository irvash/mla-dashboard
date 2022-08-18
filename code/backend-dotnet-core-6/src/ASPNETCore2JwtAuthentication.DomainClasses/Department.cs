using System.ComponentModel.DataAnnotations;
using ASPNETCore2JwtAuthentication.DomainClasses.Common;

namespace ASPNETCore2JwtAuthentication.DomainClasses;

public class Department : BaseEntity
{
    [StringLength(200)] public string Title { get; set; }
    [StringLength(200)] public string TitleEn { get; set; }
    public string Description { get; set; }
    public string DescriptionEn { get; set; }
    public string ShortDescription { get; set; }
    public string ShortDescriptionEn { get; set; }
    public int Order { get; set; }
    [StringLength(500)] public string PicName { get; set; }
    [StringLength(500)] public string PicNameEn { get; set; }


    public string MetaDescription { get; set; }
    public string MetaKeywords { get; set; }
    public string MetaTitle { get; set; }
    
    
    public string MetaDescriptionEn { get; set; }
    public string MetaKeywordsEn { get; set; }
    public string MetaTitleEn { get; set; }
    
}