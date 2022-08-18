using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ASPNETCore2JwtAuthentication.DataLayer.Context;
using ASPNETCore2JwtAuthentication.DomainClasses;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;
using Models;

namespace ASPNETCore2JwtAuthentication.Services.SiteSetting;

public interface ISliderService
{
    Task EditSliderPicName(string name, int id);
    Task<ResultShow2<SliderDto>> GetSlider(int id);
    Task<ResultShow2<List<SliderDto>>> GetAllSliders(int lang);
    Task<ResultShow2<SliderDto>> AddOrUpdateSlider(SliderDto model);

    Task<ResultShow2<SliderDto>> DeleteSlider(int id);
}

public class SliderService : ISliderService
{
    private readonly IMapper _mapper;
    private readonly IUnitOfWork _uow;

    private readonly DbSet<Slider> _sliders;


    public SliderService(IMapper mapper, IUnitOfWork uow)
    {
        _uow = uow ?? throw new ArgumentNullException(nameof(uow));
        _mapper = mapper;
        _sliders = _uow.Set<Slider>();
    }

    public async Task<ResultShow2<SliderDto>> DeleteSlider(int id)
    {
        var result = new ResultShow2<SliderDto>();
        try
        {
            if (GlobalRoot.IsNullOr0(id))
                result.ValidationErrors.Add(new ValidationErrors()
                    { ErrorMessage = "آیدی نال می باشد", PropertyName = nameof(id) });


            if (result.ValidationErrors.Count > 0)
            {
                result.DataValue = ErrorName.validation;
                result.Status = false;
                return result;
            }


            var slider = await _sliders.FirstOrDefaultAsync(x => x.Id == id);
            if (slider != null)
            {
                _sliders.Remove(slider);
                await _uow.SaveChangesAsync();
            }

            result.Status = true;
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


    public async Task EditSliderPicName(string name, int id)
    {
        var slider = await _sliders.FirstOrDefaultAsync(x => x.Id == id);
        if (slider != null)
        {
            slider.PicName = name;
            slider.DateModified = DateTime.Now;
            _sliders.Update(slider);
            await _uow.SaveChangesAsync();
        }
    }


    public async Task<ResultShow2<SliderDto>> GetSlider(int id)
    {
        var result = new ResultShow2<SliderDto>();
        result.Status = true;
        result.Data = await _sliders
            .Where(x => x.Id == id)
            .ProjectTo<SliderDto>(_mapper.ConfigurationProvider)
            .AsNoTracking().FirstOrDefaultAsync();
        return result;
    }

    public async Task<ResultShow2<List<SliderDto>>> GetAllSliders(int lang)
    {
        var result = new ResultShow2<List<SliderDto>>();
        try
        {
            var linq = _sliders
                .OrderBy(x => x.Order)
                .ProjectTo<SliderDto>(_mapper.ConfigurationProvider)
                .AsNoTracking()
                .AsQueryable();

            result.Data = lang switch
            {
                3 => await linq.ToListAsync(),
                not 3 => await linq.Where(x => x.Lang == lang).ToListAsync()
            };

            result.Status = true;
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

    public async Task<ResultShow2<SliderDto>> AddOrUpdateSlider(SliderDto model)
    {
        var result = new ResultShow2<SliderDto>();
        try
        {
            if (string.IsNullOrEmpty(model.Link))
                result.ValidationErrors.Add(new ValidationErrors()
                    { ErrorMessage = "لینک را وارد کنید", PropertyName = nameof(model.Link) });

            if (string.IsNullOrEmpty(model.Name))
                result.ValidationErrors.Add(new ValidationErrors()
                    { ErrorMessage = "تایتل را وارد کنید", PropertyName = nameof(model.Name) });


            if (result.ValidationErrors.Count > 0)
            {
                result.DataValue = ErrorName.validation;
                result.Status = false;
                return result;
            }


            var slider = await _sliders.FirstOrDefaultAsync(x => x.Id == model.Id);
            // edit
            if (slider != null)
            {
                slider.Name = model.Name;
                slider.Link = model.Link;
                slider.TypeRoute = EnumTypeRoute.NewTab;
                slider.Order = model.Order;
                slider.DateModified = DateTime.Now;
                // slider.NameEn = model.NameEn;
                slider.AltAttribute = model.AltAttribute;
                // slider.AltAttributeEn = model.AltAttributeEn;
                // slider.LinkEn = model.LinkEn;

                // کاربر عکس را حذف کرده است
                if (model.PicName != slider.PicName)
                {
                    slider.PicName = string.Empty;
                }


                _sliders.Update(slider);
                await _uow.SaveChangesAsync();


                var getSlider = await GetSlider(slider.Id);
                if (getSlider.Status)
                {
                    result.Data = getSlider.Data;
                }

                result.Status = true;
                return result;
            }

            var newItem = new Slider()
            {
                Link = model.Link,
                Name = model.Name,
                // TypeRoute = model.TypeRoute,
                DateCreated = DateTime.Now,
                Order = model.Order,
                //NameEn = model.NameEn,
                AltAttribute = model.AltAttribute,
                // AltAttributeEn = model.AltAttributeEn,
                //LinkEn = model.LinkEn
                Lang = model.Lang
            };

            await _sliders.AddAsync(newItem);
            await _uow.SaveChangesAsync();

            var _getSlider = await GetSlider(newItem.Id);
            if (_getSlider.Status)
            {
                result.Data = _getSlider.Data;
            }

            result.Status = true;
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