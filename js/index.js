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

    // Scroll to Top Button
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

                    // Swiper init for mobile only
                if (window.innerWidth < 768) {
                    new Swiper('.materi-swiper', {
                        slidesPerView: 1,
                        spaceBetween: 16,
                        pagination: {
                            el: '.swiper-pagination',
                            clickable: true,
                        },
                    });
                }

                // Filter button logic
            document.addEventListener("DOMContentLoaded", function () {
                const filterBtns = document.querySelectorAll('.filter-btn');
                const cards = document.querySelectorAll('#materi-cards .card');

                function filterCards(category) {
                    cards.forEach(card => {
                        // Show cards matching the selected category or popular
                        if (category === 'popular') {
                            card.style.display = card.dataset.category.includes('popular') ? '' : 'none';
                        } else {
                            card.style.display = (card.dataset.category.split(' ').includes(category)) ? '' : 'none';
                        }
                    });
                }

                filterBtns.forEach(btn => {
                    btn.addEventListener('click', function () {
                        filterBtns.forEach(b => b.classList.remove('active'));
                        this.classList.add('active');
                        filterCards(this.dataset.filter);
                    });
                });

                // Initial state: show only popular
                filterCards('popular');
            });

document.addEventListener("DOMContentLoaded", function () {
                const form = document.getElementById('kontakForm');
                // Modal Bootstrap 5
                let successModal = null;
                if (typeof bootstrap !== "undefined") {
                    successModal = new bootstrap.Modal(document.getElementById('formSuccessModal'));
                }

                form.addEventListener('submit', function (e) {
                    e.preventDefault();
                    let valid = true;

                    // Nama
                    const nama = form.nama;
                    if (!nama.value.trim()) {
                        nama.classList.add('is-invalid');
                        valid = false;
                    } else {
                        nama.classList.remove('is-invalid');
                    }

                    // Email
                    const email = form.email;
                    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!email.value.trim() || !emailPattern.test(email.value)) {
                        email.classList.add('is-invalid');
                        valid = false;
                    } else {
                        email.classList.remove('is-invalid');
                    }

                    // Pesan
                    const pesan = form.pesan;
                    if (!pesan.value.trim()) {
                        pesan.classList.add('is-invalid');
                        valid = false;
                    } else {
                        pesan.classList.remove('is-invalid');
                    }

                    if (valid) {
                        form.reset();
                        if (successModal) {
                            successModal.show();
                        }
                    }
                });

                // Remove invalid on input
                ['nama', 'email', 'pesan'].forEach(id => {
                    form[id].addEventListener('input', function () {
                        this.classList.remove('is-invalid');
                    });
                });
            });