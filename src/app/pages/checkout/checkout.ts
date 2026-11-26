import { Component, inject, signal } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { email, form, FormField, FormRoot, minLength, required } from '@angular/forms/signals';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { AuthService, CartService, OrderService } from '@shopflow/data-access';
import { codePostal, panierNonVide } from './validators';

@Component({
  selector: 'app-checkout',
  imports: [CurrencyPipe, FormField, FormRoot],
  templateUrl: './checkout.html',
})
export class Checkout {
  private readonly cart = inject(CartService);
  private readonly orderService = inject(OrderService);
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  protected readonly total = this.cart.total;

  private readonly commande = signal({
    nom: '',
    email: '',
    livraison: { rue: '', codePostal: '', ville: '' },
  });

  protected readonly formulaire = form(
    this.commande,
    (champ) => {
      required(champ.nom, { message: 'Le nom est obligatoire.' });
      minLength(champ.nom, 2, { message: 'Au moins 2 caractères.' });
      required(champ.email, { message: "L'e-mail est obligatoire." });
      email(champ.email, { message: 'Adresse e-mail invalide.' });
      required(champ.livraison.rue, { message: 'La rue est obligatoire.' });
      required(champ.livraison.codePostal, { message: 'Le code postal est obligatoire.' });
      codePostal(champ.livraison.codePostal);
      required(champ.livraison.ville, { message: 'La ville est obligatoire.' });
      panierNonVide(champ, this.cart);
    },
    {
      submission: {
        action: async () => {
          const { nom, livraison } = this.commande();
          console.info(`Commande de ${nom}, livraison à ${livraison.ville}`);
          const commande = await firstValueFrom(this.orderService.create(this.auth.userId ?? 1, this.cart.lignes()));
          this.cart.clear();
          await this.router.navigate(['/commande/confirmation'], { queryParams: { numero: commande.id, total: commande.total } });
          return null;
        },
      },
    },
  );
}
