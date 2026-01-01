# Christmas & New Year 2026 - 3D Interactive Greeting Card 🎄✨

A festive, interactive web-based greeting card featuring a 3D Christmas tree, falling snow, animated fireworks with sound effects, and smooth year transition animations.

## ✨ Features

### 🎨 3D Scene
- Fully rendered 3D Christmas tree with ornaments and a glowing star
- Dynamic lighting system with ambient, red, gold, and green point lights
- Smooth tree rotation and pulsing star animation
- Interactive camera zoom controls

### ❄️ Atmospheric Effects
- Efficient falling snow particle system (1200+ particles)
- Radial gradient background matching the holiday theme
- Custom glow effects for text and UI elements
- Glassmorphism design for buttons

### 🎆 Fireworks System
- **12 unique firework patterns**: Burst, Ring, Spiral, Double Ring, Fountain, Wave, Glitter, Confetti, Palm Tree, Willow, Bamboo, and Ring Tail
- **Interactive fireworks**: Click anywhere on the screen to launch fireworks
- **Auto-generated fireworks**: Random fireworks appear every 5-8 seconds
- **Synchronized sound effects**:
  - Single explosion sound for individual fireworks
  - Multiple explosion sound for rapid-fire bursts
  - Smart audio detection (plays multiple sound when 2+ fireworks within 500ms)

### 🎬 Animations
- **Year Transition**: Smooth slide animation transitioning from 2025 to 2026
- **Text Fade-in**: Staggered GSAP animations for "Merry Christmas" and "Happy New Year"
- **Continuous Motion**: Rotating tree, pulsing star, and floating snow
- **Interactive Zoom**: Smooth camera zoom with easing

### 🎯 Modern UI
- Responsive design with Tailwind CSS
- Glassmorphism buttons with hover effects
- Vector icon animations powered by Lottie
- Clean, organized code structure

## 🛠️ Technologies Used

- **HTML5** - Semantic structure
- **CSS3** - Custom animations and styling (`styles.css`)
- **JavaScript (ES6+)** - Interactive functionality (`script.js`)
- **Three.js** (r128) - 3D rendering engine
- **GSAP** (3.12.2) - Timeline and DOM animations
- **Lottie Web** (5.12.2) - JSON-based vector animations for icons
- **Tailwind CSS** - Utility-first CSS framework
- **Canvas API** - 2D fireworks rendering

## 📁 Project Structure

```
wishes-you/
├── index.html          # Main HTML structure
├── styles.css          # Custom CSS styles and animations
├── script.js           # JavaScript logic (3D scene, fireworks, animations)
├── firework.wav        # Single firework explosion sound
├── multiple firework.wav  # Multiple fireworks explosion sound
└── README.md           # Project documentation
```

## 🚀 Usage

Since this project uses CDN links for all libraries, **no build process or package manager** (npm/yarn) is required.

### Quick Start
1. Simply open `index.html` in any modern web browser
2. Wait for the initial animation sequence to reveal the greeting and year change
3. **Click anywhere** on the screen to create fireworks with sound effects
4. Use the **"Zoom In"** and **"Zoom Out"** buttons to adjust the camera view

### Browser Requirements
- Modern browser with WebGL support (Chrome, Firefox, Safari, Edge)
- Audio playback capability for sound effects

## 🎨 Customization

### Change Text Content
Edit the `<main>` section in `index.html`:
```html
<h1 id="message1">Merry Christmas</h1>
<h2 id="message2">Happy New Year!</h2>
```

### Modify Year Transition
Update the year digits in `index.html` and the transition logic in `script.js`:
```javascript
// In script.js, line ~210
lastDigit.textContent = '6'; // Change to desired year digit
```

### Adjust Firework Settings
Modify patterns in `script.js`:
```javascript
// Change firework frequency (line ~480)
setTimeout(autoFireworks, Math.random() * 3000 + 5000); // 5-8 seconds

// Adjust sound volume (line ~240)
sound.volume = 0.5; // Range: 0.0 to 1.0
```

### Customize Colors
Edit CSS variables in `styles.css` or Tailwind classes in `index.html`

## 🎵 Audio Files

- `firework.wav` - Single firework explosion sound
- `multiple firework.wav` - Multiple fireworks explosion sound

Audio plays automatically when fireworks are triggered. The system intelligently switches between single and multiple explosion sounds based on timing.

## 📝 License

Open Source - Feel free to use and modify for your own projects!

## 🎉 Credits

Created with ❤️ using modern web technologies for a festive holiday experience.