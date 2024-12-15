using Microsoft.EntityFrameworkCore;
using Backend.Data;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

// Add configuration to access appsettings.json
builder.Services.AddSingleton<IConfiguration>(builder.Configuration);

var app = builder.Build();

app.MapControllers();
app.Run();