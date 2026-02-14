// ============ CONTROLES PERSONALIZADOS DEL VIDEO ============
(function() {
    const video = document.getElementById('futuroVideo');
    if (!video) return;

    const container = video.closest('.futuro-video-container');
    const playBtn = container.querySelector('.vc-play');
    const progress = container.querySelector('.vc-progress');
    const progressFilled = container.querySelector('.vc-progress-filled');
    const timeDisplay = container.querySelector('.vc-time');
    const volumeSlider = container.querySelector('.vc-volume');
    const fullscreenBtn = container.querySelector('.vc-fullscreen');

    function formatTime(seconds) {
        if (isNaN(seconds)) return '0:00';
        const m = Math.floor(seconds / 60);
        const s = Math.floor(seconds % 60).toString().padStart(2, '0');
        return `${m}:${s}`;
    }

    function updatePlayIcon() {
        const icon = video.paused ? '<i class="fas fa-play" aria-hidden="true"></i>' : '<i class="fas fa-pause" aria-hidden="true"></i>';
        playBtn.innerHTML = icon;
        playBtn.setAttribute('aria-label', video.paused ? 'Reproducir' : 'Pausar');
    }

    function updateProgress() {
        const pct = (video.currentTime / video.duration) * 100;
        progressFilled.style.width = isNaN(pct) ? '0%' : pct + '%';
        timeDisplay.textContent = `${formatTime(video.currentTime)} / ${formatTime(video.duration)}`;
    }

    function togglePlay() { if (video.paused) video.play(); else video.pause(); }

    playBtn.addEventListener('click', togglePlay);
    video.addEventListener('play', updatePlayIcon);
    video.addEventListener('pause', updatePlayIcon);
    video.addEventListener('timeupdate', updateProgress);
    video.addEventListener('loadedmetadata', updateProgress);

    progress.addEventListener('click', (e) => {
        const rect = progress.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const pct = x / rect.width;
        video.currentTime = pct * video.duration;
    });

    volumeSlider.addEventListener('input', () => {
        video.volume = parseFloat(volumeSlider.value);
        video.muted = video.volume === 0;
    });

    fullscreenBtn.addEventListener('click', () => {
        const el = container;
        if (!document.fullscreenElement) {
            if (el.requestFullscreen) el.requestFullscreen();
            else if (el.webkitRequestFullscreen) el.webkitRequestFullscreen();
        } else {
            if (document.exitFullscreen) document.exitFullscreen();
            else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
        }
    });


    let hideTimeout;
    function showControls() {
        const controls = container.querySelector('.video-controls');
        controls.style.opacity = '0.98';
        clearTimeout(hideTimeout);
        hideTimeout = setTimeout(() => { controls.style.opacity = '0.92'; }, 3000);
    }
    container.addEventListener('mousemove', showControls);
    container.addEventListener('mouseleave', () => { container.querySelector('.video-controls').style.opacity = '0.85'; });


    container.addEventListener('keydown', (e) => {
        if (e.key === ' ' || e.key === 'k') { e.preventDefault(); togglePlay(); }
        if (e.key === 'f') {
            if (!document.fullscreenElement) container.requestFullscreen(); else document.exitFullscreen();
        }
        if (e.key === 'ArrowRight') video.currentTime = Math.min(video.duration, video.currentTime + 5);
        if (e.key === 'ArrowLeft') video.currentTime = Math.max(0, video.currentTime - 5);
    });

    updatePlayIcon();
    updateProgress();
})();
// ============ MENU RESPONSIVE ============
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active'); 
    navLinks.classList.toggle('active');     
});

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            navLinks.classList.remove('active');
            menuToggle.classList.remove('active');
        }
    });
});

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
const itemsPerPage = 9; 
let currentImageIndex = 0;

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

if (prevBtn) {
    prevBtn.addEventListener('click', () => {
        if (currentPage > 0) {
            currentPage--;
            showPage(currentPage);
        }
    });
}

if (nextBtn) {
    nextBtn.addEventListener('click', () => {
        if ((currentPage + 1) * itemsPerPage < galeriaItems.length) {
            currentPage++;
            showPage(currentPage);
        }
    });
}

galeriaItems.forEach((item, index) => {
    item.addEventListener('click', () => {
        currentImageIndex = index;
        galeriaModalImg.src = item.querySelector('img').src;
        galeriaModal.classList.add('active');
    });
});

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

