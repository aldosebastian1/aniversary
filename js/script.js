        document.addEventListener('DOMContentLoaded', function() {
            // --- Particle Creation ---
            const particlesContainer = document.getElementById('particles');
            const particleEmojis = ['❤', '✨', '💖', '💕', '⭐', '🌸'];
            for (let i = 0; i < 20; i++) {
                const particle = document.createElement('div');
                particle.className = 'particle';
                particle.textContent = particleEmojis[Math.floor(Math.random() * particleEmojis.length)];
                particle.style.left = `${Math.random() * 100}%`;
                particle.style.animationDuration = `${Math.random() * 10 + 15}s`;
                particle.style.animationDelay = `${Math.random() * 5}s`;
                particlesContainer.appendChild(particle);
            }
            
            // --- Animate Counter ---
            const dayCounter = document.getElementById('dayCounter');
            const animateCount = (element, start, end, duration) => {
                let startTime = null;
                const step = (timestamp) => {
                    if (!startTime) startTime = timestamp;
                    const progress = Math.min((timestamp - startTime) / duration, 1);
                    element.textContent = Math.floor(progress * (end - start) + start);
                    if (progress < 1) {
                        window.requestAnimationFrame(step);
                    }
                };
                window.requestAnimationFrame(step);
            };

            // --- Scroll Animations using Intersection Observer ---
            const observerOptions = {
                root: null,
                rootMargin: '0px',
                threshold: 0.1
            };

            const observer = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');

                        // Animate counter only once when it becomes visible
                        if (entry.target.id === 'dayCounter' && !entry.target.hasAnimated) {
                            animateCount(dayCounter, 0, 365, 2000);
                            entry.target.hasAnimated = true; // custom property to prevent re-animation
                        }
                        
                        observer.unobserve(entry.target);
                    }
                });
            }, observerOptions);

            document.querySelectorAll('.polaroid, .timeline-item, .memory-card, #dayCounter').forEach(el => {
                observer.observe(el);
            });


            // --- Interactive Stickers ---
             const stickers = document.querySelectorAll('.sticker, .heart-decoration');
             stickers.forEach(sticker => {
                 sticker.addEventListener('click', function(e) {
                     const heart = document.createElement('div');
                     heart.innerHTML = '💖';
                     heart.style.position = 'absolute';
                     heart.style.left = `${e.clientX}px`;
                     heart.style.top = `${e.clientY}px`;
                     heart.style.fontSize = '2em';
                     heart.style.pointerEvents = 'none';
                     heart.style.animation = 'float-up-and-fade 2s ease-out forwards';
                     heart.style.zIndex = '1000';
                     document.body.appendChild(heart);
                     
                     setTimeout(() => heart.remove(), 2000);
                 });
             });
        });

        // --- Add dynamic CSS for JS-based animations ---
        const styleSheet = document.createElement("style");
        styleSheet.type = "text/css";
        styleSheet.innerText = `
            @keyframes float-up-and-fade {
                0% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
                100% { transform: translate(-50%, -150px) scale(0.5); opacity: 0; }
            }
            @keyframes heart-beat {
                0%, 100% { transform: scale(1); }
                10%, 30% { transform: scale(0.9); }
                20%, 40% { transform: scale(1.1); }
            }
        `;
        document.head.appendChild(styleSheet);