// using System.IO;
// using ASPNETCore2JwtAuthentication.DomainClasses;
// using ASPNETCore2JwtAuthentication.IoCConfig;
// using ASPNETCore2JwtAuthentication.IoCConfig.Middlewares;
// using Autofac;
// using DNTCommon.Web.Core;
// using Microsoft.AspNetCore.Builder;
// using Microsoft.AspNetCore.Hosting;
// using Microsoft.AspNetCore.Http;
// using Microsoft.Extensions.Configuration;
// using Microsoft.Extensions.DependencyInjection;
// using Microsoft.Extensions.Hosting;
//
// namespace ASPNETCore2JwtAuthentication.WebApp;
//
// public class Startup
// {
//     private readonly ApiSettings _apiSettings;
//     public IConfiguration Configuration { get; }
//
//     public Startup(IConfiguration configuration)
//     {
//         Configuration = configuration;
//
//         _apiSettings = configuration.GetSection(nameof(ApiSettings)).Get<ApiSettings>();
//     }
//
//     // This method gets called by the runtime. Use this method to add services to the container.
//     public void ConfigureServices(IServiceCollection services)
//     {
//         // services.AddMinimalMvc();
//         services.AddCustomCors();
//         services.AddDNTCommonWeb();
//         services.AddDirectoryBrowser();
//         services.AddCustomSwagger();
//         services.AddCustomOptions(Configuration);
//         services.AddCustomServices();
//         services.AddCustomDbContext(Configuration, typeof(Program).Assembly);
//         services.AddCustomJwtBearer(Configuration);
//         services.AddElmahCore(Configuration, _apiSettings);
//         services.AddCustomAntiforgery();
//     }
//     /*
//     // ConfigureContainer is where you can register things directly with Autofac. 
//     // This runs after ConfigureServices so the things ere will override registrations made in ConfigureServices.
//     // Don't build the container; that gets done for you by the factory.
//     public void ConfigureContainer(ContainerBuilder builder)
//     {
//         //Register Services to Autofac ContainerBuilder
//         builder.AddServices();
//     }*/
//
//     public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
//     {
//         if (!env.IsDevelopment())
//         {
//             app.UseHsts();
//         }
//
//         app.UseCustomExceptionHandler();
//         app.UseElmahCore(_apiSettings);
//         app.UseHttpsRedirection();
//
//
//         app.UseStatusCodePages();
//
//         app.UseCustomSwagger();
//         app.UseStaticFiles();
//
//         app.UseRouting();
//
//         app.UseAuthentication();
//
//
//         app.UseCors("CorsPolicy");
//
//         app.UseAuthorization();
//
//         app.UseEndpoints(endpoints =>
//         {
//             endpoints.MapControllerRoute(
//                 "default",
//                 "{controller=Home}/{action=Index}/{id?}");
//         });
//
//         // catch-all handler for HTML5 client routes - serve index.html
//         app.Run(async context =>
//         {
//             context.Response.ContentType = "text/html";
//             await context.Response.SendFileAsync(Path.Combine(env.WebRootPath, "index.html"));
//         });
//     }
// }