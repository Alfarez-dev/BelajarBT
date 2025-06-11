document.addEventListener("DOMContentLoaded", function () {
    const quizForm = document.getElementById('quizForm');
            const quizResult = document.getElementById('quizResult');
            const quizProgressBar = document.getElementById('quizProgressBar');
            const quizProgress = document.getElementById('quizProgress');
            if (quizForm) {
                quizForm.addEventListener('submit', function (e) {
                    e.preventDefault();
                    let score = 0;
                    const answers = {
                        q1: "Sedih",
                        q2: "Moderato",
                        q3: "Largo",
                        q4: "Allegro",
                        q5: "1-7",
                        q6: "Suara tinggi",
                        q7: "Nada naik setengah",
                        q8: "Ceria",
                        q9: "Cepat",
                        q10: "C-E-G"
                    };
                    let total = Object.keys(answers).length;
                    let userAnswers = {};
                    for (let q in answers) {
                        const checked = quizForm.querySelector('input[name="' + q + '"]:checked');
                        userAnswers[q] = checked ? checked.value : null;
                        if (userAnswers[q] === answers[q]) score++;
                    }
                    let percent = Math.round((score / total) * 100);
                    let message = '';
                    if (score === total) {
                        message = 'Selamat! Semua jawaban kamu benar 🎉';
                        quizResult.className = 'alert alert-success mt-4';
                    } else if (score >= 7) {
                        message = `Bagus! Kamu mendapatkan skor ${score} dari ${total} (${percent}%)`;
                        quizResult.className = 'alert alert-info mt-4';
                    } else {
                        message = `Kamu mendapatkan skor ${score} dari ${total} (${percent}%). Coba lagi ya!`;
                        quizResult.className = 'alert alert-warning mt-4';
                    }
                    quizResult.textContent = message;
                    quizResult.classList.remove('d-none');
                    quizProgressBar.classList.remove('d-none');
                    quizProgress.style.width = percent + '%';
                    quizProgress.textContent = percent + '%';
                    if (percent >= 80) {
                        quizProgress.classList.add('bg-success');
                        quizProgress.classList.remove('bg-warning', 'bg-danger');
                    } else if (percent >= 50) {
                        quizProgress.classList.add('bg-warning');
                        quizProgress.classList.remove('bg-success', 'bg-danger');
                    } else {
                        quizProgress.classList.add('bg-danger');
                        quizProgress.classList.remove('bg-success', 'bg-warning');
                    }
                });
            }
        });

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

            document.addEventListener("DOMContentLoaded", function () {
        const btnKembali = document.getElementById('btnKembaliMateri');
        btnKembali.addEventListener('click', function () {
            const modal = new bootstrap.Modal(document.getElementById('modalKonfirmasiKembali'));
            modal.show();
        });
    });

        // Filter button logic
        document.addEventListener("DOMContentLoaded", function () {
            const filterBtns = document.querySelectorAll('.filter-btn');
            const cards = document.querySelectorAll('#materi-cards .card');

            function filterCards(category) {
                cards.forEach(card => {
                    // Show cards matching the selected category or semua
                    if (category === 'semua') {
                        card.style.display = card.dataset.category.includes('semua') ? '' : 'none';
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

            // Initial state: show only semua
            filterCards('semua');
        });

