document.addEventListener("DOMContentLoaded", function() {
  particlesJS("particles-js", {
    "particles": {
      "number": { "value": 25, "density": { "enable": true, "value_area": 900 } },
      "color": { "value": "#00CED1" },
      "shape": { "type": "circle" },
      "opacity": { "value": 0.6, "random": true, "anim": { "enable": true, "speed": 0.5, "opacity_min": 0.3, "sync": false } },
      "size": { "value": 3, "random": true, "anim": { "enable": true, "speed": 2, "size_min": 0.5, "sync": false } },
      "line_linked": { "enable": true, "distance": 180, "color": "#00CED1", "opacity": 0.4, "width": 1 },
      "move": { "enable": true, "speed": 3, "direction": "none", "random": true, "straight": false, "out_mode": "out", "attract": { "enable": true, "rotateX": 600, "rotateY": 1200 } }
    },
    "interactivity": {
      "detect_on": "canvas",
      "events": { "onhover": { "enable": true, "mode": "grab" }, "onclick": { "enable": true, "mode": "push" }, "resize": true },
      "modes": { "grab": { "distance": 200, "line_linked": { "opacity": 0.8 } }, "push": { "particles_nb": 3 } }
    },
    "retina_detect": true
  });
});
