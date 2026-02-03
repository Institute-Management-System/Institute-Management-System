using Microsoft.AspNetCore.Mvc;
using System.Text.Json;
using System.Threading;

// Global lock object
var fileLock = new SemaphoreSlim(1, 1);

var builder = WebApplication.CreateBuilder(args);

// Add CORS to allow calls from React (3000/5173) and Spring Boot (8080)
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        policy =>
        {
            policy.AllowAnyOrigin()
                  .AllowAnyMethod()
                  .AllowAnyHeader();
        });
});

var app = builder.Build();

app.UseCors("AllowAll");

// Define Log Model
app.MapPost("/api/log", async ([FromBody] LogEntry log) =>
{
    var logMessage = $"[{DateTime.Now:yyyy-MM-dd HH:mm:ss}] [{log.source}] [{log.level}] {log.message}{Environment.NewLine}";
    
    // Append to file asynchronously
    // Append to file safely
    await fileLock.WaitAsync();
    try
    {
        await File.AppendAllTextAsync("log.txt", logMessage);
    }
    finally
    {
        fileLock.Release();
    }
    
    return Results.Ok(new { status = "Logged" });
});

app.Run("http://localhost:5000");

// Record type for incoming JSON
record LogEntry(string source, string level, string message);
