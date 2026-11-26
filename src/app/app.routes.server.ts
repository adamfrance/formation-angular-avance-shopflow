import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  { path: 'catalogue', renderMode: RenderMode.Prerender },
  { path: 'catalogue/:id', renderMode: RenderMode.Server },
  { path: 'panier', renderMode: RenderMode.Client },
  { path: 'commande', renderMode: RenderMode.Client },
  { path: 'commande/confirmation', renderMode: RenderMode.Client },
  { path: 'connexion', renderMode: RenderMode.Client },
  { path: 'mes-commandes', renderMode: RenderMode.Client },
  { path: 'admin/**', renderMode: RenderMode.Client },
  { path: '**', renderMode: RenderMode.Server },
];
