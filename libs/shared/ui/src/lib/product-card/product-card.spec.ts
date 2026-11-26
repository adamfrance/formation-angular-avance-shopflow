import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Product } from '@shopflow/models';
import { ProductCard } from './product-card';

describe('ProductCard', () => {
  let fixture: ComponentFixture<ProductCard>;
  const produit = { id: 7, title: 'Lampe', category: 'furniture', price: 50, discountPercentage: 10, rating: 4.5, thumbnail: 'https://exemple.test/lampe.webp' } as Product;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductCard],
      providers: [provideRouter([])],
    }).compileComponents();
    fixture = TestBed.createComponent(ProductCard);
    fixture.componentRef.setInput('product', produit);
    await fixture.whenStable();
  });

  it('affiche le titre et le prix remisé', () => {
    const texte: string = fixture.nativeElement.textContent;
    expect(texte).toContain('Lampe');
    expect(texte).toContain('€45.00');
  });

  it('émet ajout avec le produit au clic', () => {
    let emis: Product | undefined;
    fixture.componentInstance.ajout.subscribe((p) => (emis = p));
    fixture.nativeElement.querySelector('button').click();
    expect(emis).toBe(produit);
  });
});
