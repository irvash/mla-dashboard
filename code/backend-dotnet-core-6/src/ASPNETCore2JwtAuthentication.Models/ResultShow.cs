using System;
using System.Collections.Generic;
using ElmahCore;

namespace Models;

public class ResultShow
{
    public ResultShow()
    {
        Errors = new List<string>();
        ValidationErrors = new List<ValidationErrors>();
    }
        
        
    /// <summary>
    ///     مقدار
    /// </summary>
    public string DataValue { get; set; }

    private string _message { get; set; }

    /// <summary>
    /// پیام خطا یا پیام هشدار
    /// </summary>
    public string Message
    {
        get => _message;
        set
        {
            _message = value;
            ElmahExtensions.RiseError(new Exception(value));
            // HttpContext.RiseError();
        }
    }

    /// <summary>
    /// وضعیت موفق آمیز بودن
    /// </summary>
    public bool Status { get; set; }

    /// <summary>
    /// آبجکت خروجی
    /// </summary>
    public object DataValueObject { get; set; }
        
    public List<string> Errors { get; set; }
        
    public List<ValidationErrors> ValidationErrors { get; set; }
}

public class ResultShow<T>
    {
        public ResultShow()
        {
            Errors = new List<string>();
        }

        public string ErrorType { get; set; }
        
        /// <summary>
        /// پیام خطا یا پیام هشدار
        /// </summary>
        public string Message { get; set; }

        /// <summary>
        /// وضعیت موفق آمیز بودن
        /// </summary>
        /// 

        public bool Status { get; set; }


        /// <summary>
        /// آبجکت خروجی
        /// </summary>
        public T Data { get; set; }

        public List<string> Errors { get; set; }
    }

    public class ResultShow2<T>
    {
        public ResultShow2()
        {
            Errors = new List<string>();
            ValidationErrors = new List<ValidationErrors>();
        }
        
       

        /// <summary>
        ///     مقدار
        /// </summary>
        public string DataValue { get; set; }

         private string _message { get; set; }

        /// <summary>
        /// پیام خطا یا پیام هشدار
        /// </summary>
        public string Message
         {
             get => _message;
             set
             {
                 _message = value; 
                 ElmahExtensions.RiseError(new Exception(value));
                 // HttpContext.RiseError();
             }
         }


        /// <summary>
        /// وضعیت موفق آمیز بودن
        /// </summary>
        /// 
        public bool Status { get; set; }

        /// <summary>
        ///     شی از کلاس
        /// </summary>
        public T Data { get; set; }

        public List<string> Errors { get; set; }
        public List<ValidationErrors> ValidationErrors { get; set; }
    }

    public class ValidationErrors
    {
        private string _propertyName;
        public string ErrorMessage { get; set; }

        public string PropertyName
        {
            get => _propertyName;
            set => _propertyName = value.ToCamelCase();
        }
    }

    public static class StringExtension
    {
        public static string ToCamelCase(this string str)
        {
            if (!string.IsNullOrEmpty(str) && str.Length > 1) return char.ToLowerInvariant(str[0]) + str.Substring(1);

            return str;
        }
    }
