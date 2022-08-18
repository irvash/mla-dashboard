using System;

namespace ASPNETCore2JwtAuthentication.DomainClasses.Common;



public abstract class BaseEntity<TKey> : IEntity<TKey>
{
    public TKey Id { get; set; }
}

public abstract class BaseEntity : BaseEntity<int>
{
    public int? UserCreatedId { get; set; }
    public int? UserModifiedId { get; set; }


    public DateTime? DateCreated { get; set; }
    public DateTime? DateModified { get; set; }
}