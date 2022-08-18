using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using ASPNETCore2JwtAuthentication.DataLayer.Context;
using ASPNETCore2JwtAuthentication.DomainClasses;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Models;
using System.Linq;
using AutoMapper.QueryableExtensions;

namespace ASPNETCore2JwtAuthentication.Services.SiteSetting;

public interface IDepartmentService
{
    Task EditDepartmentPicName(string name, int id);
    Task<ResultShow2<DepartmentDto>> GetDepartment(int id);
    Task<ResultShow2<List<DepartmentDto>>> GetAllDepartments();
    Task<ResultShow2<DepartmentDto>> AddOrUpdateDepartment(DepartmentDto model);

    Task<ResultShow2<DepartmentDto>> DeleteDepartment(int id);
}

public class DepartmentService : IDepartmentService
{
    private readonly IMapper _mapper;
    private readonly IUnitOfWork _uow;

    private readonly DbSet<Department> _departments;


    public DepartmentService(IMapper mapper, IUnitOfWork uow)
    {
        _uow = uow ?? throw new ArgumentNullException(nameof(uow));
        _mapper = mapper;
        _departments = _uow.Set<Department>();
    }

    public async Task EditDepartmentPicName(string name, int id)
    {
        var slider = await _departments.FirstOrDefaultAsync(x => x.Id == id);
        if (slider != null)
        {
            slider.PicName = name;
            slider.DateModified = DateTime.Now;
            _departments.Update(slider);
            await _uow.SaveChangesAsync();
        }
    }

    public async Task<ResultShow2<DepartmentDto>> GetDepartment(int id)
    {
        var result = new ResultShow2<DepartmentDto>();
        try
        {
            result.Data = await _departments
                .OrderBy(x => x.Id)
                .ProjectTo<DepartmentDto>(_mapper.ConfigurationProvider)
                .AsNoTracking().FirstOrDefaultAsync();
            
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

    public async Task<ResultShow2<List<DepartmentDto>>> GetAllDepartments()
    {
        var result = new ResultShow2<List<DepartmentDto>>();
        try
        {
            result.Status = true;
            result.Data = await _departments
                .OrderBy(x => x.Order)
                .ProjectTo<DepartmentDto>(_mapper.ConfigurationProvider)
                .AsNoTracking().ToListAsync();

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

    public async Task<ResultShow2<DepartmentDto>> AddOrUpdateDepartment(DepartmentDto model)
    {
        var result = new ResultShow2<DepartmentDto>();
        try
        {
            if (string.IsNullOrEmpty(model.Title))
                result.ValidationErrors.Add(new ValidationErrors()
                    { ErrorMessage = "تایتل را وارد کنید", PropertyName = nameof(model.Title) });


            if (string.IsNullOrEmpty(model.ShortDescription))
                result.ValidationErrors.Add(new ValidationErrors()
                    { ErrorMessage = "توضیحات کوتاه را وارد کنید", PropertyName = nameof(model.ShortDescription) });


            if (result.ValidationErrors.Count > 0)
            {
                result.DataValue = ErrorName.validation;
                result.Status = false;
                return result;
            }


            var select = await _departments.FirstOrDefaultAsync(x => x.Id == model.Id);
            // edit
            if (select != null)
            {
                select.Title = model.Title;
                select.TitleEn = model.TitleEn;
                select.Description = model.Description;
                select.DescriptionEn = model.DescriptionEn;
                select.ShortDescriptionEn = model.ShortDescriptionEn;
                select.ShortDescription = model.ShortDescription;
                select.Order = model.Order;
                select.DateModified = DateTime.Now;

                // کاربر عکس را حذف کرده است
                if (model.PicName != select.PicName)
                {
                    select.PicName = string.Empty;
                }

                _departments.Update(select);
                await _uow.SaveChangesAsync();


                var get = await GetDepartment(select.Id);
                if (get.Status)
                {
                    result.Data = get.Data;
                }

                result.Status = true;
                return result;
            }

            // new
            var newItem = new Department();
            newItem.Title = model.Title;
            newItem.TitleEn = model.TitleEn;
            newItem.Description = model.Description;
            newItem.DescriptionEn = model.DescriptionEn;
            newItem.ShortDescriptionEn = model.ShortDescriptionEn;
            newItem.ShortDescription = model.ShortDescription;
            newItem.DateCreated = DateTime.Now;

            await _departments.AddAsync(newItem);
            await _uow.SaveChangesAsync();

            var _get = await GetDepartment(newItem.Id);
            if (_get.Status)
            {
                result.Data = _get.Data;
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

    public async Task<ResultShow2<DepartmentDto>> DeleteDepartment(int id)
    {
        var result = new ResultShow2<DepartmentDto>();
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


            var slider = await _departments.FirstOrDefaultAsync(x => x.Id == id);
            if (slider != null)
            {
                _departments.Remove(slider);
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