// Load Lottie animations
lottie.loadAnimation({
    container: document.getElementById('zoomInIcon'),
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: 'https://lottie.host/1c5c4d9c-6ff7-4c9a-96a5-8b3f7c5d8e9a/4JqZvZ5V9l.json'
});

lottie.loadAnimation({
    container: document.getElementById('zoomOutIcon'),
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: 'https://lottie.host/7f8c5e6d-9a1b-4c2d-8e9f-0a1b2c3d4e5f/KsJq5X8Pqr.json'
});

// Three.js Scene Setup
let scene, camera, renderer, treeGroup, star, snowParticles;
let targetZoom = 7;
const snowCount = 1200;

function initScene() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = targetZoom;
    camera.position.y = 1.5;

    try {
        renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    } catch (e) {
        console.error("WebGL not supported", e);
        return;
    }
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    document.getElementById('canvas-container').appendChild(renderer.domElement);

    // Lighting - Enhanced for festive feel
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);
    
    const redLight = new THREE.PointLight(0xff6b6b, 1.5, 20);
    redLight.position.set(3, 3, 3);
    scene.add(redLight);
    
    const goldLight = new THREE.PointLight(0xffd700, 1.5, 20);
    goldLight.position.set(-3, 2, 3);
    scene.add(goldLight);
    
    const greenLight = new THREE.PointLight(0x00ff88, 0.8, 15);
    greenLight.position.set(0, 4, 2);
    scene.add(greenLight);

    // Tree Group
    treeGroup = new THREE.Group();
    scene.add(treeGroup);

    // Trunk
    const trunk = new THREE.Mesh(
        new THREE.CylinderGeometry(0.25, 0.35, 1.2, 8),
        new THREE.MeshStandardMaterial({ color: 0x8b4513, roughness: 0.8 })
    );
    trunk.position.y = -1.2;
    treeGroup.add(trunk);

    // Tree foliage - Layered cones
    const foliageMaterial = new THREE.MeshStandardMaterial({
        color: 0x1a5f3f,
        roughness: 0.6,
        metalness: 0.1
    });

    const layers = [
        { radius: 1.8, height: 2, y: -0.2 },
        { radius: 1.4, height: 1.8, y: 0.9 },
        { radius: 1, height: 1.5, y: 1.8 }
    ];

    layers.forEach(layer => {
        const cone = new THREE.Mesh(
            new THREE.ConeGeometry(layer.radius, layer.height, 16),
            foliageMaterial
        );
        cone.position.y = layer.y;
        cone.castShadow = true;
        treeGroup.add(cone);
    });

    // Ornaments - Rich festive colors
    const ornamentPositions = [
        { x: 1.2, y: -0.2, z: 0.6, color: 0xff0000 },
        { x: -1, y: 0.2, z: 0.4, color: 0xffd700 },
        { x: 0.3, y: 0.8, z: 0.9, color: 0x00ff00 },
        { x: -0.9, y: 1.2, z: -0.5, color: 0xff6b6b },
        { x: 1.3, y: 1, z: -0.3, color: 0xffd700 },
        { x: -0.5, y: 1.8, z: 0.5, color: 0xff0000 },
        { x: 0.7, y: 2.1, z: 0.7, color: 0x00ff00 }
    ];

    ornamentPositions.forEach(pos => {
        const ornament = new THREE.Mesh(
            new THREE.SphereGeometry(0.18, 16, 16),
            new THREE.MeshStandardMaterial({
                color: pos.color,
                metalness: 0.9,
                roughness: 0.1,
                envMapIntensity: 1
            })
        );
        ornament.position.set(pos.x, pos.y, pos.z);
        ornament.castShadow = true;
        treeGroup.add(ornament);
    });

    // Star on top
    star = new THREE.Mesh(
        new THREE.OctahedronGeometry(0.25, 0),
        new THREE.MeshStandardMaterial({
            color: 0xffff00,
            metalness: 1,
            roughness: 0.2,
            emissive: 0xffff00,
            emissiveIntensity: 0.5
        })
    );
    star.position.y = 2.8;
    star.castShadow = true;
    treeGroup.add(star);

    // Snow particles
    const snowPositions = new Float32Array(snowCount * 3);
    for (let i = 0; i < snowCount; i++) {
        snowPositions[i * 3] = (Math.random() - 0.5) * 25;
        snowPositions[i * 3 + 1] = Math.random() * 12;
        snowPositions[i * 3 + 2] = (Math.random() - 0.5) * 15;
    }

    const snowGeom = new THREE.BufferGeometry();
    snowGeom.setAttribute('position', new THREE.BufferAttribute(snowPositions, 3));
    snowParticles = new THREE.Points(
        snowGeom,
        new THREE.PointsMaterial({
            color: 0xffffff,
            size: 0.08,
            transparent: true,
            opacity: 0.9,
            sizeAttenuation: true
        })
    );
    scene.add(snowParticles);

    animate();
}

