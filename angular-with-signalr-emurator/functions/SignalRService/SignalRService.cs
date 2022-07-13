using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using Microsoft.Azure.WebJobs.Extensions.SignalRService;
using System.Collections.Generic;

namespace SignalRService
{
    public static class SignalRService
    {
        [FunctionName("negotiate")]
        public static SignalRConnectionInfo Negotiate(
            [HttpTrigger(AuthorizationLevel.Anonymous)] HttpRequest req,
            [SignalRConnectionInfo(HubName = "%SignalRHubName%", ConnectionStringSetting = "SignalRConnection")] SignalRConnectionInfo connectionInfo)
        {
            return connectionInfo;
        }

        [FunctionName("sendmessage")]
        public static async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Function, "get", "post", Route = null)] HttpRequest req,
             [SignalR(HubName = "%SignalRHubName%", ConnectionStringSetting = "SignalRConnection")] IAsyncCollector<SignalRMessage> signalRMessageCollector,
            ILogger log)
        {
            log.LogInformation("C# HTTP trigger function processed a request.");

            string requestBody = await new StreamReader(req.Body).ReadToEndAsync();
            Notification data = JsonConvert.DeserializeObject<Notification>(requestBody);
            var retData = new List<Notification> { data };

            await signalRMessageCollector.AddAsync(new SignalRMessage
            {
                Target = "notifications",
                Arguments = retData.ToArray()
            });

            return new OkObjectResult(null);
        }
    }

    public class Notification
    {
        public string name { get; set; }
        public string value { get; set; }
    }
}
