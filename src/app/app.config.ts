import {ApplicationConfig, importProvidersFrom, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {HttpClient, provideHttpClient, withInterceptors} from '@angular/common/http';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {authInterceptor} from '@shared/interceptors';
import {FileText, Folders, LayoutDashboard, LogOut, LucideAngularModule, Package, Receipt, Users} from 'lucide-angular';

const lucideIcons = {LogOut, LayoutDashboard, Package, Folders, FileText, Receipt, Users}

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({eventCoalescing: true}), provideRouter(routes), provideHttpClient(withInterceptors([authInterceptor])),
    importProvidersFrom(
      TranslateModule.forRoot({
        defaultLanguage: 'ua',
        loader: {
          provide: TranslateLoader,
          useFactory: (http: HttpClient) => new TranslateHttpLoader(http, 'i18n/', '.json'),
          deps: [HttpClient]
        }
      }),
      LucideAngularModule.pick(lucideIcons)
    )
  ],
};
