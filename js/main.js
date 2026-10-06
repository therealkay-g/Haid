// ===== MAIN.JS - Interactions Premium pour HAID =====

document.addEventListener('DOMContentLoaded', function() {
    
    // ===== PRELOADER =====
    const preloader = document.getElementById('preloader');
    if (preloader) {
        // Failsafe: hide preloader after 3 seconds anyway
        const failsafe = setTimeout(() => {
            preloader.classList.add('hidden');
        }, 3000);

        window.addEventListener('load', () => {
            clearTimeout(failsafe);
            setTimeout(() => {
                preloader.classList.add('hidden');
            }, 300);
        });
    }
    
    // ===== GSAP & SCROLLTRIGGER INIT =====
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        // Counter Animation for Dashboard
        const counters = document.querySelectorAll('.dash-value');
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            gsap.to(counter, {
                innerText: target,
                duration: 2,
                snap: { innerText: 1 },
                scrollTrigger: {
                    trigger: counter,
                    start: "top 90%",
                }
            });
        });

        // Section Reveal Animations
        gsap.utils.toArray('section').forEach(section => {
            gsap.from(section, {
                opacity: 0,
                y: 50,
                duration: 1,
                scrollTrigger: {
                    trigger: section,
                    start: "top 80%",
                    toggleActions: "play none none none"
                }
            });
        });
    }

    // ===== LENIS SMOOTH SCROLL =====
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        direction: 'vertical',
        gestureDirection: 'vertical',
        smooth: true,
        mouseMultiplier: 1,
        smoothTouch: false,
        touchMultiplier: 2,
        infinite: false,
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // ===== AOS INIT =====
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            easing: 'ease-out-expo',
            once: true,
            offset: 50,
            delay: 0,
        });
    }
    
    // ===== CUSTOM CURSOR =====
    const cursor = document.getElementById('cursor');
    const cursorFollower = document.getElementById('cursor-follower');
    
    if (cursor && cursorFollower && window.innerWidth >= 1024) {
        let mouseX = 0, mouseY = 0;
        let cursorX = 0, cursorY = 0;
        let followerX = 0, followerY = 0;
        
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });
        
        function animateCursor() {
            cursorX += (mouseX - cursorX) * 0.2;
            cursorY += (mouseY - cursorY) * 0.2;
            followerX += (mouseX - followerX) * 0.1;
            followerY += (mouseY - followerY) * 0.1;
            
            cursor.style.transform = `translate(${cursorX - 6}px, ${cursorY - 6}px)`;
            cursorFollower.style.transform = `translate(${followerX - 20}px, ${followerY - 20}px)`;
            
            requestAnimationFrame(animateCursor);
        }
        animateCursor();
        
        // Hover effects
        const hoverElements = document.querySelectorAll('a, button, .btn-primary, .btn-secondary, .action-card, .projet-card, .support-card, .bento-item');
        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursorFollower.style.width = '80px';
                cursorFollower.style.height = '80px';
                cursorFollower.style.backgroundColor = 'rgba(14, 77, 62, 0.1)';
                cursorFollower.style.borderColor = 'var(--accent-green)';
                cursor.style.transform = 'scale(2)';
            });
            el.addEventListener('mouseleave', () => {
                cursorFollower.style.width = '40px';
                cursorFollower.style.height = '40px';
                cursorFollower.style.backgroundColor = 'transparent';
                cursorFollower.style.borderColor = 'var(--accent-gold)';
                cursor.style.transform = 'scale(1)';
            });
        });

        // ===== MAGNETIC BUTTONS =====
        const magneticElements = document.querySelectorAll('.magnetic');
        magneticElements.forEach(el => {
            el.addEventListener('mousemove', function(e) {
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                this.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
                this.querySelector('span').style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
            });
            
            el.addEventListener('mouseleave', function() {
                this.style.transform = `translate(0px, 0px)`;
                this.querySelector('span').style.transform = `translate(0px, 0px)`;
            });
        });
    }
    
    // ===== MENU HAMBURGER =====
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });
        
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }
    
    // ===== HEADER SCROLL BEHAVIOR =====
    const header = document.getElementById('header');
    let lastScroll = 0;
    let ticking = false;
    
    function updateHeader() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.3)';
        } else {
            header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.2)';
        }
        
        if (currentScroll > lastScroll && currentScroll > 300) {
            header.classList.add('header-hidden');
        } else {
            header.classList.remove('header-hidden');
        }
        
        lastScroll = currentScroll;
        ticking = false;
    }
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateHeader);
            ticking = true;
        }
    });
    
    // ===== BACK TO TOP =====
    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 500) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        });
        
        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
    
    // ===== SMOOTH SCROLL INDICATOR =====
    const scrollIndicator = document.getElementById('scrollIndicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
            const nextSection = document.querySelector('.mission') || document.querySelector('section:nth-of-type(2)');
            if (nextSection) {
                nextSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
    
    // ===== ANIMATED COUNTERS =====
    const counters = document.querySelectorAll('[data-count]');
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-count'));
                const duration = 2000;
                const step = target / (duration / 16);
                let current = 0;
                
                const updateCounter = () => {
                    current += step;
                    if (current < target) {
                        counter.textContent = Math.floor(current).toLocaleString('fr-FR');
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target.toLocaleString('fr-FR');
                    }
                };
                
                updateCounter();
                counterObserver.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => counterObserver.observe(counter));
    
    // ===== WHATSAPP BUTTONS =====
    const phoneNumber = '243823662018';
    
    document.querySelectorAll('.btn-whatsapp').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            let message = "Bonjour HAID, je souhaite avoir plus d'informations.";
            if (this.dataset.message) message = this.dataset.message;
            const encodedMessage = encodeURIComponent(message);
            window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
        });
    });
    
    document.querySelectorAll('.btn-whatsapp-social').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const message = "Bonjour HAID, je vous contacte depuis votre site web.";
            const encodedMessage = encodeURIComponent(message);
            window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
        });
    });
    
    // ===== CALL BUTTONS =====
    document.querySelectorAll('.btn-call').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            window.location.href = `tel:+${phoneNumber}`;
        });
    });
    
    // ===== DONATE BUTTONS =====
    document.querySelectorAll('.btn-donate, .montant-btn').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            let montant = this.textContent.trim();
            let message = "Je souhaite faire un don";
            if (montant.includes('$') || montant.includes('€')) {
                message = `Je souhaite faire un don de ${montant}`;
            }
            const encodedMessage = encodeURIComponent(`Bonjour HAID, ${message}. Pouvez-vous me guider ?`);
            window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
        });
    });
    
    // ===== CONTACT FORM =====
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const nom = document.getElementById('nom')?.value || '';
            const prenom = document.getElementById('prenom')?.value || '';
            const email = document.getElementById('email')?.value || '';
            const telephone = document.getElementById('telephone')?.value || '';
            const sujet = document.getElementById('sujet')?.value || '';
            const message = document.getElementById('message')?.value || '';
            
            const sujets = {
                'information': 'Demande d\'information',
                'partenariat': 'Proposition de partenariat',
                'don': 'Question sur un don',
                'projet': 'Proposition de projet',
                'benevolat': 'Devenir bénévole',
                'presse': 'Demande presse / média',
                'autre': 'Autre'
            };
            
            const sujetLabel = sujets[sujet] || sujet;
            
            const whatsappMessage = `*Nouveau message depuis le site HAID*%0A%0A` +
                                   `*Nom:* ${nom} ${prenom}%0A` +
                                   `*Email:* ${email}%0A` +
                                   `*Téléphone:* ${telephone || 'Non fourni'}%0A` +
                                   `*Sujet:* ${sujetLabel}%0A` +
                                   `*Message:*%0A${message}`;
            
            window.open(`https://wa.me/${phoneNumber}?text=${whatsappMessage}`, '_blank');
            
            // Show success
            const formSuccess = document.getElementById('formSuccess');
            if (formSuccess) {
                formSuccess.classList.add('show');
                setTimeout(() => {
                    formSuccess.classList.remove('show');
                }, 5000);
            }
        });
    }
    
    // ===== NEWSLETTER FORMS =====
    document.querySelectorAll('#newsletterForm, #footerNewsletterForm').forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            const message = `Bonjour HAID, je souhaite m'inscrire à votre newsletter. Mon email : ${email}`;
            const encodedMessage = encodeURIComponent(message);
            window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
        });
    });
    
    // ===== PROJECT BUTTONS =====
    document.querySelectorAll('.btn-projet').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            let projetTitre = "un projet";
            if (this.dataset.projet) {
                projetTitre = this.dataset.projet;
            } else {
                const projetCard = this.closest('.projet-item, .projet-card');
                const titreElem = projetCard?.querySelector('h3, h4');
                if (titreElem) projetTitre = titreElem.textContent;
            }
            const message = `Bonjour HAID, je souhaite avoir plus d'informations sur le projet : *${projetTitre}*.`;
            const encodedMessage = encodeURIComponent(message);
            window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
        });
    });
    
    // ===== PROJECT FILTERS =====
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projetCards = document.querySelectorAll('.projet-card');
    
    if (filterButtons.length > 0 && projetCards.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                const filterValue = button.getAttribute('data-filter');
                
                projetCards.forEach(card => {
                    if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                        card.style.display = 'block';
                        card.style.animation = 'fadeIn 0.5s ease';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
        
        // Check URL params for filter
        const urlParams = new URLSearchParams(window.location.search);
        const filterParam = urlParams.get('filter');
        if (filterParam) {
            const targetBtn = document.querySelector(`.filter-btn[data-filter="${filterParam}"]`);
            if (targetBtn) targetBtn.click();
        }
    }
    
    // ===== TESTIMONIALS SLIDER =====
    const testimonialCards = document.querySelectorAll('.temoignage-card');
    const testimonialDots = document.querySelectorAll('.temoignage-dot');
    let currentTestimonial = 0;
    let testimonialInterval;
    
    function showTestimonial(index) {
        testimonialCards.forEach((card, i) => {
            card.classList.toggle('active', i === index);
        });
        testimonialDots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
        currentTestimonial = index;
    }
    
    testimonialDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showTestimonial(index);
            resetTestimonialInterval();
        });
    });
    
    function nextTestimonial() {
        const next = (currentTestimonial + 1) % testimonialCards.length;
        showTestimonial(next);
    }
    
    function resetTestimonialInterval() {
        clearInterval(testimonialInterval);
        testimonialInterval = setInterval(nextTestimonial, 6000);
    }
    
    if (testimonialCards.length > 0) {
        resetTestimonialInterval();
    }
    
    // ===== LEAFLET MAP =====
    const mapContainer = document.getElementById('map');
    if (mapContainer && typeof L !== 'undefined') {
        const map = L.map('map').setView([-2.88, 23.65], 5);
        
        L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
            subdomains: 'abcd',
            maxZoom: 20
        }).addTo(map);

        // Custom Marker Icon
        const customIcon = L.divIcon({
            className: 'custom-div-icon',
            html: "<div style='background-color: var(--glitch-emeraude); width: 15px; height: 15px; border-radius: 50%; border: 3px solid white; box-shadow: 0 0 10px var(--glitch-emeraude);'></div>",
            iconSize: [15, 15],
            iconAnchor: [7, 7]
        });
        
        // Project locations
        const locations = [
            { lat: 2.85, lng: 24.45, title: 'Bas-Uélé - Électrification scolaire', type: 'solaire' },
            { lat: 0.52, lng: 25.19, title: 'Tshopo - Cartographie Yangambi', type: 'drones' },
            { lat: -5.03, lng: 14.76, title: 'Kongo Central - EIES Agroforestier', type: 'etudes' },
            { lat: -5.12, lng: 18.42, title: 'Kwango - Centres de santé solaires', type: 'solaire' },
            { lat: -1.66, lng: 29.22, title: 'Goma - Formation drones', type: 'drones' },
            { lat: 0.77, lng: 18.08, title: 'Équateur - Biodiversité Lac Tumba', type: 'etudes' },
            { lat: -4.32, lng: 15.31, title: 'Kinshasa - Siège HAID', type: 'siege' }
        ];
        
        const colors = {
            solaire: '#D4AF37',
            drones: '#2DD4BF',
            etudes: '#4CAF50',
            siege: '#EF4444'
        };
        
        locations.forEach(loc => {
            L.marker([loc.lat, loc.lng], { icon: customIcon }).addTo(map)
                .bindPopup(`<b>${loc.title}</b><br>${loc.type}`);
        });
    }
    
    // ===== CURRENT YEAR =====
    const yearElements = document.querySelectorAll('#currentYear');
    yearElements.forEach(el => {
        el.textContent = new Date().getFullYear();
    });
    
    // ===== PARTICLES (simple) =====
    const particlesContainer = document.getElementById('particles');
    if (particlesContainer) {
        const particleCount = 25;
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: absolute;
                width: ${Math.random() * 4 + 1}px;
                height: ${Math.random() * 4 + 1}px;
                background: rgba(45, 212, 191, ${Math.random() * 0.3 + 0.1});
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: float ${Math.random() * 10 + 10}s infinite ease-in-out;
                pointer-events: none;
            `;
            particlesContainer.appendChild(particle);
        }
    }
    
    // ===== LANGUAGE SWITCHER =====
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const lang = this.dataset.lang;
            // Store preference
            localStorage.setItem('haid-lang', lang);
            // In a real implementation, this would switch the page language
            console.log(`Language switched to: ${lang}`);
        });
    });
    
    // ===== SCROLL REVEAL (fallback for elements without AOS) =====
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, { threshold: 0.1 });
    
    revealElements.forEach(el => revealObserver.observe(el));
    
    console.log('%c✅ HAID Ultra-Premium Site Loaded', 'color: #D4AF37; font-size: 14px; font-weight: bold;');
    console.log('%c📱 WhatsApp integration active', 'color: #25D366;');
    console.log('%c🎨 Custom cursor enabled (Gold & Forest)', 'color: #0E4D3E;');
    console.log('%c✨ AOS animations initialized', 'color: #D4AF37;');
});

// ===== FLOATING ANIMATION KEYFRAMES (injected via JS) =====
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0%, 100% { transform: translateY(0) translateX(0); }
        25% { transform: translateY(-20px) translateX(10px); }
        50% { transform: translateY(-10px) translateX(-10px); }
        75% { transform: translateY(-30px) translateX(5px); }
    }
`;
document.head.appendChild(style);