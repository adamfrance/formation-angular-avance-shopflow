# ShopFlow : début du jour 3

Boutique en ligne en Angular 22, dans un espace de travail Nx : l'application `shopflow` (la boutique), l'application `vendeurs` (l'espace vendeurs) et trois bibliothèques (`ui`, `data-access`, `models`). Données : API publique https://dummyjson.com (compte de démonstration : emilys / emilyspass).

```bash
npm install
npm start                    # la boutique : http://localhost:4200
npx nx serve vendeurs        # l'espace vendeurs : http://localhost:4201
npx nx run-many -t lint      # règles de code et frontières entre les projets
npx nx graph                 # les projets et leurs dépendances
```

L'application fonctionne mais contient volontairement les défauts que la formation analyse puis corrige, module par module.
