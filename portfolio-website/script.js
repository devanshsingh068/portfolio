document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide Icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // --- ACCENT PALETTE SWITCHER ---
    const dots = document.querySelectorAll('.palette-dot');
    
    // Load saved accent theme
    const savedTheme = localStorage.getItem('accent-theme');
    if (savedTheme) {
        setAccentTheme(savedTheme);
        dots.forEach(dot => {
            if (dot.dataset.theme === savedTheme) {
                dots.forEach(d => d.classList.remove('active'));
                dot.classList.add('active');
            }
        });
    }

    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            const theme = dot.dataset.theme;
            dots.forEach(d => d.classList.remove('active'));
            dot.classList.add('active');
            setAccentTheme(theme);
            localStorage.setItem('accent-theme', theme);
        });
    });

    function setAccentTheme(theme) {
        document.body.classList.remove('theme-terracotta', 'theme-teal', 'theme-purple');
        if (theme !== 'blue') {
            document.body.classList.add(`theme-${theme}`);
        }
    }

    // --- DARK / LIGHT HYBRID TOGGLE ---
    const modeToggle = document.getElementById('modeToggle');
    
    // Load saved dark mode preference
    const savedMode = localStorage.getItem('dark-mode');
    if (savedMode === 'enabled') {
        document.body.classList.add('dark-hybrid-mode');
        updateModeToggleIcon(true);
    }

    if (modeToggle) {
        modeToggle.addEventListener('click', () => {
            const isDark = document.body.classList.toggle('dark-hybrid-mode');
            localStorage.setItem('dark-mode', isDark ? 'enabled' : 'disabled');
            updateModeToggleIcon(isDark);
        });
    }

    function updateModeToggleIcon(isDark) {
        if (!modeToggle) return;
        const icon = modeToggle.querySelector('i');
        if (icon && typeof lucide !== 'undefined') {
            icon.setAttribute('data-lucide', isDark ? 'sun' : 'moon');
            lucide.createIcons({
                attrs: {
                    class: 'lucide-icon'
                },
                nameAttr: 'data-lucide'
            });
        }
    }

    // --- MOBILE HAMBURGER TOGGLE ---
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('open');
            navLinks.classList.toggle('open');
        });

        // Close mobile menu when a navlink is clicked
        const links = navLinks.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('open');
                navLinks.classList.remove('open');
            });
        });
    }

    // --- DYNAMIC HERO TYPING EFFECT ---
    const typingText = document.getElementById('typing-text');
    if (typingText) {
        const words = ['Premium Web Apps.', 'Responsive Frontends.', 'Bento-style Interfaces.', 'Interactive Graphics.'];
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function type() {
            const currentWord = words[wordIndex];
            if (isDeleting) {
                typingText.textContent = currentWord.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typingText.textContent = currentWord.substring(0, charIndex + 1);
                charIndex++;
            }

            let typeSpeed = isDeleting ? 40 : 100;

            if (!isDeleting && charIndex === currentWord.length) {
                // Pause at complete word
                typeSpeed = 1500;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                typeSpeed = 500;
            }

            setTimeout(type, typeSpeed);
        }

        setTimeout(type, 1000);
    }

    // --- INTERSECTION OBSERVER FOR FADE-IN ANIMATIONS ---
    const faders = document.querySelectorAll('.fade-in');
    const appearOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const appearOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('appear');
            
            // Trigger specific sub-animations
            // Progress bars
            const progressBars = entry.target.querySelectorAll('.skill-progress');
            if (progressBars.length > 0) {
                progressBars.forEach(bar => {
                    bar.style.width = bar.dataset.width;
                });
            }

            // Stat counters
            const counters = entry.target.querySelectorAll('.stat-num');
            if (counters.length > 0) {
                counters.forEach(counter => {
                    animateCounter(counter);
                });
            }

            observer.unobserve(entry.target);
        });
    }, appearOptions);

    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });

    // --- ANIMATE STAT NUMBERS COUNTER ---
    function animateCounter(counterElement) {
        const target = parseInt(counterElement.dataset.count, 10);
        let count = 0;
        const speed = 1500; // Counter animation length in ms
        const increment = Math.max(1, Math.ceil(target / (speed / 30))); // Step increment
        
        const timer = setInterval(() => {
            count += increment;
            if (count >= target) {
                counterElement.textContent = target + (target > 5 ? '+' : '');
                clearInterval(timer);
            } else {
                counterElement.textContent = count;
            }
        }, 30);
    }

    // --- 3D INTERACTIVE TILT EFFECT ---
    const tiltCards = document.querySelectorAll('[data-tilt]');
    
    // Detect mobile to disable tilt (performance/UX friendly)
    const isMobile = window.matchMedia("(max-width: 768px)").matches;

    if (!isMobile) {
        tiltCards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left; // x coordinate inside element
                const y = e.clientY - rect.top;  // y coordinate inside element
                
                // Calculate percentage offsets
                const percentX = (x / rect.width) - 0.5;
                const percentY = (y / rect.height) - 0.5;
                
                // Max degrees of rotation
                const maxRotation = 12;
                
                // Tilt rotation formulas
                const rotateX = -percentY * maxRotation;
                const rotateY = percentX * maxRotation;
                
                // Perform transform
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
                
                // Translate internal child nodes slightly (3D Parallax effect)
                const internalElements = card.querySelectorAll('.project-details, .about-meta-grid, .avatar-wrapper, .skill-list');
                internalElements.forEach(el => {
                    el.style.transform = `translateZ(20px)`;
                });
            });

            card.addEventListener('mouseleave', () => {
                // Reset card transform smoothly
                card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
                
                // Reset internal translation
                const internalElements = card.querySelectorAll('.project-details, .about-meta-grid, .avatar-wrapper, .skill-list');
                internalElements.forEach(el => {
                    el.style.transform = `translateZ(0px)`;
                });
            });
        });
    }

    // --- PROJECTS FILTER LOGIC ---
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    if (filterBtns.length > 0 && projectCards.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const filter = btn.dataset.filter;
                
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                projectCards.forEach(card => {
                    const category = card.dataset.category;
                    
                    if (filter === 'all' || category === filter) {
                        card.style.display = 'flex';
                        // Add fade-in appearance
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'scale(1)';
                        }, 50);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'scale(0.9)';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }

    // --- CONTACT FORM MOCK SUBMISSION ---
    const contactForm = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');

    if (contactForm && formSuccess) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Select submit button and show loading state
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalHtml = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = 'Sending... <i data-lucide="loader" class="animate-spin"></i>';
            if (typeof lucide !== 'undefined') {
                lucide.createIcons();
            }

            // Simulate form dispatching delay
            setTimeout(() => {
                contactForm.style.display = 'none';
                formSuccess.style.display = 'block';
                formSuccess.style.opacity = '0';
                
                // Smooth success fade-in
                setTimeout(() => {
                    formSuccess.style.transition = 'opacity 0.6s ease';
                    formSuccess.style.opacity = '1';
                }, 50);
            }, 1500);
        });
    }
});
