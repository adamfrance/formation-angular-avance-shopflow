import { Component, inject, signal } from '@angular/core';
import { form, FormField, FormRoot, required } from '@angular/forms/signals';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { AuthService } from '@shopflow/data-access';

@Component({
  selector: 'app-login',
  imports: [FormField, FormRoot],
  templateUrl: './login.html',
})
export class Login {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);
  private readonly retour = inject(ActivatedRoute).snapshot.queryParamMap.get('retour') ?? '/catalogue';

  private readonly identifiants = signal({ identifiant: '', motDePasse: '' });

  protected readonly connexion = form(
    this.identifiants,
    (champ) => {
      required(champ.identifiant, { message: "L'identifiant est obligatoire." });
      required(champ.motDePasse, { message: 'Le mot de passe est obligatoire.' });
    },
    {
      submission: {
        action: async () => {
          const { identifiant, motDePasse } = this.identifiants();
          try {
            await firstValueFrom(this.auth.login(identifiant, motDePasse));
          } catch {
            return { kind: 'connexion', message: 'Identifiant ou mot de passe incorrect.' };
          }
          await this.router.navigateByUrl(this.retour);
          return null;
        },
      },
    },
  );
}