function animate() {
    requestAnimationFrame(animate);

    // Tree rotation
    treeGroup.rotation.y += 0.004;

    // Star rotation and pulse
    star.rotation.x += 0.03;
    star.rotation.y += 0.04;
    const starScale = 1 + Math.sin(Date.now() * 0.003) * 0.15;
    star.scale.set(starScale, starScale, starScale);

    // Ornament rotation
    treeGroup.children.forEach(child => {
        if (child.geometry instanceof THREE.SphereGeometry) {
            child.rotation.x += 0.015;
            child.rotation.y += 0.02;
        }
    });

    // Snow animation
    const pos = snowParticles.geometry.attributes.position.array;
    for (let i = 0; i < snowCount; i++) {
        pos[i * 3 + 1] -= 0.015;
        pos[i * 3] += Math.sin(Date.now() * 0.0001 + i) * 0.01;

        if (pos[i * 3 + 1] < -5) {
            pos[i * 3 + 1] = 12;
        }
    }
    snowParticles.geometry.attributes.position.needsUpdate = true;

    // Smooth camera zoom
    camera.position.z += (targetZoom - camera.position.z) * 0.05;
    renderer.render(scene, camera);
}

function changeZoom(dir) {
    targetZoom = Math.max(3, Math.min(14, targetZoom + dir));
}

// Year Animation - Digit 5 to 6
setTimeout(() => {
    const lastDigit = document.getElementById('last-digit');
    const yearContainer = document.getElementById('year-container');

    // Fade in messages
    gsap.to("#message1, #message2", {
        opacity: 1,
        duration: 1,
        stagger: 0.4,
        ease: "power2.out"
    });

    // Animate digit change
    gsap.to(lastDigit, {
        duration: 0.6,
        onStart: () => lastDigit.classList.add('slide-down'),
        onComplete: () => {
            lastDigit.classList.remove('slide-down');
            lastDigit.textContent = '6';
            lastDigit.classList.add('slide-up');

            // Add pulse after animation
            setTimeout(() => {
                yearContainer.classList.add('pulse');
            }, 600);
        }
    });
}, 2000);

// Handle window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

initScene();

// Audio Setup
const singleFireworkSound = new Audio('firework.wav');
const multipleFireworkSound = new Audio('multiple firework.wav');

// Preload audio
singleFireworkSound.preload = 'auto';
multipleFireworkSound.preload = 'auto';

// Function to play sound with volume control
function playFireworkSound(isMultiple = false) {
    const sound = isMultiple ? multipleFireworkSound.cloneNode() : singleFireworkSound.cloneNode();
    sound.volume = 0.5; // Adjust volume (0.0 to 1.0)
    sound.play().catch(e => console.log('Audio play failed:', e));
}

// Fireworks System
const fireworksCanvas = document.getElementById('fireworks-canvas');
const ctx = fireworksCanvas.getContext('2d');
fireworksCanvas.width = window.innerWidth;
fireworksCanvas.height = window.innerHeight;

let particles = [];
let consecutiveFireworks = 0;
let lastFireworkTime = 0;

