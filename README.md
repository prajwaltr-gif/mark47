# Aura & Bean • Artisanal Coffee Roastery & Botanical Café

> A luxury, high-conversion modern web application built for an artisanal coffee roastery and botanical café. Designed with rich micro-animations, glassmorphism, dynamic theme switching (Midnight Velvet & Golden Latte), an interactive coffee matchmaker, online ordering cart drawer, and table reservations.

---

## ☕ Key Features

1. **Rich Aesthetics & Dynamic Themes**:
   - **Midnight Velvet (Dark Mode)**: Deep espresso tones, warm amber glow, and glassmorphic card surfaces.
   - **Golden Latte (Light Mode)**: Cream, warm caramel, and alabaster accents.
   - Smooth persistent theme switcher stored in `localStorage`.

2. **Interactive Coffee Matchmaker (Quiz)**:
   - 3-step recommendation tool based on roast intensity, milk texture, and flavor profile.
   - Dynamically pairs the customer with their ideal beverage and offers a 1-click "Add to Order" action.

3. **Specialty Filterable Menu & Live Search**:
   - Filter pills: *Full Menu, Signature Coffee, Cold Brew & Iced, Tea & Matcha, Artisan Bakery, Gourmet Brunch*.
   - Instant search across menu items, flavor notes, and descriptions.
   - Detailed modal view with calorie counts, farm origin, and customizable size/temperature options.

4. **Slide-Over Cart & Simulated Checkout**:
   - Slide-over order drawer with itemized pricing, quantity +/- controls, and animated badges.
   - Interactive checkout modal with barista tip calculator (10%, 15%, 20%), tax estimation, order tracking number generator, and receipt confirmation.

5. **Table Reservation System**:
   - Date picker, time slot selector, party size counter, and 4 ambiance zone choices (*Greenhouse Patio, Velvet Booth, Barista Bar, Sunlit Library*).
   - Generates simulated booking references and confirmation receipts.

6. **Direct Farm Single-Origin Showcase**:
   - Highlights micro-lots from Ethiopia Yirgacheffe, Colombia Huila, and Guatemala Antigua with elevation, processing methods, and cup tasting profiles.

7. **Patron Testimonials & Review Submission**:
   - Live review cards with star ratings.
   - Interactive modal allowing guests to submit new reviews on the fly.

8. **Location, Map & Dynamic Business Hours**:
   - Business schedule with automated highlight of the current day.
   - Location amenities (*Wi-Fi 6, Dog Friendly, Laptop Friendly, Step-free access*).

9. **Progressive Web App (PWA) Ready**:
   - Includes `manifest.json`, high-resolution icons, responsive layout, and mobile touch optimization.

---

## 📁 Project Structure

```text
├── index.html            # Main semantic HTML5 webpage & modals
├── manifest.json         # PWA web app manifest
├── vercel.json           # Vercel caching & routing config
├── netlify.toml          # Netlify security headers & asset rules
├── robots.txt            # Search engine crawler instructions
├── sitemap.xml           # SEO sitemap
├── .gitignore            # Clean git configuration
├── css/
│   └── style.css         # Complete vanilla CSS design system & animations
├── js/
│   ├── menu-data.js      # Menu database, origins, and review datasets
│   └── app.js            # Client-side application logic & state management
└── images/
    ├── hero-latte.jpg           # Signature swan latte art
    ├── cafe-ambiance.jpg        # Botanical cafe interior with green velvet booths
    ├── nitro-cold-brew.jpg      # Cascading nitro cold brew on black marble
    ├── croissant-pastries.jpg   # Fresh golden French viennoiserie
    └── matcha-latte.jpg         # Ceremonial layered iced matcha latte
```

---

## 🚀 Deployment Instructions

### Option 1: Deploy to Netlify (Recommended - Drag & Drop or CLI)
1. **Drag & Drop**:
   - Visit [Netlify Drop](https://app.netlify.com/drop).
   - Drag this entire project folder into the browser window.
   - Your website is live in under 15 seconds with a custom HTTPS URL!
2. **Netlify CLI**:
   ```bash
   npm install -g netlify-cli
   netlify deploy --prod --dir=.
   ```

---

### Option 2: Deploy to Vercel
1. Install Vercel CLI (or connect via GitHub):
   ```bash
   npm i -g vercel
   vercel
   ```
2. The included `vercel.json` will automatically configure high-performance caching for images, CSS, and JS assets.

---

### Option 3: Deploy to GitHub Pages
1. Initialize git and commit:
   ```bash
   git init
   git add .
   git commit -m "Initial commit for Aura & Bean Cafe"
   ```
2. Push to your GitHub repository:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/aura-bean-cafe.git
   git branch -M main
   git push -u origin main
   ```
3. Go to **Repository Settings** > **Pages** > Select `main` branch (root) > **Save**.

---

## 💻 Local Development

To run locally on any machine:

### Using Python:
```bash
python -m http.server 8080
```
Open [http://localhost:8080](http://localhost:8080) in your web browser.

### Using Node.js / npx:
```bash
npx -y serve .
```

---

## 🎨 Palette & Typography
- **Espresso Dark**: `#0c0a08` & `#14110e`
- **Caramel / Amber**: `#d4a373` & `#e6b980`
- **Soft Cream**: `#faedcd` & `#fefae0`
- **Botanical Emerald**: `#2a9d8f` & `#52b788`
- **Serif Heading**: *Cinzel*
- **Display Heading**: *Outfit*
- **Body Text**: *Plus Jakarta Sans*
