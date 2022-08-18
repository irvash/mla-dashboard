using ASPNETCore2JwtAuthentication.DomainClasses.Common;

namespace ASPNETCore2JwtAuthentication.DomainClasses;

public class AboutSite : BaseEntity
{
    public string NameSite { get; set; }
    public string NameSiteEn { get; set; }

    public string Address { get; set; }
    public string AddressEn { get; set; }

    public string Tell { get; set; }
    public string TellEn { get; set; }

    public string Email { get; set; }
    public string EmailEn { get; set; }

    public string DescriptionSite { get; set; }
    public string DescriptionSiteEn { get; set; }


    public string Instagram { get; set; }
    public string InstagramEn { get; set; }


    public string Facebook { get; set; }
    public string FacebookEn { get; set; }


    public string Telegram { get; set; }
    public string TelegramEn { get; set; }


    public string Twitter { get; set; }
    public string TwitterEn { get; set; }


    public string Youtube { get; set; }
    public string YoutubeEn { get; set; }

    public string LinkedIn { get; set; }
    public string LinkedInEn { get; set; }


    public string WhatsApp { get; set; }
    public string WhatsAppEn { get; set; }


    public string GoogleMap { get; set; }
    public string GoogleMapEn { get; set; }


    public string LogoTop { get; set; }

    public string LogoDown { get; set; }
}