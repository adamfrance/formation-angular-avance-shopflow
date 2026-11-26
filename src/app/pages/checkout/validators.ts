import { SchemaPath, validate } from '@angular/forms/signals';
import { CartService } from '@shopflow/data-access';

/** Code postal français : cinq chiffres. Un champ vide est laissé à required(). */
export function codePostal(champ: SchemaPath<string>): void {
  validate(champ, ({ value }) => {
    const valeur = value();
    if (!valeur) {
      return null;
    }
    return /^\d{5}$/.test(valeur) ? null : { kind: 'codePostal', message: 'Cinq chiffres, par exemple 59200.' };
  });
}

/** Erreur « panierVide » sur le formulaire entier si le panier ne contient rien. */
export function panierNonVide(formulaire: SchemaPath<unknown>, panier: CartService): void {
  validate(formulaire, () =>
    panier.lignes().length > 0 ? null : { kind: 'panierVide', message: 'Votre panier est vide : ajoutez au moins un produit.' },
  );
}
