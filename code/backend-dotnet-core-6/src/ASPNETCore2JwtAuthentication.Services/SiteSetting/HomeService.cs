using System;
using System.Linq;
using System.Threading.Tasks;
using ASPNETCore2JwtAuthentication.DataLayer.Context;
using ASPNETCore2JwtAuthentication.DomainClasses;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Models;

namespace ASPNETCore2JwtAuthentication.Services.SiteSetting;

public interface IHomeService
{
    Task<ResultShow2<AboutDto>> EditAbout(AboutDto model);
    Task<ResultShow2<AboutDto>> GetAbout();
    Task EditAboutLogoDown(string logoDown);
    Task EditAboutLogoTop(string logoTop);
}

public class HomeService : IHomeService
{
    private readonly IMapper _mapper;
    private readonly IUnitOfWork _uow;

    private readonly DbSet<AboutSite> _aboutSites;

    public HomeService(IMapper mapper, IUnitOfWork uow)
    {
        _uow = uow ?? throw new ArgumentNullException(nameof(uow));
        _aboutSites = _uow.Set<AboutSite>();
        _mapper = mapper;
    }


    public async Task EditAboutLogoDown(string logoDown)
    {
        var about = _aboutSites.FirstOrDefault();
        // if (about == null) return null;
        if (about != null)
        {
            about.LogoDown = logoDown;
            about.DateModified = DateTime.Now;
            _aboutSites.Update(about);
            await _uow.SaveChangesAsync();
        }
    }

    public async Task EditAboutLogoTop(string logoTop)
    {
        var about = _aboutSites.FirstOrDefault();
        // if (about == null) return null;
        if (about != null)
        {
            about.LogoTop = logoTop;
            about.DateModified = DateTime.Now;
            _aboutSites.Update(about);
            await _uow.SaveChangesAsync();
        }
    }

    public async Task<ResultShow2<AboutDto>> EditAbout(AboutDto model)
    {
        var result = new ResultShow2<AboutDto>();
        try
        {
            var about = await _aboutSites.FirstOrDefaultAsync();
            if (about == null) return null;

            about.NameSite = model.NameSite;
            about.NameSiteEn = model.NameSiteEn;
            about.Address = model.Address;
            about.AddressEn = model.AddressEn;
            about.Tell = model.Tell;
            about.TellEn = model.TellEn;
            about.Email = model.Email;
            about.EmailEn = model.EmailEn;
            about.DescriptionSite = model.DescriptionSite;
            about.DescriptionSiteEn = model.DescriptionSiteEn;
            about.Instagram = model.Instagram;
            about.InstagramEn = model.InstagramEn;
            about.Facebook = model.Facebook;
            about.FacebookEn = model.FacebookEn;
            about.Telegram = model.Telegram;
            about.TelegramEn = model.TelegramEn;
            about.Twitter = model.Twitter;
            about.TwitterEn = model.TwitterEn;
            about.Youtube = model.Youtube;
            about.YoutubeEn = model.YoutubeEn;
            about.LinkedIn = model.LinkedIn;
            about.LinkedInEn = model.LinkedInEn;
            about.WhatsApp = model.WhatsApp;
            about.WhatsAppEn = model.WhatsAppEn;

            about.GoogleMap = model.GoogleMap;
            about.GoogleMapEn = model.GoogleMapEn;


            about.DateModified = DateTime.Now;

            _aboutSites.Update(about);
            await _uow.SaveChangesAsync();
            result.Status = true;
            var get = await GetAbout();
            if (get.Status)
            {
                result.Data = get.Data;
            }

            return result;
        }
        catch (Exception e)
        {
            result.Status = false;
            result.Message = e.ToString();
            result.DataValue = ErrorName.server;
            return result;
        }
    }


    public async Task<ResultShow2<AboutDto>> GetAbout()
    {
        var result = new ResultShow2<AboutDto>();
        try
        {
            var about = await _aboutSites.FirstOrDefaultAsync();
            if (about != null)
            {
                var map = _mapper.Map<AboutDto>(about);
                result.Data = map;
                result.Status = true;
                return result;
            }

            result.Status = false;
            result.DataValue = ErrorName.notfound;
            return result;
        }
        catch (Exception e)
        {
            result.Status = false;
            result.Message = e.ToString();
            result.DataValue = ErrorName.server;
            return result;
        }
    }
}