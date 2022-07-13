1. [Run SignalR Emurator](https://github.com/Azure/azure-signalr/blob/dev/docs/emulator.md)
2. Run `func start` in `functions` directory
3. Run `ng s -o` in `front` directory
4. `POST` message to `http://localhost:7071/api/sendmessage`
``` json
body e.g.
{"name": "hoge", "value": "fuga" }
```

`localsetting.json` settings e.g.

``` json
{
  "IsEncrypted": false,
  "Values": {
    "AzureWebJobsStorage": "UseDevelopmentStorage=true",
    "FUNCTIONS_WORKER_RUNTIME": "dotnet",
    "SignalRConnection": "<SignalR Emurator's ConnectionString>",
    "SignalRHubName": "notifications"
  },
  "Host": {
    "CORS": "*"
  }
}
```