using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace MultApiAccessApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WeatherForecastController : ControllerBase
    {
        private static readonly string[] Summaries = new[]
        {
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };

        private readonly ILogger<WeatherForecastController> _logger;

        public WeatherForecastController(ILogger<WeatherForecastController> logger)
        {
            _logger = logger;
        }

        [HttpGet("{id}")]
        public RetData Get(string id)
        {
            if (id == "3")
            {
                Task.Delay(30000).Wait();
            }
            return new RetData { Hoge = $"Hoge-{id}", Fuga = $"Fuga-{id}" };
        }
    }

    public class RetData
    {
        public string Hoge { get; set; }
        public string Fuga { get; set; }
    }
}
