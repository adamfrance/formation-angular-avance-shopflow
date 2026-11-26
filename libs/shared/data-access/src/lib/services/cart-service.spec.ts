import { TestBed } from '@angular/core/testing';
import { Product } from '@shopflow/models';
import { CartService } from './cart-service';

const produit = (id: number, price: number): Product => ({ id, title: `Produit ${id}`, price, discountPercentage: 0, thumbnail: '' }) as Product;

describe('CartService', () => {
  let panier: CartService;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({});
    panier = TestBed.inject(CartService);
  });

  it('ajoute un produit, puis augmente sa quantité', () => {
    panier.add(produit(1, 10));
    panier.add(produit(1, 10));
    expect(panier.lignes().length).toBe(1);
    expect(panier.nbArticles()).toBe(2);
    expect(panier.total()).toBe(20);
  });

  it('retire la ligne quand la quantité passe à 0', () => {
    panier.add(produit(1, 10));
    panier.setQuantity(1, 0);
    expect(panier.lignes()).toEqual([]);
  });

  it('sauvegarde le panier dans le localStorage', () => {
    panier.add(produit(2, 5));
    TestBed.tick();
    expect(JSON.parse(localStorage.getItem('shopflow-panier') ?? '[]').length).toBe(1);
  });
});
