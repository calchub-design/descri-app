# DEPLOY.md — Guide de déploiement complet BulkDescribe

## Prérequis
- Node.js 18+
- Compte Vercel (gratuit)
- Compte Supabase (gratuit)
- Compte Stripe
- Compte Anthropic (Claude API)
- Domaine `.com` (~10€ sur Namecheap ou Porkbun)

---

## Étape 1 — Supabase

### 1.1 Créer un projet
1. Aller sur [supabase.com](https://supabase.com) → New project
2. Choisir une région proche de vos utilisateurs (ex: `eu-west-1` pour l'Europe)
3. Noter le mot de passe de la base de données

### 1.2 Récupérer les clés
Dans **Settings → API** :
- `NEXT_PUBLIC_SUPABASE_URL` = Project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` = `anon` public key
- `SUPABASE_SERVICE_ROLE_KEY` = `service_role` secret key

### 1.3 Exécuter les migrations
Dans **SQL Editor**, copier-coller le contenu de `supabase/migrations/001_initial.sql` et exécuter.

### 1.4 Configurer l'authentification (magic link)
Dans **Authentication → Settings** :
- Activer "Enable email confirmations" → OFF (magic link uniquement)
- "Mailer OTP Expiry" → 3600 secondes
- Dans "Redirect URLs", ajouter :
  - `https://descri.app/auth/callback`
  - `http://localhost:3000/auth/callback` (pour le dev)

---

## Étape 2 — Stripe

### 2.1 Créer les produits
Dans **Products → Add product** :

**Plan Starter**
- Nom : "BulkDescribe Starter"
- Prix : $9.00 / month (récurrent)
- Métadonnées du prix : `plan = starter`
- Noter l'ID du prix : `price_xxx` → `STRIPE_PRICE_STARTER`

**Plan Growth**
- Nom : "BulkDescribe Growth"
- Prix : $29.00 / month (récurrent)
- Métadonnées du prix : `plan = growth`
- Noter l'ID du prix : `price_xxx` → `STRIPE_PRICE_GROWTH`

### 2.2 Clés API
Dans **Developers → API keys** :
- `STRIPE_SECRET_KEY` = Secret key (`sk_live_...`)
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` = Publishable key (`pk_live_...`)

### 2.3 Webhook
Dans **Developers → Webhooks → Add endpoint** :
- Endpoint URL : `https://descri.app/api/stripe/webhook`
- Events à écouter :
  - `checkout.session.completed`
  - `customer.subscription.updated`
  - `customer.subscription.deleted`
- Signer les webhooks et noter le secret : `STRIPE_WEBHOOK_SECRET` = `whsec_...`

> Pour le développement local, utilisez Stripe CLI :
> ```bash
> stripe listen --forward-to localhost:3000/api/stripe/webhook
> ```

---

## Étape 3 — Anthropic API

1. Aller sur [console.anthropic.com](https://console.anthropic.com)
2. **API Keys → Create Key**
3. `ANTHROPIC_API_KEY` = `sk-ant-...`
4. Ajouter ~$8-10 de crédit initial (suffisant pour les premiers tests + ~5 000 descriptions)

---

## Étape 4 — Vercel

### 4.1 Déployer
```bash
# Installer Vercel CLI
npm i -g vercel

# Dans le dossier du projet
vercel

# Suivre les instructions, choisir "Next.js" détecté automatiquement
```

Ou connecter directement depuis [vercel.com](https://vercel.com) → Import Git Repository.

### 4.2 Variables d'environnement
Dans **Vercel Dashboard → Settings → Environment Variables**, ajouter :

```
NEXT_PUBLIC_SUPABASE_URL          = https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY     = eyJhbGc...
SUPABASE_SERVICE_ROLE_KEY         = eyJhbGc...
ANTHROPIC_API_KEY                 = sk-ant-...
STRIPE_SECRET_KEY                 = sk_live_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY = pk_live_...
STRIPE_WEBHOOK_SECRET             = whsec_...
STRIPE_PRICE_STARTER              = price_...
STRIPE_PRICE_GROWTH               = price_...
NEXT_PUBLIC_APP_URL               = https://descri.app
```

### 4.3 Domaine personnalisé
Dans **Vercel → Settings → Domains** :
- Ajouter votre domaine acheté sur Namecheap/Porkbun
- Suivre les instructions DNS (CNAME ou A record)

---

## Étape 5 — Développement local

```bash
# Cloner / se placer dans le dossier
cd bulkdescribe

# Installer les dépendances
npm install

# Créer le fichier .env.local
cp .env.example .env.local
# Remplir .env.local avec vos vraies valeurs

# Lancer le serveur de dev
npm run dev

# Dans un autre terminal, écouter les webhooks Stripe
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

---

## Architecture des fichiers

```
├── app/
│   ├── page.tsx                    Landing page
│   ├── layout.tsx
│   ├── globals.css
│   ├── dashboard/page.tsx          App principale (dashboard)
│   ├── auth/
│   │   ├── login/page.tsx          Page de connexion (magic link)
│   │   └── callback/page.tsx       Callback OAuth/magic link
│   └── api/
│       ├── generate/route.ts       Génération CSV via SSE
│       ├── usage/route.ts          Récupération quota utilisateur
│       └── stripe/
│           ├── checkout/route.ts   Création session Stripe Checkout
│           └── webhook/route.ts    Webhooks Stripe
├── lib/
│   ├── supabase/
│   │   ├── client.ts               Client Supabase (browser)
│   │   └── server.ts               Client Supabase (serveur)
│   ├── claude.ts                   Intégration Claude API (Haiku)
│   ├── stripe.ts                   Instance Stripe
│   ├── csv.ts                      Parse & build CSV
│   ├── plans.ts                    Définition des plans
│   └── usage.ts                    Gestion des quotas
├── middleware.ts                   Protection des routes /dashboard
└── supabase/
    └── migrations/001_initial.sql  Schéma base de données
```

---

## Format CSV d'entrée

```csv
product_name,features,category
"Montre cuir homme","boîtier acier, bracelet cuir marron, étanche 50m","montres"
"Sac à main beige","cuir véritable, fermeture dorée, 3 compartiments","maroquinerie"
```

Colonnes acceptées :
- `product_name` OU `nom_produit` OU `name`
- `features` OU `caracteristiques` OU `caractéristiques`
- `category` OU `categorie` OU `catégorie`

## Format CSV de sortie

```csv
product_name,description_generated,style,language
"Montre cuir homme","Une montre homme alliant élégance...","seo","fr"
```

---

## Checklist de lancement

- [ ] Supabase : projet créé, migrations exécutées, auth configurée
- [ ] Stripe : produits créés, webhook enregistré, clés copiées
- [ ] Anthropic : clé API créée, crédit ajouté
- [ ] Vercel : déployé, domaine configuré, env vars renseignées
- [ ] Test end-to-end : inscription → upload CSV → génération → download → paiement Stripe
- [ ] Webhook Stripe testé avec Stripe CLI en local
- [ ] URL de redirect Supabase mise à jour avec le vrai domaine

---

## Coûts estimés

| Poste | Coût mensuel |
|---|---|
| Vercel (Free tier) | $0 |
| Supabase (Free tier) | $0 |
| Domaine | ~€0.83 |
| Claude Haiku (100 desc/client) | ~$0.15/client |
| Stripe fees (sur $9) | ~$0.56 |
| **Total pour 4 clients Growth** | **~$5/mois** |

Marge nette à 4 clients Growth ($29×4 = $116) : **~$110/mois** ✓
