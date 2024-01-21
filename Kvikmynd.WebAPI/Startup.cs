using System;
using System.Text;
using Kvikmynd.Application.Common.Models;
using Kvikmynd.Application.Interfaces.Repositories;
using Kvikmynd.Application.Interfaces.Services;
using Kvikmynd.Application.Services;
using Kvikmynd.Domain.Models;
using Kvikmynd.Hubs;
using Kvikmynd.Infrastructure.Shared;
using Kvikmynd.Infrastructure.Shared.Repositories;
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
using Newtonsoft.Json;

namespace Kvikmynd
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
            services.AddCors(options => 
                options.AddPolicy("CorsPolicy", builder =>
                {
                    builder.SetIsOriginAllowed(s => true);
                    builder.AllowAnyHeader();
                    builder.AllowAnyMethod();
                    builder.AllowCredentials();
                }));
            
            services.AddSignalR();
            services.AddIdentity<User, ApplicationRole>(options =>
                {
                    options.Password.RequireDigit = false;
                    options.Password.RequiredLength = 6;
                    options.Password.RequireLowercase = false;
                    options.Password.RequireUppercase = false;
                    options.Password.RequireNonAlphanumeric = false;
                })
                .AddEntityFrameworkStores<KvikmyndDbContext>()
                .AddDefaultTokenProviders();

            services.ConfigureApplicationCookie(config =>
            {
                config.LoginPath = "/login";
            });
            
            services.Configure<SendGridSettings>(Configuration.GetSection(nameof(SendGridSettings)));
            services.Configure<FirebaseSettings>(Configuration.GetSection(nameof(FirebaseSettings)));

            #region Authentication and authorization

            services.Configure<JwtSettings>(Configuration.GetSection(nameof(JwtSettings)));
            var jwtSettings = Configuration.GetSection(nameof(JwtSettings)).Get<JwtSettings>();

            services.AddAuthentication(options =>
                {
                    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                    options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
                })
                .AddJwtBearer(JwtBearerDefaults.AuthenticationScheme, options =>
                {
                    options.SaveToken = true;
                    options.TokenValidationParameters = new TokenValidationParameters()
                    {
                        ValidateIssuer = true,
                        ValidIssuer = jwtSettings.Issuer,
                        ValidateAudience = true,
                        ValidAudience = jwtSettings.Audience,
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSettings.Key)),
                        ValidateLifetime = true,
                        ClockSkew = TimeSpan.Zero
                    };
                });

            services.AddAuthorization();
            
            #endregion
            
            services.AddControllers()
                .AddNewtonsoftJson(options =>
                {
                    options.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;
                });
            
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v2", new OpenApiInfo {Title = "Kvikmynd.WebAPI", Version = "v2"});
            });

            #region Database and repositories

            services.AddDbContext<KvikmyndDbContext>(builder => 
                builder.UseSqlServer(Configuration.GetConnectionString("SqlServer"), optionsBuilder =>
                {
                    optionsBuilder.MigrationsAssembly("Kvikmynd.Infrastructure.SqlServer");
                }));

            // services.AddDbContext<KvikmyndDbContext>(builder =>
            //     builder.UseNpgsql(Configuration.GetConnectionString("PostgreSQL"), optionsBuilder =>
            //     {
            //         optionsBuilder.MigrationsAssembly("Kvikmynd.Infrastructure.PostgreSQL");
            //     }));

            services.AddScoped<DbContext, KvikmyndDbContext>();
            services.AddScoped<IUnitOfWork, UnitOfWork>();
            services.AddScoped(typeof(IRepository<>), typeof(GenericRepository<>));

            #endregion
            
            #region Services

            services.AddScoped(typeof(IService<>), typeof(GenericService<>));
            services.AddScoped<IAccountService, AccountService>();
            services.AddScoped<IMovieService, MovieService>();
            services.AddScoped<IRatingService, RatingService>();
            services.AddScoped<IEmailService, SendGridEmailService>();
            services.AddSingleton<ITokenService, TokenService>();
            services.AddScoped(typeof(SeedService));
            services.AddScoped<IFileUploadService, FileUploadService>();
            services.AddScoped<ISubscriptionService, SubscriptionService>();

            #endregion

            services.AddHttpContextAccessor();
            
            services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());;
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v2/swagger.json", "Kvikmynd.WebAPI v2"));
            }
            else
            {
                app.UseHsts();
            }

            app.UseCors("CorsPolicy");
            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapHub<SignalRHub>("/moviePage");
                endpoints.MapControllers();
            });
        }
    }
}