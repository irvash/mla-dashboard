// ReSharper disable All

using System;

namespace Models;

public static class GlobalRoot
{
    public static bool IsNullOr0(int? item)
    {
        if ((item ?? 0) == 0) // null or zero
        {
            return true;
        }

        return false;
    }

    public static bool IsNullOr0Decimal(decimal? item)
    {
        if ((item ?? 0) == 0) // null or zero
        {
            return true;
        }

        return false;
    }

    public static bool IsNullOr0Decimal(double? item)
    {
        if ((item ?? 0) == 0) // null or zero
        {
            return true;
        }

        return false;
    }

    public static bool IsValidEmail(string email)
    {
        try
        {
            var addr = new System.Net.Mail.MailAddress(email);
            return addr.Address == email;
        }
        catch
        {
            return false;
        }
    }

    public static int randomNumer()
    {
        //random number for not repeat picture
        var rnd = new Random();
        // random between 1 to 100 
        int Second = DateTime.Now.Second;
        int random = rnd.Next(1, 1000);
        random = random * (Second + 1);
        return random;
    }

    public static string MainPage => "Files/MainPage/";
    public static string Slider => "Files/Slider/";
    public static string Department => "Files/Department/";
    public static string Academy => "Files/Academy/";
    public static string Question => "Files/Question/";
}

public static class ErrorName
{
    public static string userNotFound => "userNotFound";
    public static string userpaswrong => "userpaswrong";
    public static string add => "add";
    public static string edit => "edit";
    public static string server => "server";
    public static string upload => "upload";
    public static string validation => "validation";
    public static string success => "success";

    /// <summary>
    /// تکراری
    /// </summary>
    public static string duplicate => "duplicate";

    public static string nofile => "nofile";
    public static string successEdite => "successEdite";
    public static string notfound => "notfound";
    public static string nullValue => "nullValue";
    public static string duplicateCodeMeli => "duplicateCodeMeli";
    public static string sendMessageError => "sendMessageError";
    public static string maxRequest => "maxRequest";
    public static string notAbleAccess => "notAbleAccess";
    public static string errorCalProjectPrice => "errorCalProjectPrice";
    public static string cantEdit => "cantEdit";
    public static string cantDelete => "cantDelete";
    public static string homeWebService => "homeWebService";
    public static string useI => "useI";
}