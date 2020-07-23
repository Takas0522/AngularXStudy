import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { RedirectDummyModule } from './app/redirect-dummy/redirect-dummy.module';

if (environment.production) {
  enableProdMode();
}

if (window !== window.parent && !window.opener) {
  console.log('RED')
  platformBrowserDynamic().bootstrapModule(RedirectDummyModule)
    .catch(err => console.error(err));
} else {
  console.log('APP')
  platformBrowserDynamic().bootstrapModule(AppModule)
    .catch(err => console.error(err));
}

