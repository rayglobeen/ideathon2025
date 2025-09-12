// particles.js
var particlesContainer = document.querySelector('.particles');

if (particlesContainer) {
  var colors = [
    'linear-gradient(135deg, #ff9a9e, #fecfef)',
    'linear-gradient(135deg, #a1ffce, #faffd1)',
    'linear-gradient(135deg, #89f7fe, #66a6ff)',
    'linear-gradient(135deg, #fbc2eb, #a6c1ee)',
    'linear-gradient(135deg, #cfd9df, #e2ebf0)'
  ];

  var sizes = [80, 100, 120, 90, 110]; // particle diameters
  var totalParticles = 8; // number of balls

  for (var i = 0; i < totalParticles; i++) {
    var particle = document.createElement('div');
    particle.className = 'particle';

    // size
    var size = sizes[Math.floor(Math.random() * sizes.length)];
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';

    // gradient color
    var color = colors[Math.floor(Math.random() * colors.length)];
    particle.style.background = color;

    // horizontal spread
    particle.style.left = (i * 12 + 5) + '%';
    particle.style.top = '60%'; // starting vertical

    // different animation durations
    particle.style.animationDuration = (8 + Math.random() * 4) + 's';

    particlesContainer.appendChild(particle);
  }
}


