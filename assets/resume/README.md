# 🚀 Ahmad Nizar Rusdiawan — Personal Portfolio

> Informatics Student | Data Analytics Enthusiast | Data Science & Machine Learning Learner

A modern, professional, and fully responsive personal portfolio website built with pure HTML, CSS, and JavaScript — no frameworks, no dependencies.

---

## ✨ Features

- **Dark / Light Theme Toggle** — persists across sessions via localStorage
- **Particle Animation** — subtle floating particles with connection lines
- **Typing Effect** — animated role text in the hero section
- **Scroll Reveal Animations** — smooth entrance animations via IntersectionObserver
- **Animated Skill Bars** — progress bars that animate on scroll
- **Animated Counters** — number counters for stats
- **Skills Tab Filter** — filter skills by category (Languages, Data & ML, Web Dev, Tools)
- **Project Modal** — detailed project view in a clean modal
- **Copy Email Button** — one-click email copy with visual feedback
- **Sticky Navbar** with active section highlight
- **Mobile Hamburger Menu** — fully accessible mobile navigation
- **Back to Top Button** — appears after scrolling down
- **Smooth Scrolling** — native smooth scroll with offset
- **Parallax Effect** — subtle hero background parallax

---

## 🗂️ Project Structure

```
portfolio/
│
├── index.html          # Main HTML file
├── css/
│   └── style.css       # All styles (CSS custom properties, responsive)
├── js/
│   └── script.js       # All interactivity (no dependencies)
├── assets/
│   ├── images/         # Add your profile photo here
│   ├── icons/          # Add favicon here
│   └── resume/         # Add your CV here as cv-placeholder.pdf
└── README.md
```

---

## 🖥️ How to Run Locally

### Option 1 — Open Directly
```bash
# Simply open index.html in your browser
open index.html         # macOS
start index.html        # Windows
xdg-open index.html     # Linux
```

### Option 2 — Live Server (Recommended)
If you use VS Code, install the **Live Server** extension, then right-click `index.html` → "Open with Live Server".

### Option 3 — Python HTTP Server
```bash
# Navigate to portfolio folder
cd portfolio

# Python 3
python -m http.server 8000

# Open in browser
# http://localhost:8000
```

---

## 🌐 Deploy to GitHub Pages

### Step 1 — Create Repository
1. Go to [github.com](https://github.com) and create a new repository
2. Name it: `<your-username>.github.io` (for root domain) OR any name like `portfolio`

### Step 2 — Push Code
```bash
cd portfolio

git init
git add .
git commit -m "Initial portfolio deploy"

git remote add origin https://github.com/2023-Nizar-186/<repo-name>.git
git branch -M main
git push -u origin main
```

### Step 3 — Enable GitHub Pages
1. Go to your repository → **Settings**
2. Scroll to **Pages**
3. Source: **Deploy from a branch**
4. Branch: **main** / **(root)**
5. Click **Save**

Your site will be live at:
- `https://2023-nizar-186.github.io/<repo-name>/`
- OR `https://2023-nizar-186.github.io/` (if repo is named `2023-nizar-186.github.io`)

---

## 🎨 Customization

### Colors
Edit CSS variables in `css/style.css`:
```css
:root {
  --primary: #6366F1;       /* Main accent color */
  --secondary: #8B5CF6;     /* Secondary accent */
  --bg: #0F172A;            /* Background */
  --surface: #1E293B;       /* Card/surface color */
  --text: #F8FAFC;          /* Main text */
  --text-muted: #94A3B8;    /* Secondary text */
}
```

### Add Profile Photo
1. Place your photo in `assets/images/profile.jpg`
2. Add an `<img>` tag in the About section in `index.html`

### Add Your CV
1. Place your CV PDF in `assets/resume/` renamed to `cv-placeholder.pdf`
2. The "Download CV" button will automatically link to it

### Update Links
Search for placeholder GitHub links in `index.html` and `js/script.js` and replace with your actual repository URLs.

---

## 📱 Browser Support

| Browser | Support |
|---------|---------|
| Chrome 80+ | ✅ Full |
| Firefox 75+ | ✅ Full |
| Safari 13+ | ✅ Full |
| Edge 80+ | ✅ Full |
| Mobile Chrome | ✅ Full |
| Mobile Safari | ✅ Full |

---

## 🛠️ Tech Stack

- **HTML5** — Semantic markup, accessibility attributes
- **CSS3** — Custom properties, Grid, Flexbox, animations
- **Vanilla JavaScript** — IntersectionObserver, Canvas API, Clipboard API
- **Google Fonts** — Syne (display) + DM Sans (body)

---

## 📄 License

MIT License — feel free to use and customize for your own portfolio.

---

*Built with ❤️ by Ahmad Nizar Rusdiawan — Malang, Jawa Timur, Indonesia*
