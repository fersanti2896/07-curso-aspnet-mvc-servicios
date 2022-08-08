using Dominio.IServicios;
using Microsoft.EntityFrameworkCore;
using Persistencia.Context;
using Servicios.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllersWithViews();

var connectionString = builder.Configuration.GetConnectionString("Conexion");

builder.Services.AddDbContext<ApplicationDbContext>(
                    opciones => { opciones.UseSqlServer( connectionString ); }
                 );

builder.Services.AddScoped<IConsultaGraficaService, ConsultaGraficaService>();

var app = builder.Build();
// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
}
app.UseStaticFiles();

app.UseRouting();

app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}");

app.Run();