// Firework patterns
const patterns = [
    // 1. Classic Burst
    { name: 'burst', count: 80, speed: 8, spread: Math.PI * 2, colors: ['#ff0000', '#ffd700', '#00ff88'] },
    // 2. Ring
    { name: 'ring', count: 100, speed: 6, spread: Math.PI * 2, colors: ['#ff6b6b', '#ffd700', '#ff00ff'] },
    // 3. Spiral
    { name: 'spiral', count: 60, speed: 7, spread: Math.PI * 2, colors: ['#00ff88', '#00ffff', '#ff0088'] },
    // 4. Double Ring
    { name: 'doubleRing', count: 120, speed: 5, spread: Math.PI * 2, colors: ['#ffd700', '#ff0000', '#00ff00'] },
    // 5. Fountain
    { name: 'fountain', count: 50, speed: 6, spread: Math.PI * 0.5, colors: ['#ff00ff', '#00ffff', '#ffff00'] },
    // 6. Wave
    { name: 'wave', count: 70, speed: 5, spread: Math.PI * 2, colors: ['#ff6b6b', '#00ff88', '#ffd700'] },
    // 7. Glitter
    { name: 'glitter', count: 150, speed: 3, spread: Math.PI * 2, colors: ['#ffffff', '#ffd700', '#ff00ff'] },
    // 8. Confetti
    { name: 'confetti', count: 100, speed: 4, spread: Math.PI * 2, colors: ['#ff0000', '#00ff00', '#0000ff', '#ffd700', '#ff00ff'] },
    // 9. Palm Tree
    { name: 'palm', count: 90, speed: 4, spread: Math.PI * 2, colors: ['#00ff88', '#ff6b6b', '#ffd700'] },
    // 10. Willow
    { name: 'willow', count: 110, speed: 2, spread: Math.PI * 2, colors: ['#00ffff', '#00ff88', '#ffff00'] },
    // 11. Bamboo
    { name: 'bamboo', count: 85, speed: 5, spread: Math.PI * 0.8, colors: ['#ff0000', '#ffd700', '#00ff88'] },
    // 12. Ring Tail
    { name: 'ringTail', count: 130, speed: 6, spread: Math.PI * 2, colors: ['#ff00ff', '#00ffff', '#ffd700'] }
];

class Particle {
    constructor(x, y, pattern) {
        this.x = x;
        this.y = y;
        this.vx = 0;
        this.vy = 0;
        this.life = 1;
        this.maxLife = Math.random() * 60 + 40;
        this.gravity = 0.15;
        this.color = pattern.colors[Math.floor(Math.random() * pattern.colors.length)];
        this.size = Math.random() * 2 + 1;
        this.decay = Math.random() * 0.01 + 0.01;
        this.pattern = pattern.name;
    }

    update() {
        this.vy += this.gravity;
        this.x += this.vx;
        this.y += this.vy;
        this.life -= this.decay;
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.globalAlpha = Math.max(0, this.life);
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
    }
}

