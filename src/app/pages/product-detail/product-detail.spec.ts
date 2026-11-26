import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Product } from '@shopflow/models';
import { ProductDetail } from './product-detail';

describe('ProductDetail', () => {
  it('affiche le même prix que la carte du catalogue (prix remisé)', async () => {
    await TestBed.configureTestingModule({ imports: [ProductDetail], providers: [provideRouter([])] }).compileComponents();
    const fixture = TestBed.createComponent(ProductDetail);
    const produit = { id: 7, title: 'Lampe', category: 'furniture', price: 50, discountPercentage: 10, rating: 4.5, stock: 3, description: '', thumbnail: 'https://exemple.test/lampe.webp', reviews: [] } as unknown as Product;
    fixture.componentRef.setInput('produit', produit);
    await fixture.whenStable();
    const prix: string = fixture.nativeElement.querySelector('.detail-prix').textContent;
    expect(prix).toContain('€45.00');
  });
});
