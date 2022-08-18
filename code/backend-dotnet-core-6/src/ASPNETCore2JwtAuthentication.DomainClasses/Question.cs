using System.ComponentModel.DataAnnotations;
using ASPNETCore2JwtAuthentication.DomainClasses.Common;

namespace ASPNETCore2JwtAuthentication.DomainClasses;

public class Question : BaseEntity
{
    [StringLength(500)] public string Title { get; set; }
    public string Description { get; set; }
    public int Lang { get; set; }
    public int OrderShow { get; set; }
}