function createFireworks(x, y, pattern, playSound = true) {
    const angle = Math.random() * Math.PI * 2;
    const angleStep = pattern.spread / pattern.count;

    // Play sound when firework is created
    if (playSound) {
        const currentTime = Date.now();
        const timeSinceLastFirework = currentTime - lastFireworkTime;

        // If multiple fireworks within 500ms, use multiple sound
        if (timeSinceLastFirework < 500) {
            consecutiveFireworks++;
            if (consecutiveFireworks >= 2) {
                playFireworkSound(true); // Multiple fireworks sound
            } else {
                playFireworkSound(false); // Single firework sound
            }
        } else {
            consecutiveFireworks = 0;
            playFireworkSound(false); // Single firework sound
        }

        lastFireworkTime = currentTime;
    }

    for (let i = 0; i < pattern.count; i++) {
        const particle = new Particle(x, y, pattern);
        let currentAngle = angle + angleStep * i;

        switch (pattern.name) {
            case 'burst':
                currentAngle = (i / pattern.count) * Math.PI * 2;
                particle.vx = Math.cos(currentAngle) * pattern.speed;
                particle.vy = Math.sin(currentAngle) * pattern.speed;
                break;

            case 'ring':
                currentAngle = (i / pattern.count) * Math.PI * 2;
                particle.vx = Math.cos(currentAngle) * (pattern.speed + 2);
                particle.vy = Math.sin(currentAngle) * (pattern.speed + 2);
                break;

            case 'spiral':
                currentAngle = (i / pattern.count) * Math.PI * 4;
                const spiralRadius = (i / pattern.count) * pattern.speed * 2;
                particle.vx = Math.cos(currentAngle) * spiralRadius;
                particle.vy = Math.sin(currentAngle) * spiralRadius;
                break;

            case 'doubleRing':
                currentAngle = (i / pattern.count) * Math.PI * 2;
                const ringType = i % 2 === 0 ? pattern.speed + 1 : pattern.speed - 1;
                particle.vx = Math.cos(currentAngle) * ringType;
                particle.vy = Math.sin(currentAngle) * ringType;
                break;

            case 'fountain':
                currentAngle = (i / pattern.count) * Math.PI;
                particle.vx = Math.cos(currentAngle) * pattern.speed;
                particle.vy = -Math.sin(currentAngle) * pattern.speed;
                break;

            case 'wave':
                currentAngle = (i / pattern.count) * Math.PI * 2;
                const waveOffset = Math.sin(i / 10) * 0.5;
                particle.vx = Math.cos(currentAngle) * (pattern.speed + waveOffset);
                particle.vy = Math.sin(currentAngle) * (pattern.speed + waveOffset);
                break;

            case 'glitter':
                currentAngle = (i / pattern.count) * Math.PI * 2;
                particle.vx = Math.cos(currentAngle) * (Math.random() * pattern.speed);
                particle.vy = Math.sin(currentAngle) * (Math.random() * pattern.speed);
                particle.size = Math.random() * 1.5 + 0.5;
                break;

            case 'confetti':
                currentAngle = (i / pattern.count) * Math.PI * 2;
                particle.vx = Math.cos(currentAngle) * (Math.random() * pattern.speed + 2);
                particle.vy = Math.sin(currentAngle) * (Math.random() * pattern.speed + 1) - 3;
                particle.size = Math.random() * 3 + 2;
                break;

            case 'palm':
                currentAngle = (i / pattern.count) * Math.PI * 2;
                const palmSpeed = pattern.speed + Math.random() * 2;
                particle.vx = Math.cos(currentAngle) * palmSpeed;
                particle.vy = Math.sin(currentAngle) * palmSpeed;
                particle.gravity = 0.08;
                break;

            case 'willow':
                currentAngle = (i / pattern.count) * Math.PI * 2;
                particle.vx = Math.cos(currentAngle) * pattern.speed;
                particle.vy = Math.sin(currentAngle) * pattern.speed;
                particle.gravity = 0.05;
                particle.decay = Math.random() * 0.003 + 0.002;
                break;

            case 'bamboo':
                currentAngle = (i / pattern.count) * Math.PI;
                particle.vx = Math.cos(currentAngle) * pattern.speed;
                particle.vy = -Math.sin(currentAngle) * pattern.speed;
                particle.gravity = 0.2;
                break;

            case 'ringTail':
                currentAngle = (i / pattern.count) * Math.PI * 2;
                particle.vx = Math.cos(currentAngle) * (pattern.speed + Math.random() * 1);
                particle.vy = Math.sin(currentAngle) * (pattern.speed + Math.random() * 1);
                particle.gravity = 0.1;
                break;

            default:
                particle.vx = Math.cos(currentAngle) * pattern.speed;
                particle.vy = Math.sin(currentAngle) * pattern.speed;
        }

        particles.push(particle);
    }
}

function animateFireworks() {
    ctx.clearRect(0, 0, fireworksCanvas.width, fireworksCanvas.height);

    for (let i = particles.length - 1; i >= 0; i--) {
        particles[i].update();
        particles[i].draw(ctx);

        if (particles[i].life <= 0) {
            particles.splice(i, 1);
        }
    }

    if (particles.length > 0) {
        requestAnimationFrame(animateFireworks);
    }
}

// Click/Tap to create fireworks
fireworksCanvas.style.pointerEvents = 'auto';
fireworksCanvas.addEventListener('click', (e) => {
    const pattern = patterns[Math.floor(Math.random() * patterns.length)];
    createFireworks(e.clientX, e.clientY, pattern);
    animateFireworks();
});

// Auto fireworks every 5-8 seconds
function autoFireworks() {
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight * 0.6;
    const pattern = patterns[Math.floor(Math.random() * patterns.length)];
    createFireworks(x, y, pattern);
    animateFireworks();

    setTimeout(autoFireworks, Math.random() * 3000 + 5000);
}

autoFireworks();

// Handle canvas resize
window.addEventListener('resize', () => {
    fireworksCanvas.width = window.innerWidth;
    fireworksCanvas.height = window.innerHeight;
});


