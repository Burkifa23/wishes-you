# Christmas & New Year 3D Greeting Card

A festive, interactive web-based greeting card featuring a 3D Christmas tree, falling snow, and animated text transitions.

## Features

- **3D Scene**: A fully rendered 3D Christmas tree with ornaments, a glowing star, and dynamic lighting using [Three.js](https://threejs.org/).
- **Atmospheric Effects**:
  - Efficient falling snow particle system.
  - Radial gradient background matching the holiday theme.
  - Custom glow effects for text and UI elements.
- **Animations**:
  - **Year Transition**: Smooth slide animation transitioning the year from 2025 to 2026.
  - **Interactive Zoom**: Smooth camera zoom controls triggered by UI buttons.
  - **Continuous Motion**: Rotating tree, pulsing star, and floating snow.
- **Modern UI**:
  - Glassmorphism design using [Tailwind CSS](https://tailwindcss.com/).
  - Vector icon animations powered by [Lottie](https://airbnb.io/lottie/).

## Technologies Used

- **HTML5 / CSS3**
- **Three.js** (r128) - 3D Rendering engine.
- **GSAP** (3.12.2) - Timeline and DOM animations.
- **Lottie Web** (5.12.2) - JSON-based vector animations for icons.
- **Tailwind CSS** - Utility-first CSS framework for styling.

## Usage

Since this project uses CDN links for all libraries, no build process or package manager (npm/yarn) is required.

1. Simply open `index.html` in any modern web browser.
2. Wait for the initial animation sequence to reveal the greeting and year change.
3. Use the "Zoom In" and "Zoom Out" buttons to adjust the camera view of the tree.

## Customization

To modify the greeting or year:

1. Open `index.html`.
2. Locate the `<main>` section to change the text content.
3. Update the `setTimeout` logic in the `<script>` tag to change the year transition digits.

## License

Open Source.