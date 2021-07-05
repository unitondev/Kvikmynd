using System;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using MovieSite.Application.Interfaces.Repositories;
using MovieSite.Application.Interfaces.Services;
using MovieSite.Application.Mapper;
using MovieSite.Application.Services;
using MovieSite.Domain.Models;
using MovieSite.Infrastructure;
using MovieSite.Infrastructure.Repositories;
using MovieSite.Jwt;

namespace MovieSite
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddIdentity<User, IdentityRole<Guid>>(options =>
                {
                    options.Password.RequireDigit = false;
                    options.Password.RequiredLength = 6;
                    options.Password.RequireLowercase = false;
                    options.Password.RequireUppercase = false;
                    options.Password.RequireNonAlphanumeric = false;
                })
                .AddEntityFrameworkStores<MovieSiteDbContext>()
                .AddDefaultTokenProviders();
            
            AddAuthentication(services);

            services.AddDbContext<MovieSiteDbContext>(builder => 
                builder.UseInMemoryDatabase("DatabaseName"));
            
            services.AddControllers();
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo {Title = "MovieSite.WebAPI", Version = "v1"});
            });
            services.AddTransient<DbContext, MovieSiteDbContext>();
            services.AddTransient<IUnitOfWork, UnitOfWork>();
            services.AddTransient<IUserService, UserService>();
            services.AddAutoMapper(typeof(DTOsToEntityProfile));
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseExceptionHandler("/error/error");
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "MovieSite.WebAPI v1"));
            }
            else
            {
                app.UseHsts();
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints => { endpoints.MapControllers(); });
        }

        private void AddAuthentication(IServiceCollection services)
        {
            services.AddSingleton<IJwtSigningEncodingKey, SigningSymetricKey>();
            services.AddSingleton<IJwtSigningDecodingKey, SigningSymetricKey>();

            services.AddAuthentication(options =>
                {
                    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                })
                .AddJwtBearer(JwtBearerDefaults.AuthenticationScheme, options =>
                {
                    options.SaveToken = true;
                    IJwtSigningDecodingKey signingDecodingKey = new SigningSymetricKey();
                    options.TokenValidationParameters = new TokenValidationParameters()
                    {
                        ValidateIssuer = true,
                        ValidIssuer = Configuration["Secret:Issuer"],
                        ValidateAudience = true,
                        ValidAudience = Configuration["Secret:Audience"],
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = signingDecodingKey.GetKey(),
                        ValidateLifetime = true,
                        ClockSkew = TimeSpan.Zero
                    };
                });
        }
    }
}