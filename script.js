/* ═══════════════════════════════════════════════════════════
   LUXORA AESTHETICS — Premium Aesthetic Clinic
   Interactive JavaScript Module
   ═══════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    /* ─── Preloader ─── */
    const preloader = document.getElementById('preloader');
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.classList.add('loaded');
            triggerHeroAnimations();
        }, 2000);
    });

    // Fallback if load event already fired
    if (document.readyState === 'complete') {
        setTimeout(() => {
            preloader.classList.add('loaded');
            triggerHeroAnimations();
        }, 2000);
    }

    /* ─── Hero Load Animations ─── */
    function triggerHeroAnimations() {
        const heroElements = document.querySelectorAll('.animate-on-load');
        heroElements.forEach((el, i) => {
            setTimeout(() => {
                el.classList.add('visible');
            }, i * 150);
        });

        // Start counting stats
        startHeroCounting();
    }

    /* ─── Navbar Scroll Effect ─── */
    const navbar = document.getElementById('navbar');
    const whatsappFloat = document.getElementById('whatsappFloat');
    const backToTop = document.getElementById('backToTop');

    function handleScroll() {
        const scrollY = window.scrollY;

        // Navbar
        if (scrollY > 80) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // WhatsApp Float
        if (scrollY > 600) {
            whatsappFloat.classList.add('visible');
        } else {
            whatsappFloat.classList.remove('visible');
        }

        // Back to Top
        if (scrollY > 1000) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // Back to Top click
    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    /* ─── Mobile Navigation ─── */
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');

    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navLinks.classList.toggle('open');
        document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
    });

    // Close menu on link click
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navLinks.classList.remove('open');
            document.body.style.overflow = '';
        });
    });

    /* ─── Active Nav Link Highlighting ─── */
    const sections = document.querySelectorAll('section[id]');

    function highlightNav() {
        const scrollY = window.scrollY + 200;
        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');
            const navLink = navLinks.querySelector(`a[href="#${id}"]`);

            if (navLink) {
                if (scrollY >= top && scrollY < top + height) {
                    navLink.style.color = '#D4AF37';
                } else {
                    navLink.style.color = '';
                }
            }
        });
    }

    window.addEventListener('scroll', highlightNav, { passive: true });

    /* ─── Scroll Reveal Animation ─── */
    const scrollRevealElements = document.querySelectorAll('.scroll-reveal');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.dataset.delay || 0;
                setTimeout(() => {
                    entry.target.classList.add('revealed');
                }, parseInt(delay));
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    scrollRevealElements.forEach(el => revealObserver.observe(el));

    /* ─── Counter Animation ─── */
    function animateCounter(el, target, duration = 2000) {
        let start = 0;
        const startTime = performance.now();

        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(eased * target);

            el.textContent = current.toLocaleString();

            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                el.textContent = target.toLocaleString();
            }
        }

        requestAnimationFrame(update);
    }

    function startHeroCounting() {
        document.querySelectorAll('.hero-stat-num').forEach(el => {
            const target = parseInt(el.dataset.count);
            if (target) {
                animateCounter(el, target, 2500);
            }
        });
    }

    // Parallax stats counter
    const statNumbers = document.querySelectorAll('.stat-number');
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.dataset.count);
                if (target) {
                    animateCounter(entry.target, target, 2000);
                }
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(el => statsObserver.observe(el));

    /* ─── Before & After Slider ─── */
    function initBASlider(sliderId, handleId) {
        const slider = document.getElementById(sliderId);
        const handle = document.getElementById(handleId);
        if (!slider || !handle) return;

        const beforeImg = slider.querySelector('.ba-before');
        let isDragging = false;

        function updateSlider(x) {
            const rect = slider.getBoundingClientRect();
            let percent = ((x - rect.left) / rect.width) * 100;
            percent = Math.max(2, Math.min(98, percent));
            beforeImg.style.clipPath = `inset(0 ${100 - percent}% 0 0)`;
            handle.style.left = percent + '%';
        }

        // Mouse events
        handle.addEventListener('mousedown', (e) => {
            e.preventDefault();
            isDragging = true;
            slider.style.cursor = 'col-resize';
        });

        slider.addEventListener('mousedown', (e) => {
            isDragging = true;
            updateSlider(e.clientX);
        });

        document.addEventListener('mousemove', (e) => {
            if (isDragging) {
                updateSlider(e.clientX);
            }
        });

        document.addEventListener('mouseup', () => {
            isDragging = false;
            slider.style.cursor = 'col-resize';
        });

        // Touch events
        handle.addEventListener('touchstart', (e) => {
            isDragging = true;
        }, { passive: true });

        slider.addEventListener('touchstart', (e) => {
            isDragging = true;
            updateSlider(e.touches[0].clientX);
        }, { passive: true });

        document.addEventListener('touchmove', (e) => {
            if (isDragging) {
                updateSlider(e.touches[0].clientX);
            }
        }, { passive: true });

        document.addEventListener('touchend', () => {
            isDragging = false;
        });
    }

    initBASlider('baSlider1', 'baHandle1');

    /* ─── Lightbox Gallery ─── */
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxCaption = document.getElementById('lightboxCaption');
    const lightboxClose = document.getElementById('lightboxClose');
    const lightboxPrev = document.getElementById('lightboxPrev');
    const lightboxNext = document.getElementById('lightboxNext');
    const galleryItems = document.querySelectorAll('.masonry-item');
    let currentLightboxIndex = 0;

    function openLightbox(index) {
        currentLightboxIndex = index;
        const item = galleryItems[index];
        const img = item.querySelector('img');
        const caption = item.dataset.caption || '';

        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        lightboxCaption.textContent = caption;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

    function nextImage() {
        currentLightboxIndex = (currentLightboxIndex + 1) % galleryItems.length;
        openLightbox(currentLightboxIndex);
    }

    function prevImage() {
        currentLightboxIndex = (currentLightboxIndex - 1 + galleryItems.length) % galleryItems.length;
        openLightbox(currentLightboxIndex);
    }

    galleryItems.forEach((item, i) => {
        item.addEventListener('click', () => openLightbox(i));
    });

    lightboxClose.addEventListener('click', closeLightbox);
    lightboxNext.addEventListener('click', nextImage);
    lightboxPrev.addEventListener('click', prevImage);

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowRight') nextImage();
        if (e.key === 'ArrowLeft') prevImage();
    });

    /* ─── Testimonial Carousel ─── */
    const track = document.getElementById('testimonialTrack');
    const cards = track.querySelectorAll('.testimonial-card');
    const dotsContainer = document.getElementById('carouselDots');
    const prevBtn = document.getElementById('carouselPrev');
    const nextBtn = document.getElementById('carouselNext');
    let currentSlide = 0;
    let autoplayInterval;

    // Create dots
    cards.forEach((_, i) => {
        const dot = document.createElement('button');
        dot.classList.add('carousel-dot');
        dot.setAttribute('aria-label', `Go to testimonial ${i + 1}`);
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(i));
        dotsContainer.appendChild(dot);
    });

    function goToSlide(index) {
        currentSlide = index;
        track.style.transform = `translateX(-${index * 100}%)`;

        dotsContainer.querySelectorAll('.carousel-dot').forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    }

    function nextSlide() {
        goToSlide((currentSlide + 1) % cards.length);
    }

    function prevSlide() {
        goToSlide((currentSlide - 1 + cards.length) % cards.length);
    }

    nextBtn.addEventListener('click', () => {
        nextSlide();
        resetAutoplay();
    });

    prevBtn.addEventListener('click', () => {
        prevSlide();
        resetAutoplay();
    });

    // Autoplay
    function startAutoplay() {
        autoplayInterval = setInterval(nextSlide, 5000);
    }

    function resetAutoplay() {
        clearInterval(autoplayInterval);
        startAutoplay();
    }

    startAutoplay();

    // Swipe support
    let touchStartX = 0;
    let touchEndX = 0;

    track.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
    }, { passive: true });

    track.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].clientX;
        const diff = touchStartX - touchEndX;
        if (Math.abs(diff) > 50) {
            if (diff > 0) nextSlide();
            else prevSlide();
            resetAutoplay();
        }
    }, { passive: true });

    /* ─── Booking Form → WhatsApp ─── */
    const bookingForm = document.getElementById('bookingForm');

    bookingForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('bookName').value.trim();
        const phone = document.getElementById('bookPhone').value.trim();
        const treatment = document.getElementById('bookTreatment').value;

        if (!name || !phone || !treatment) {
            alert('Please fill in all fields.');
            return;
        }

        const message = encodeURIComponent(
            `Hello, I want to book a consultation.\n\n` +
            `Name: ${name}\n` +
            `Phone: ${phone}\n` +
            `Treatment: ${treatment}`
        );

        const whatsappUrl = `https://wa.me/15551234567?text=${message}`;
        window.open(whatsappUrl, '_blank');

        // Show success feedback
        const submitBtn = document.getElementById('bookSubmit');
        const originalContent = submitBtn.innerHTML;
        submitBtn.innerHTML = '<span>✓ Opening WhatsApp...</span>';
        submitBtn.style.background = 'linear-gradient(135deg, #25D366, #128C7E)';

        setTimeout(() => {
            submitBtn.innerHTML = originalContent;
            submitBtn.style.background = '';
            bookingForm.reset();
        }, 3000);
    });

    /* ─── Smooth Scroll for All Anchor Links ─── */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetEl = document.querySelector(targetId);
            if (targetEl) {
                e.preventDefault();
                targetEl.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    /* ─── Parallax Effect on Scroll ─── */
    function parallaxEffect() {
        const parallaxBgs = document.querySelectorAll('.parallax-bg');
        parallaxBgs.forEach(bg => {
            const parent = bg.parentElement;
            const rect = parent.getBoundingClientRect();
            const scrollPercent = rect.top / window.innerHeight;
            const translateY = scrollPercent * 40;
            bg.style.transform = `translateY(${translateY}px)`;
        });
    }

    window.addEventListener('scroll', parallaxEffect, { passive: true });

    /* ─── Image Lazy Load Enhancement ─── */
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    const imgObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.style.opacity = '0';
                img.style.transition = 'opacity 0.6s ease';

                if (img.complete) {
                    img.style.opacity = '1';
                } else {
                    img.addEventListener('load', () => {
                        img.style.opacity = '1';
                    });
                }
                imgObserver.unobserve(img);
            }
        });
    }, { rootMargin: '100px' });

    lazyImages.forEach(img => imgObserver.observe(img));

    /* ─── Keyboard Accessibility ─── */
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-nav');
        }
    });

    document.addEventListener('mousedown', () => {
        document.body.classList.remove('keyboard-nav');
    });
});
