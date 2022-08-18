namespace ASPNETCore2JwtAuthentication.DomainClasses.Common;

public interface IEntity
{
}

public interface IEntity<TKey> : IEntity
{
    TKey Id { get; set; }
}