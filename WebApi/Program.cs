using WebApi.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddSingleton<ITokenProvider, TokenProvider>();

var app = builder.Build();

app.MapGet("/api/developerToken", Response (ITokenProvider tokenProvider) => new(tokenProvider.Token));

app.Run();


internal record Response(string DeveloperToken);