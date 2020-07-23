export const environment = {
  production: true,
  msalConfig: {
    auth: {
      clientId: '26a0b8a6-5a21-43a9-a5ee-f37149972cd4',
      redirectUri: 'https://takas-auth-test.azurewebsites.net/',
      authority: 'https://login.microsoftonline.com/to19880522outlook.onmicrosoft.com/'
    }
  },
  redirectDummy: 'https://takas-auth-test.azurewebsites.net/redirect-page.html'
};
