import { enableProdMode } from '@angular/core'
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic'

import { SkModule } from './sk/sk.module'
import { environment } from '@env/environment'

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(SkModule)
  .catch(err => console.error(err));
