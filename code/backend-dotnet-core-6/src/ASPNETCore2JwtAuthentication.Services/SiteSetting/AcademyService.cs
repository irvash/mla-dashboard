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



// ReSharper disable once CheckNamespace
public interface IAcademyService
{
    Task EditAcademyPicName(string name, int id);
    Task<ResultShow2<AcademyDto>> GetAcademy(int id);
    Task<ResultShow2<List<AcademyDto>>> GetAcademies(int lang);
    Task<ResultShow2<AcademyDto>> AddOrUpdateAcademy(AcademyDto model);

    Task<ResultShow2<AcademyDto>> DeleteAcademy(int id);
}

public class AcademyService : IAcademyService
{
    private readonly IMapper _mapper;
    private readonly IUnitOfWork _uow;
    private readonly DbSet<Academy> _academies;

    public AcademyService(IUnitOfWork uow, IMapper mapper)
    {
        _uow = uow ?? throw new ArgumentNullException(nameof(uow));
        _mapper = mapper;
        _academies = _uow.Set<Academy>();
    }

    public async Task EditAcademyPicName(string name, int id)
    {
        var select = await _academies.FirstOrDefaultAsync(x => x.Id == id);
        if (select != null)
        {
            select.PicName = name;
            select.DateModified = DateTime.Now;
            _academies.Update(select);
            await _uow.SaveChangesAsync();
        }
    }

    public async Task<ResultShow2<AcademyDto>> GetAcademy(int id)
    {
        var result = new ResultShow2<AcademyDto>();
        result.Status = true;
        result.Data = await _academies
            .Where(x => x.Id == id)
            .ProjectTo<AcademyDto>(_mapper.ConfigurationProvider)
            .AsNoTracking().FirstOrDefaultAsync();
        return result;
    }

    public async Task<ResultShow2<List<AcademyDto>>> GetAcademies(int lang)
    {
        var result = new ResultShow2<List<AcademyDto>>();
        try
        {
            var linq = _academies
                .OrderBy(x => x.OrderShow)
                .ProjectTo<AcademyDto>(_mapper.ConfigurationProvider)
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

    public async Task<ResultShow2<AcademyDto>> AddOrUpdateAcademy(AcademyDto model)
    {
        var result = new ResultShow2<AcademyDto>();
        try
        {
            if (string.IsNullOrEmpty(model.Name))
                result.ValidationErrors.Add(new ValidationErrors()
                    { ErrorMessage = "نام را وارد کنید", PropertyName = nameof(model.Name) });


            if (result.ValidationErrors.Count > 0)
            {
                result.DataValue = ErrorName.validation;
                result.Status = false;
                return result;
            }


            var select = await _academies.FirstOrDefaultAsync(x => x.Id == model.Id);

            // edit
            if (select != null)
            {
                select.Name = model.Name;
                select.DateModified = DateTime.Now;
                select.JobPosition = model.JobPosition;
                select.OrderShow = model.OrderShow;

                // کاربر عکس را حذف کرده است
                if (model.PicName != select.PicName)
                {
                    select.PicName = string.Empty;
                }

                _academies.Update(select);
                await _uow.SaveChangesAsync();

                var getSlider = await GetAcademy(select.Id);
                if (getSlider.Status)
                {
                    result.Data = getSlider.Data;
                }

                result.Status = true;
                return result;
            }

            var newItem = new Academy()
            {
                Name = model.Name,
                DateCreated = DateTime.Now,
                AltAttribute = model.AltAttribute,
                Lang = model.Lang,
                OrderShow = model.OrderShow,
                JobPosition = model.JobPosition
            };

            await _academies.AddAsync(newItem);
            await _uow.SaveChangesAsync();

            var _getData = await GetAcademy(newItem.Id);
            if (_getData.Status)
            {
                result.Data = _getData.Data;
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

    public async Task<ResultShow2<AcademyDto>> DeleteAcademy(int id)
    {
        var result = new ResultShow2<AcademyDto>();
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


            var slider = await _academies.FirstOrDefaultAsync(x => x.Id == id);
            if (slider != null)
            {
                _academies.Remove(slider);
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
}