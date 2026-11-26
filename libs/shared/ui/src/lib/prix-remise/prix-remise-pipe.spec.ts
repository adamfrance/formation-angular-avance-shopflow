import { Product } from '@shopflow/models';
import { PrixRemisePipe } from './prix-remise-pipe';

describe('PrixRemisePipe', () => {
  const pipe = new PrixRemisePipe();

  it('applique la remise en pourcentage', () => {
    const produit = { price: 100, discountPercentage: 12.5 } as Product;
    expect(pipe.transform(produit)).toBe(87.5);
  });

  it('arrondit au centime', () => {
    const produit = { price: 9.99, discountPercentage: 7.17 } as Product;
    expect(pipe.transform(produit)).toBe(9.27);
  });

  it('renvoie le prix tel quel sans remise', () => {
    expect(pipe.transform({ price: 20, discountPercentage: 0 } as Product)).toBe(20);
  });
});
