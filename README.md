# Portfolio — Zakarie Djemai

Site portfolio personnel développé en HTML/CSS/JS vanilla dans le cadre de ma formation à la Metz Numeric School.

## 🚀 Fonctionnalités

- **Design responsive** : Mobile-first avec media queries
- **Accessibilité WCAG** : Skip links, ARIA, contrastes, navigation clavier
- **SEO optimisé** : Open Graph, Twitter Cards, structured data, sitemap
- **Performance** : Minification CSS/JS, lazy loading potentiel
- **Analytics** : Google Analytics 4 intégré
- **Sécurité** : Content Security Policy (CSP)
- **Tests** : Jest pour validation JavaScript
- **CI/CD** : GitHub Actions pour déploiement automatique

## 🛠️ Stack Technique

- **Frontend** : HTML5, CSS3, JavaScript ES6
- **Outils** : Node.js, npm, Jest, clean-css, uglify-js
- **Déploiement** : GitHub Pages avec Actions
- **Formulaires** : Formspree (backendless)
- **Analytics** : Google Analytics 4

## 📦 Installation & Développement

### Prérequis
- Node.js 18+
- npm

### Installation
```bash
npm install
```

### Développement
```bash
# Lancer serveur local
npm run serve

# Build pour production
npm run build

# Tests
npm test
```

### Déploiement
Le déploiement est automatique via GitHub Actions sur push vers `main`.

## 📁 Structure

```
portfolio/
├── index.html              # Page d'accueil
├── realisations.html       # Portfolio projets
├── parcours.html          # CV et expérience
├── contact.html           # Formulaire de contact
├── styles/                # CSS
│   ├── main.css
│   ├── nav.css
│   └── modal.css
├── js/                    # JavaScript
│   ├── burger.js
│   ├── LiWithSubnav.js
│   ├── modal.js
│   └── contact-form.js
├── images/                # Images et médias
├── favico/               # Favicons et manifest
├── documents/            # CV PDF
├── __tests__/            # Tests Jest
├── .github/workflows/    # CI/CD
├── sitemap.xml
├── robots.txt
└── CNAME                 # Domaine personnalisé
```

## 🔧 Configuration

### Google Analytics
Remplacez `GA_MEASUREMENT_ID` dans tous les fichiers HTML par votre ID Google Analytics.

### Domaine
Modifiez `CNAME` et les URLs dans les meta tags pour votre domaine.

## 📈 Performance

- **Lighthouse Score** : 90+ attendu
- **Core Web Vitals** : Optimisés
- **Bundle size** : Minifié et compressé


