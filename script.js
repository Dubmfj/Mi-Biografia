// ============ MENU RESPONSIVE ============
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');   // animación hamburguesa -> X
    navLinks.classList.toggle('active');     // despliegue dropdown
});

// Cerrar menú al hacer click en un enlace SOLO en móviles
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            navLinks.classList.remove('active');
            menuToggle.classList.remove('active');
        }
    });
});


// ============ FORMULARIO CONTACTO ============
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const inputs = contactForm.querySelectorAll('input, textarea');
        let allFilled = true;
        
        inputs.forEach(input => {
            if (!input.value.trim()) {
                allFilled = false;
                input.style.borderColor = '#ff006e';
            } else {
                input.style.borderColor = '';
            }
        });
        
        if (allFilled) {
            const btn = contactForm.querySelector('button');
            const originalText = btn.textContent;
            
            // Efecto celebración Gen Z
            btn.textContent = '¡Uff, enviado! 🔥';
            btn.style.background = 'linear-gradient(45deg, #00ff88, #00d4ff)';
            btn.style.color = '#0a0a0a';
            
            // Confetti effect simple
            createConfetti();
            
            contactForm.reset();
            
            setTimeout(() => {
                btn.textContent = originalText;
                btn.style.background = '';
                btn.style.color = '';
            }, 3500);
        }
    });
}

// Crear confetti simple
function createConfetti() {
    const colors = ['#00d4ff', '#ff006e', '#8f00ff', '#00ff88'];
    for (let i = 0; i < 20; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'fixed';
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.top = '-10px';
        confetti.style.width = '10px';
        confetti.style.height = '10px';
        confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.borderRadius = '50%';
        confetti.style.zIndex = '9999';
        confetti.style.pointerEvents = 'none';
        confetti.style.boxShadow = `0 0 10px ${confetti.style.background}`;
        
        document.body.appendChild(confetti);
        
        // Animación
        let top = -10;
        const speed = Math.random() * 3 + 2;
        const drift = (Math.random() - 0.5) * 2;
        
        const interval = setInterval(() => {
            top += speed;
            confetti.style.top = top + 'px';
            confetti.style.left = (parseFloat(confetti.style.left) + drift) + '%';
            confetti.style.opacity = 1 - (top / window.innerHeight);
            
            if (top > window.innerHeight) {
                clearInterval(interval);
                document.body.removeChild(confetti);
            }
        }, 30);
    }
}

// ============ SCROLL SUAVE ============
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            const element = document.querySelector(href);
            const navHeight = document.querySelector('.navbar').offsetHeight;
            const elementPosition = element.offsetTop - navHeight;
            
            window.scrollTo({
                top: elementPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ============ NAVBAR GLOW ============
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 8px 32px rgba(0, 212, 255, 0.2)';
        navbar.style.borderBottomColor = 'rgba(0, 212, 255, 0.3)';
    } else {
        navbar.style.boxShadow = 'none';
        navbar.style.borderBottomColor = '#2a2a4e';
    }
});

// ============ EMOJIS FLOAT ============
document.querySelectorAll('.interes-emoji').forEach(emoji => {
    emoji.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.2) rotate(20deg)';
    });
    emoji.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1) rotate(0deg)';
    });
});

// ============ GALERÍA PAGINADA + MODAL ============
const galeriaItems = document.querySelectorAll('.galeria-item');
const prevBtn = document.querySelector('.galeria-btn-prev');
const nextBtn = document.querySelector('.galeria-btn-next');
const galeriaModal = document.getElementById('galeriaModal');
const galeriaModalImg = document.querySelector('.galeria-modal-img');
const galeriaClose = document.querySelector('.galeria-close');

let currentPage = 0;
const itemsPerPage = 9; // mostrar 9 imágenes por página
let currentImageIndex = 0;

// Mostrar imágenes por página
function showPage(page) {
    galeriaItems.forEach((item, index) => {
        if (index >= page * itemsPerPage && index < (page + 1) * itemsPerPage) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}
if (galeriaItems.length > 0) showPage(currentPage);

// Botón anterior (paginación)
if (prevBtn) {
    prevBtn.addEventListener('click', () => {
        if (currentPage > 0) {
            currentPage--;
            showPage(currentPage);
        }
    });
}

// Botón siguiente (paginación)
if (nextBtn) {
    nextBtn.addEventListener('click', () => {
        if ((currentPage + 1) * itemsPerPage < galeriaItems.length) {
            currentPage++;
            showPage(currentPage);
        }
    });
}

// Abrir modal al hacer click en imagen
galeriaItems.forEach((item, index) => {
    item.addEventListener('click', () => {
        currentImageIndex = index;
        galeriaModalImg.src = item.querySelector('img').src;
        galeriaModal.classList.add('active');
    });
});

// Cerrar modal
if (galeriaClose) {
    galeriaClose.addEventListener('click', () => {
        galeriaModal.classList.remove('active');
    });
}
galeriaModal.addEventListener('click', (e) => {
    if (e.target === galeriaModal) {
        galeriaModal.classList.remove('active');
    }
});

// Navegación dentro del modal con flechas
if (prevBtn) {
    prevBtn.addEventListener('click', () => {
        currentImageIndex = (currentImageIndex - 1 + galeriaItems.length) % galeriaItems.length;
        galeriaModalImg.src = galeriaItems[currentImageIndex].querySelector('img').src;
    });
}
if (nextBtn) {
    nextBtn.addEventListener('click', () => {
        currentImageIndex = (currentImageIndex + 1) % galeriaItems.length;
        galeriaModalImg.src = galeriaItems[currentImageIndex].querySelector('img').src;
    });
}

// Navegación con teclado
document.addEventListener('keydown', (e) => {
    if (galeriaModal.classList.contains('active')) {
        if (e.key === 'ArrowLeft') {
            currentImageIndex = (currentImageIndex - 1 + galeriaItems.length) % galeriaItems.length;
            galeriaModalImg.src = galeriaItems[currentImageIndex].querySelector('img').src;
        } else if (e.key === 'ArrowRight') {
            currentImageIndex = (currentImageIndex + 1) % galeriaItems.length;
            galeriaModalImg.src = galeriaItems[currentImageIndex].querySelector('img').src;
        } else if (e.key === 'Escape') {
            galeriaModal.classList.remove('active');
        }
    }
});

// ============ CONTADOR REGRESIVO ============
function startCountdown() {
    const targetDate = new Date("Feb 12, 2036 00:00:00").getTime();
    const countdownElement = document.getElementById("countdown");

    setInterval(() => {
        const now = new Date().getTime();
        const distance = targetDate - now;

        if (distance < 0) {
        countdownElement.innerHTML = "¡Llegó el día! 🎉";
        return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        countdownElement.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;
    }, 1000);
}

startCountdown();


console.log('%c✨ Daniel Pachas - Web Loaded! 🚀', 'color: #00d4ff; font-size: 20px; font-weight: bold; text-shadow: 0 0 10px #00d4ff;');

