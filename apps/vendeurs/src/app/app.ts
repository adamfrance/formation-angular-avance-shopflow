import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { map } from 'rxjs';
import { ProductService } from '@shopflow/data-access';
import { ProductCard } from '@shopflow/ui';

@Component({
  selector: 'app-root',
  imports: [AsyncPipe, ProductCard],
  templateUrl: './app.html',
})
export class App {
  // Produits bientôt en rupture de stock
  protected readonly produits$ = inject(ProductService)
    .getAll()
    .pipe(map((page) => page.products.filter((p) => p.stock < 5)));
}
