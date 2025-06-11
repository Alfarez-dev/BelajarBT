document.addEventListener("DOMContentLoaded", function () {
        const rows = document.querySelectorAll("section .row");
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                }
            });
        }, { threshold: 0.2 });

        rows.forEach(row => {
            row.classList.add("fade-in-row");
            observer.observe(row);
        });
    });

            const scrollBtn = document.createElement('button');
    scrollBtn.innerHTML = '<i class="bi bi-arrow-up"></i>';
    scrollBtn.setAttribute('type', 'button');
    scrollBtn.setAttribute('aria-label', 'Scroll to top');
    scrollBtn.style.position = 'fixed';
    scrollBtn.style.bottom = '32px';
    scrollBtn.style.right = '32px';
    scrollBtn.style.zIndex = '9999';
    scrollBtn.style.background = '#641B2E';
    scrollBtn.style.color = '#fff';
    scrollBtn.style.border = 'none';
    scrollBtn.style.borderRadius = '50%';
    scrollBtn.style.width = '48px';
    scrollBtn.style.height = '48px';
    scrollBtn.style.display = 'none';
    scrollBtn.style.boxShadow = '0 4px 16px rgba(0,0,0,0.18)';
    scrollBtn.style.fontSize = '1.5rem';
    scrollBtn.style.transition = 'opacity 0.3s';

    document.body.appendChild(scrollBtn);

    window.addEventListener('scroll', function () {
        if (window.scrollY > 300) {
            scrollBtn.style.display = 'block';
            scrollBtn.style.opacity = '1';
        } else {
            scrollBtn.style.opacity = '0';
            setTimeout(() => {
                if (window.scrollY <= 300) scrollBtn.style.display = 'none';
            }, 300);
        }
    });

    scrollBtn.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });