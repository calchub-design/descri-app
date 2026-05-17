import React from 'react'
import Link from 'next/link'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <span className="text-xl font-bold text-brand-600">BulkDescribe</span>
          <div className="flex items-center gap-4">
            <Link href="/auth/login" className="text-gray-600 hover:text-gray-900 font-medium text-sm">
              Connexion
            </Link>
            <Link href="/auth/login" className="btn-primary text-sm py-2 px-4">
              Essai gratuit
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-20 pb-16 text-center">
        <div className="inline-flex items-center gap-2 bg-brand-50 text-brand-700 text-sm font-medium px-4 py-1.5 rounded-full mb-6">
          20 descriptions gratuites, sans carte bancaire
        </div>
        <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 leading-tight mb-6">
          100 descriptions produits<br />
          <span className="text-brand-600">en 2 minutes chrono</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10">
          Uploadez votre CSV Shopify ou WooCommerce. Téléchargez un CSV prêt à réimporter avec toutes vos descriptions générées par IA — sans copier-coller, sans intégration, sans perdre votre journée.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/auth/login" className="btn-primary text-base px-8 py-4">
            Commencer gratuitement
          </Link>
          <a href="#how-it-works" className="btn-secondary text-base px-8 py-4">
            Voir comment ça marche
          </a>
        </div>
        <p className="text-sm text-gray-400 mt-4">
          Aucune installation. Aucune connexion à votre boutique.
        </p>
      </section>

      {/* Demo visuel CSV */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 pb-20">
        <div className="bg-gray-50 rounded-2xl border border-gray-200 p-8">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">CSV d'entrée</p>
              <div className="bg-white rounded-lg border border-gray-200 font-mono text-sm p-4 space-y-2">
                <div className="text-gray-400">product_name, features, category</div>
                <div className="text-gray-700">"Montre cuir homme", "boîtier acier, bracelet cuir marron, étanche 50m", "montres"</div>
                <div className="text-gray-700">"Sac à main beige", "cuir véritable, fermeture dorée, 3 compartiments", "maroquinerie"</div>
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold text-brand-600 uppercase tracking-wider mb-3">CSV de sortie — prêt à importer</p>
              <div className="bg-brand-50 rounded-lg border border-brand-100 font-mono text-sm p-4 space-y-2">
                <div className="text-gray-400">product_name, description_generated, style, language</div>
                <div className="text-gray-700">"Montre cuir homme", "Une montre homme élégante alliant robustesse et raffinement. Son boîtier en acier inoxydable et son bracelet en cuir marron authentique en font le compagnon idéal du quotidien...", "seo", "fr"</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="bg-gray-50 py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
            3 étapes. C'est tout.
          </h2>
          <p className="text-center text-gray-600 mb-12">Pas d'intégration Shopify, pas d'API à configurer. Juste un fichier CSV.</p>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: '1',
                title: 'Uploadez votre CSV',
                desc: 'Exportez vos produits depuis Shopify ou WooCommerce (ou créez un simple fichier Excel). 3 colonnes suffisent : nom, caractéristiques, catégorie.',
                icon: '📤',
              },
              {
                step: '2',
                title: 'Choisissez style & langue',
                desc: 'SEO, Storytelling, Luxe ou Minimaliste. En français, anglais, espagnol et plus. Un clic.',
                icon: '🎨',
              },
              {
                step: '3',
                title: 'Téléchargez et réimportez',
                desc: 'Votre CSV enrichi est prêt en quelques minutes. Réimportez-le directement dans votre boutique. Zéro copier-coller.',
                icon: '📥',
              },
            ].map((item) => (
              <div key={item.step} className="card text-center">
                <div className="text-4xl mb-4">{item.icon}</div>
                <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-brand-600 text-white text-sm font-bold mb-3">
                  {item.step}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Before / After */}
      <section className="py-20 max-w-6xl mx-auto px-4 sm:px-6">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Avant vs Après BulkDescribe
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="rounded-xl border-2 border-red-100 bg-red-50 p-8">
            <div className="text-2xl mb-4">😤 Avant</div>
            <ul className="space-y-3 text-gray-700">
              {[
                'Ouvrir ChatGPT dans un onglet',
                'Copier chaque produit un par un',
                'Coller la description dans votre tableur',
                'Répéter 50, 100, 300 fois...',
                '3 à 6 heures de travail répétitif',
                'Résultats incohérents de style à style',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="text-red-400 mt-0.5">✗</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl border-2 border-green-100 bg-green-50 p-8">
            <div className="text-2xl mb-4">🚀 Avec BulkDescribe</div>
            <ul className="space-y-3 text-gray-700">
              {[
                'Uploader votre CSV existant',
                'Choisir style + langue en 1 clic',
                'Cliquer sur "Générer"',
                'Télécharger le CSV enrichi',
                '2 minutes pour 100 produits',
                'Style cohérent sur tout le catalogue',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="text-green-500 mt-0.5">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="bg-gray-50 py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
            Tarifs simples et transparents
          </h2>
          <p className="text-center text-gray-600 mb-12">Payez seulement si ça vous convient. 14 jours d'essai gratuit inclus.</p>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {/* Free */}
            <div className="card">
              <div className="text-lg font-semibold text-gray-900 mb-1">Essai Gratuit</div>
              <div className="text-3xl font-bold text-gray-900 mb-1">$0</div>
              <p className="text-sm text-gray-500 mb-6">Pour découvrir</p>
              <ul className="space-y-2 text-sm text-gray-600 mb-8">
                <li className="flex gap-2"><span className="text-green-500">✓</span> 20 descriptions/mois</li>
                <li className="flex gap-2"><span className="text-green-500">✓</span> Styles SEO & Storytelling</li>
                <li className="flex gap-2"><span className="text-green-500">✓</span> FR, EN, ES</li>
                <li className="flex gap-2"><span className="text-green-500">✓</span> Export CSV</li>
              </ul>
              <Link href="/auth/login" className="btn-secondary w-full text-sm py-2.5">
                Commencer gratuitement
              </Link>
            </div>
            {/* Starter */}
            <div className="card border-brand-500 border-2 relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                Populaire
              </div>
              <div className="text-lg font-semibold text-gray-900 mb-1">Starter</div>
              <div className="text-3xl font-bold text-gray-900 mb-1">$9<span className="text-lg font-normal text-gray-500">/mois</span></div>
              <p className="text-sm text-gray-500 mb-6">Pour les boutiques actives</p>
              <ul className="space-y-2 text-sm text-gray-600 mb-8">
                <li className="flex gap-2"><span className="text-green-500">✓</span> <strong>100 descriptions/mois</strong></li>
                <li className="flex gap-2"><span className="text-green-500">✓</span> Styles SEO & Storytelling</li>
                <li className="flex gap-2"><span className="text-green-500">✓</span> FR, EN, ES</li>
                <li className="flex gap-2"><span className="text-green-500">✓</span> Export CSV illimité</li>
                <li className="flex gap-2"><span className="text-green-500">✓</span> Support email</li>
              </ul>
              <Link href="/auth/login" className="btn-primary w-full text-sm py-2.5">
                Démarrer l'essai gratuit
              </Link>
            </div>
            {/* Growth */}
            <div className="card">
              <div className="text-lg font-semibold text-gray-900 mb-1">Growth</div>
              <div className="text-3xl font-bold text-gray-900 mb-1">$29<span className="text-lg font-normal text-gray-500">/mois</span></div>
              <p className="text-sm text-gray-500 mb-6">Pour les catalogues larges</p>
              <ul className="space-y-2 text-sm text-gray-600 mb-8">
                <li className="flex gap-2"><span className="text-green-500">✓</span> <strong>1 000 descriptions/mois</strong></li>
                <li className="flex gap-2"><span className="text-green-500">✓</span> Tous les styles (+ Luxe & Minimaliste)</li>
                <li className="flex gap-2"><span className="text-green-500">✓</span> FR, EN, ES, DE, IT</li>
                <li className="flex gap-2"><span className="text-green-500">✓</span> Export CSV illimité</li>
                <li className="flex gap-2"><span className="text-green-500">✓</span> Support prioritaire</li>
              </ul>
              <Link href="/auth/login" className="btn-secondary w-full text-sm py-2.5">
                Démarrer l'essai gratuit
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 max-w-3xl mx-auto px-4 sm:px-6">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Questions fréquentes</h2>
        <div className="space-y-6">
          {[
            {
              q: 'Fonctionne avec Shopify et WooCommerce ?',
              a: "Oui, et avec n'importe quelle autre plateforme. Notre outil est complètement indépendant. Si vous pouvez exporter et importer un CSV, ça marche.",
            },
            {
              q: 'Quel format de CSV dois-je préparer ?',
              a: 'Trois colonnes : product_name (nom du produit), features (caractéristiques séparées par des virgules), category (catégorie du produit). Un exemple est disponible dans le tableau de bord.',
            },
            {
              q: 'Les descriptions sont-elles de bonne qualité ?',
              a: "Elles sont générées par Claude (Anthropic), l'un des meilleurs LLM du marché. La qualité est comparable à ce qu'un rédacteur produirait. Certains clients les utilisent directement, d'autres font une relecture rapide.",
            },
            {
              q: 'Mes données sont-elles sécurisées ?',
              a: 'Vos fichiers CSV sont traités en mémoire et jamais stockés sur nos serveurs. Seuls les compteurs d'utilisation sont enregistrés.',
            },
          ].map((item) => (
            <div key={item.q} className="border-b border-gray-200 pb-6">
              <h3 className="font-semibold text-gray-900 mb-2">{item.q}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{item.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA final */}
      <section className="bg-brand-600 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Prêt à gagner des heures chaque semaine ?
          </h2>
          <p className="text-brand-100 mb-8 text-lg">
            20 descriptions gratuites. Aucune carte bancaire requise.
          </p>
          <Link href="/auth/login" className="inline-flex items-center justify-center px-8 py-4 rounded-lg bg-white text-brand-600 font-bold text-lg hover:bg-brand-50 transition-colors">
            Commencer maintenant — c'est gratuit
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-brand-600 font-bold">BulkDescribe</span>
          <p className="text-sm text-gray-400">© 2026 BulkDescribe. Tous droits réservés.</p>
        </div>
      </footer>
    </div>
  )
}
