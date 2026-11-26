import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, provideRouter, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from '@shopflow/data-access';
import { authGuard } from './auth-guard';

describe('authGuard', () => {
  const lancer = (token: string | null) => {
    TestBed.configureTestingModule({
      providers: [provideRouter([]), { provide: AuthService, useValue: { token } }],
    });
    return TestBed.runInInjectionContext(() =>
      authGuard({} as ActivatedRouteSnapshot, { url: '/mes-commandes' } as RouterStateSnapshot),
    );
  };

  it('laisse passer un utilisateur connecté', () => {
    expect(lancer('jeton')).toBeTrue();
  });

  it('redirige vers la connexion en mémorisant la page demandée', () => {
    const resultat = lancer(null) as UrlTree;
    expect(TestBed.inject(Router).serializeUrl(resultat)).toBe('/connexion?retour=%2Fmes-commandes');
  });
});
