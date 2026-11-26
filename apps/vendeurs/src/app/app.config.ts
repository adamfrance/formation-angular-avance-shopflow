import { ApplicationConfig, LOCALE_ID, provideBrowserGlobalErrorListeners } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { provideRouter } from '@angular/router';
import { provideShopflow } from '@shopflow/data-access';

registerLocaleData(localeFr);

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    // Les liens de la carte produit n'ouvrent aucune page ici
    provideRouter([{ path: '**', children: [] }]),
    provideShopflow(),
    { provide: LOCALE_ID, useValue: 'fr' },
  ],
};
