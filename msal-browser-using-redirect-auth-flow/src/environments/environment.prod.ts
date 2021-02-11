export const environment = {
  production: true,
  msalConfig: {
    auth: {
      clientId: '63fa356b-a751-43ae-8a9d-8e71030ee30a',
      authority: 'https://login.microsoftonline.com/028db01b-7420-42ce-ba2e-6efb6ac11c10'
    }
  },
  adalConfig: {
    tenant: '028db01b-7420-42ce-ba2e-6efb6ac11c10',
    clientId: '439ac490-062a-4e72-aadc-edba537a4381'
  },
  targetScopes: [
    'user.read',
    'api://b467f2f1-a6b7-4656-88fe-5f334d95d656/api'
  ]
};
