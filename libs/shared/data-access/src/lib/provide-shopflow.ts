import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './services/auth-interceptor';

/**
 * Tout ce dont les services de ShopFlow ont besoin pour fonctionner : client HTTP et ajout du jeton.
 *
 * Une application qui utilise `@shopflow/data-access` appelle `provideShopflow()` dans sa configuration.
 */
export function provideShopflow(): EnvironmentProviders {
  return makeEnvironmentProviders([
    provideHttpClient(withInterceptors([authInterceptor])),
  ]);
}
