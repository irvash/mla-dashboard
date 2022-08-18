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
public interface IQuestionService
{
    Task<ResultShow2<QuestionDto>> GetQuestion(int id);
    Task<ResultShow2<List<QuestionDto>>> GetQuestions(int lang);
    Task<ResultShow2<QuestionDto>> AddOrUpdateQuestion(QuestionDto model);

    Task<ResultShow2<QuestionDto>> DeleteQuestion(int id);
}

public class QuestionService : IQuestionService
{
    private readonly IMapper _mapper;
    private readonly IUnitOfWork _uow;
    private readonly DbSet<Question> _questions;

    public QuestionService(IUnitOfWork uow, IMapper mapper)
    {
        _uow = uow ?? throw new ArgumentNullException(nameof(uow));
        _mapper = mapper;
        _questions = _uow.Set<Question>();
    }


    public async Task<ResultShow2<QuestionDto>> GetQuestion(int id)
    {
        var result = new ResultShow2<QuestionDto>();
        result.Status = true;
        result.Data = await _questions
            .Where(x => x.Id == id)
            .ProjectTo<QuestionDto>(_mapper.ConfigurationProvider)
            .AsNoTracking().FirstOrDefaultAsync();
        return result;
    }

    public async Task<ResultShow2<List<QuestionDto>>> GetQuestions(int lang)
    {
        var result = new ResultShow2<List<QuestionDto>>();
        try
        {
            var linq = _questions
                .OrderBy(x => x.OrderShow)
                .ProjectTo<QuestionDto>(_mapper.ConfigurationProvider)
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

    public async Task<ResultShow2<QuestionDto>> AddOrUpdateQuestion(QuestionDto model)
    {
        var result = new ResultShow2<QuestionDto>();
        try
        {
            if (string.IsNullOrEmpty(model.Title))
                result.ValidationErrors.Add(new ValidationErrors()
                    { ErrorMessage = "تایتل را وارد کنید", PropertyName = nameof(model.Title) });


            if (result.ValidationErrors.Count > 0)
            {
                result.DataValue = ErrorName.validation;
                result.Status = false;
                return result;
            }


            var select = await _questions.FirstOrDefaultAsync(x => x.Id == model.Id);

            // edit
            if (select != null)
            {
                select.Title = model.Title;
                select.Description = model.Description;
                select.DateModified = DateTime.Now;
                select.OrderShow = model.OrderShow;


                _questions.Update(select);
                await _uow.SaveChangesAsync();

                var getSlider = await GetQuestion(select.Id);
                if (getSlider.Status)
                {
                    result.Data = getSlider.Data;
                }

                result.Status = true;
                return result;
            }

            var newItem = new Question()
            {
                Title = model.Title,
                DateCreated = DateTime.Now,
                Lang = model.Lang,
                OrderShow = model.OrderShow,
                Description = model.Description
            };

            await _questions.AddAsync(newItem);
            await _uow.SaveChangesAsync();

            var _getData = await GetQuestion(newItem.Id);
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

    public async Task<ResultShow2<QuestionDto>> DeleteQuestion(int id)
    {
        var result = new ResultShow2<QuestionDto>();
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


            var slider = await _questions.FirstOrDefaultAsync(x => x.Id == id);
            if (slider != null)
            {
                _questions.Remove(slider);
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