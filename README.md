# Dam Craft Events & Activations 🎪⚡

A premium, interactive, and immersive portfolio website for **DAM CRAFT Events & Activations**, an award-winning event management agency based in Delhi. Designed with a dark-theme-first aesthetic, fluid micro-interactions, and premium inertial scrolling to showcase brand activations, corporate conferences, and creative exhibitions.

---

## ✨ Key Features

*   **Premium Inertial Scrolling**: Implements smooth inertial scrolling via `Lenis` for a boutique, luxury website feel.
*   **Custom Fluid Cursor**: A portal-rendered dynamic cursor (`CustomCursor.jsx`) that follows the mouse with spring lag, adapts colors over background elements via `mix-blend-difference`, and expands to display contextual action prompts (e.g. "Play" on video hover).
*   **Precise Magnetic Snappings**: Reusable `<Magnetic>` button wrappers using GSAP's `quickTo` for smooth coordinate pulls. Features nested-ref separation to isolate active hover boxes and prevent adjacent buttons from overlapping or snapping together.
*   **Performance Optimization**: Fully responsive layouts featuring React code-splitting (`React.lazy` and `<Suspense>`) for accelerated initial page load speeds.
*   **Global Theme Toggle**: Persistent dark/light mode toggle connected directly to Tailwind CSS variables via DOM class styling.
*   **SEO & Open Graph Optimization**: Comprehensive search engine optimization complete with Open Graph social metadata, meta keywords, and indexing descriptions.

---

## 🛠️ Tech Stack

*   **Core Framework**: React 19 (Component-driven architecture)
*   **Bundler & Dev Server**: Vite 6 (Fast native-ESM compilation)
*   **Styling**: Tailwind CSS v4 (CSS-first tooling and custom variables)
*   **Continuous Coordinates / Mouse tracking**: GSAP v3 (GreenSock Animation Platform)
*   **Entrance & State Animations**: Framer Motion v12
*   **Smooth Inertial Scroll**: Lenis Scroll v1
*   **Icons**: Remix Icons v4

---

## 📁 Folder Structure

```text
dam-craft-events/
├── index.html              # Core entry HTML & SEO configurations
├── package.json            # Script commands and project dependencies
├── vite.config.js          # Vite plugins, React integration & Tailwind settings
└── src/
    ├── main.jsx            # React mounting entry point
    ├── App.jsx             # Shell wrapper containing global styles, Lenis, and routing
    ├── pages/              # Primary route views (Home, About, Work, Services, Gallery, Contact)
    ├── components/
    │   ├── layout/         # Header Navigation & Footer layouts
    │   └── ui/             # Reusable UX helpers (Magnetic wrappers, Custom Cursor, Buttons)
    ├── styles/
    │   └── index.css       # Design tokens, CSS variables, and light/dark theme styles
    ├── utils/
    │   ├── Routing.jsx     # Route mappings and page chunk lazy-loading
    │   └── ScrollToTop.jsx # Page scroll resets on router transitions
    └── constants/
        └── projectsData.js # Portfolio content data
```

---

## 🚀 Getting Started

### Prerequisites

*   [Node.js](https://nodejs.org/) (v18 or higher recommended)
*   [npm](https://www.npmjs.com/) (installed automatically with Node)

### Installation & Local Setup

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/shubhamx599/damcraftevents.git
    cd damcraftevents
    ```

2.  **Install project dependencies**:
    ```bash
    npm install
    ```

3.  **Run the local development server**:
    ```bash
    npm run dev
    ```
    Your application will now be running on `http://localhost:5173`.

### Production Build & Linting

*   **Lint for syntax and styling guidelines**:
    ```bash
    npm run lint
    ```
*   **Build the static production bundle**:
    ```bash
    npm run build
    ```
    Vite will compile and optimize all assets into the `/dist` output directory.