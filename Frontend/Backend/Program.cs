using Microsoft.EntityFrameworkCore;
using Backend.Data;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigins", policy =>
    {
        policy.WithOrigins("https://example.com").AllowAnyHeader().AllowAnyMethod();
    });

    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()                 // Allow all origins
              .AllowAnyHeader()                 // Allow any headers
              .AllowAnyMethod();                // Allow any HTTP methods
    });
});

builder.Services.AddControllers();

// Add configuration to access appsettings.json
builder.Services.AddSingleton<IConfiguration>(builder.Configuration);

var app = builder.Build();

app.UseCors("AllowAll");

app.MapControllers();
app.Run();