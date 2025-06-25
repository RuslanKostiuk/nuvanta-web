import {ApplicationConfig, importProvidersFrom, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {HttpClient, provideHttpClient, withInterceptors} from '@angular/common/http';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {authInterceptor} from '@shared/interceptors';
import {
  Box,
  BrushCleaning,
  Check,
  CreditCard,
  Edit,
  LogOut,
  LucideAngularModule,
  Menu,
  NotebookPen,
  OctagonX,
  Rows4
} from 'lucide-angular';

const lucideIcons = {LogOut, CreditCard, Box, Menu, Edit, NotebookPen, Rows4, BrushCleaning, Check, OctagonX};

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({eventCoalescing: true}),
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor])),
    importProvidersFrom(
      TranslateModule.forRoot({
        defaultLanguage: 'en',
        loader: {
          provide: TranslateLoader,
          useFactory: (http: HttpClient) => new TranslateHttpLoader(http, 'i18n/', '.json'),
          deps: [HttpClient],
        },
      }),
      LucideAngularModule.pick(lucideIcons),
    ),
  ],
};
