import { Component, forwardRef, signal } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

/**
 * Sélecteur de quantité (− valeur +), utilisable comme n'importe quel champ de formulaire :
 * `formControlName`, `formControl` ou `ngModel`.
 */
@Component({
  selector: 'sf-quantite',
  template: `
    <span class="quantite">
      <button class="bouton-icone" type="button" (click)="changer(-1)" [disabled]="desactive() || valeur() <= 0" aria-label="Diminuer">−</button>
      <span class="quantite-valeur">{{ valeur() }}</span>
      <button class="bouton-icone" type="button" (click)="changer(1)" [disabled]="desactive()" aria-label="Augmenter">+</button>
    </span>
  `,
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => Quantite), multi: true }],
})
export class Quantite implements ControlValueAccessor {
  protected readonly valeur = signal(0);
  protected readonly desactive = signal(false);
  private auChangement: (v: number) => void = () => undefined;
  private auToucher: () => void = () => undefined;

  writeValue(v: number | null): void {
    this.valeur.set(v ?? 0);
  }

  registerOnChange(fn: (v: number) => void): void {
    this.auChangement = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.auToucher = fn;
  }

  setDisabledState(desactive: boolean): void {
    this.desactive.set(desactive);
  }

  protected changer(delta: number): void {
    this.valeur.update((v) => Math.max(0, v + delta));
    this.auChangement(this.valeur());
    this.auToucher();
  }
}
