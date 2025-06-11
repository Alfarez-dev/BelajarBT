
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
                        q1: "Angklung",
                        q2: "Jawa dan Bali",
                        q3: "Mengatur ritme",
                        q4: "Dipukul",
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


            document.addEventListener("DOMContentLoaded", function () {
            // Filter button logic
            const filterBtns = document.querySelectorAll('.filter-btn');
            const cards = document.querySelectorAll('#materi-cards .col-md-4');

            function filterCards(category) {
            cards.forEach(card => {
                const categories = card.getAttribute('data-category').split(' ');
                if (category === 'semua') {
                card.style.display = categories.includes('semua') ? '' : 'none';
                } else {
                card.style.display = categories.includes(category) ? '' : 'none';
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
        }); // <-- Close the last DOMContentLoaded event listener

        // --- INTERACTIVE PIANO WITH WEB AUDIO API ---
let audioContext;
const pianoKeys = document.querySelectorAll('.piano .key');
const noteFrequencies = {
    'C4': 261.63, 'C#4': 277.18, 'D4': 293.66, 'D#4': 311.13, 'E4': 329.63,
    'F4': 349.23, 'F#4': 369.99, 'G4': 392.00, 'G#4': 415.30, 'A4': 440.00,
    'A#4': 466.16, 'B4': 493.88, 'C5': 523.25
};

// Fungsi untuk menginisialisasi AudioContext
function initAudio() {
    try {
        // AudioContext harus dibuat setelah interaksi pengguna (misalnya, klik)
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
    } catch (e) {
        console.error('Web Audio API is not supported in this browser');
        alert('Browser Anda tidak mendukung fitur audio interaktif.');
    }
}

// Fungsi untuk memainkan nada
function playNote(frequency) {
    if (!audioContext) return;
    
    // Membuat Oscillator untuk menghasilkan gelombang suara
    const oscillator = audioContext.createOscillator();
    // Membuat GainNode untuk mengontrol volume
    const gainNode = audioContext.createGain();
    
    oscillator.type = 'sine'; // Tipe gelombang suara (sine, square, sawtooth, triangle)
    oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
    
    // Mengatur amplop volume agar suara tidak berhenti tiba-tiba
    gainNode.gain.setValueAtTime(0.5, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.8);

    // Menghubungkan node
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    // Mulai dan hentikan oscillator
    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.8);
}

// Menambahkan event listener ke setiap tuts piano
pianoKeys.forEach(key => {
    key.addEventListener('click', () => {
        // Inisialisasi audio saat klik pertama kali
        if (!audioContext) {
            initAudio();
        }

        const note = key.dataset.note;
        const freq = noteFrequencies[note];
        if (freq) {
            playNote(freq);
            // Menambahkan efek visual saat ditekan
            key.classList.add('active');
            setTimeout(() => key.classList.remove('active'), 200);
        }
    });
});