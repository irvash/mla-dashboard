using System.ComponentModel.DataAnnotations;
using ASPNETCore2JwtAuthentication.DomainClasses.Common;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace ASPNETCore2JwtAuthentication.DomainClasses;

public class Academy : BaseEntity
{
    [StringLength(200)] public string Name { get; set; }
    [StringLength(500)] public string PicName { get; set; }
    public string JobPosition { get; set; }
    public int Lang { get; set; }
    public string AltAttribute { get; set; }
    public int OrderShow { get; set; }
}