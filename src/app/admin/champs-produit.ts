/** Description d'un champ du formulaire produit. */
export interface ChampProduit {
  cle: 'title' | 'description' | 'price' | 'category' | 'stock';
  libelle: string;
  type: 'texte' | 'zone' | 'nombre' | 'liste' | 'quantite';
  requis?: boolean;
  min?: number;
  options?: string[];
}

/** Le formulaire produit, décrit comme des données : on ajoute un champ en ajoutant une ligne. */
export const CHAMPS_PRODUIT: ChampProduit[] = [
  { cle: 'title', libelle: 'Nom du produit', type: 'texte', requis: true },
  { cle: 'description', libelle: 'Description', type: 'zone' },
  { cle: 'price', libelle: 'Prix (€)', type: 'nombre', requis: true, min: 0.01 },
  { cle: 'category', libelle: 'Catégorie', type: 'liste', requis: true, options: ['beauty', 'fragrances', 'furniture', 'groceries', 'smartphones'] },
  { cle: 'stock', libelle: 'Stock initial', type: 'quantite', min: 0 },
];
