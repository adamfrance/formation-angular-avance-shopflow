import { Component, inject, signal } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { ProductService } from '@shopflow/data-access';
import { Quantite } from '@shopflow/ui';
import { CHAMPS_PRODUIT, ChampProduit } from './champs-produit';

function validateurs(champ: ChampProduit): ValidatorFn[] {
  const liste: ValidatorFn[] = [];
  if (champ.requis) liste.push(Validators.required);
  if (champ.min !== undefined) liste.push(Validators.min(champ.min));
  return liste;
}

function construire(champs: ChampProduit[]): FormGroup<Record<string, FormControl<string | number>>> {
  const controles: Record<string, FormControl<string | number>> = {};
  for (const champ of champs) {
    const initiale = champ.type === 'nombre' || champ.type === 'quantite' ? 0 : '';
    controles[champ.cle] = new FormControl<string | number>(initiale, { nonNullable: true, validators: validateurs(champ) });
  }
  return new FormGroup(controles);
}

@Component({
  selector: 'app-product-form',
  imports: [Quantite, ReactiveFormsModule],
  templateUrl: './product-form.html',
})
export class ProductForm {
  private readonly productService = inject(ProductService);
  protected readonly champs = CHAMPS_PRODUIT;
  protected readonly formulaire = construire(this.champs);
  protected readonly tags = new FormArray<FormControl<string>>([]);
  protected readonly cree = signal<string | null>(null);

  protected ajouterTag(): void {
    this.tags.push(new FormControl('', { nonNullable: true, validators: Validators.required }));
  }

  protected retirerTag(index: number): void {
    this.tags.removeAt(index);
  }

  protected enregistrer(): void {
    if (this.formulaire.invalid || this.tags.invalid) {
      this.formulaire.markAllAsTouched();
      this.tags.markAllAsTouched();
      return;
    }
    const produit = { ...this.formulaire.getRawValue(), tags: this.tags.getRawValue() };
    this.productService.add(produit).subscribe((reponse) => {
      this.cree.set(`Produit n° ${reponse.id} créé : ${reponse.title}`);
      this.formulaire.reset();
      this.tags.clear();
    });
  }
}
