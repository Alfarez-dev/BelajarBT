        // =================================================================
        // DATA KUIS - ANDA BISA MENGGANTI DAN MENAMBAH PERTANYAAN DI SINI
        // =================================================================
        const quizData = [
            {
                question: "Siapakah penyanyi dari lagu yang diputar ini?",
                audioSrc: "img/slideawayreff.mp3",
                answers: [
                    { text: "Tulus", correct: false },
                    { text: "Iwan Fals", correct: false },
                    { text: "Liam Gallagher", correct: true },
                    { text: "Chrisye", correct: false }
                ]
            },
            {
                question: "Dari genre apakah potongan musik ini?",
                audioSrc: "img/allaroundtheworld reff.mp3",
                answers: [
                    { text: "Pop", correct: false },
                    { text: "Rock", correct: true },
                    { text: "Jazz", correct: false },
                    { text: "Dangdut", correct: false }
                ]
            },
            {
                question: "Instrumen apa yang paling dominan dalam klip ini?",
                 audioSrc: "img/Buddy Holly but just the riff - Bubbsterr.mp3",
                answers: [
                    { text: "Piano", correct: false },
                    { text: "Gitar Elektrik", correct: true },
                    { text: "Biola", correct: false },
                    { text: "Saxophone", correct: false }
                ]
            }
        ];

        // =================================================================
        // LOGIKA KUIS - BAGIAN INI MENGATUR CARA KERJA KUIS
        // =================================================================
        const startScreen = document.getElementById('start-screen');
        const quizScreen = document.getElementById('quiz-screen');
        const endScreen = document.getElementById('end-screen');

        const showModalBtn = document.getElementById('show-modal-btn');
        const startBtn = document.getElementById('start-btn'); // Tombol di dalam modal
        const restartBtn = document.getElementById('restart-btn');

        const questionCounter = document.getElementById('question-counter');
        const scoreDisplay = document.getElementById('score-display');
        const questionText = document.getElementById('question-text');
        const answerButtons = document.getElementById('answer-buttons');
        const feedbackContainer = document.getElementById('feedback-container');

        const audioPlayer = document.getElementById('audio-element');
        const playPauseBtn = document.getElementById('play-pause-btn');
        const playIcon = document.getElementById('play-icon');
        const pauseIcon = document.getElementById('pause-icon');
        const progressBar = document.getElementById('audio-progress-bar');
        
        const finalScore = document.getElementById('final-score');
        
        const instructionModal = new bootstrap.Modal(document.getElementById('instructionModal'));

        let currentQuestionIndex = 0;
        let score = 0;

        // Event Listeners
        showModalBtn.addEventListener('click', () => instructionModal.show());
        startBtn.addEventListener('click', startQuiz);
        restartBtn.addEventListener('click', restartQuiz);
        playPauseBtn.addEventListener('click', togglePlayPause);
        audioPlayer.addEventListener('timeupdate', updateProgressBar);
        audioPlayer.addEventListener('ended', () => {
            playIcon.classList.remove('d-none');
            pauseIcon.classList.add('d-none');
            progressBar.style.width = '0%';
        });

        function startQuiz() {
            instructionModal.hide();
            startScreen.classList.add('d-none');
            endScreen.classList.add('d-none');
            quizScreen.classList.remove('d-none');
            currentQuestionIndex = 0;
            score = 0;
            updateScoreDisplay();
            showQuestion();
        }

        function restartQuiz() {
            endScreen.classList.add('d-none');
            quizScreen.classList.remove('d-none');
            currentQuestionIndex = 0;
            score = 0;
            updateScoreDisplay();
            showQuestion();
        }
        
        function showQuestion() {
            resetState();
            const currentQuestion = quizData[currentQuestionIndex];
            
            questionCounter.innerText = `Pertanyaan ${currentQuestionIndex + 1}/${quizData.length}`;
            questionText.innerText = currentQuestion.question;
            audioPlayer.src = currentQuestion.audioSrc;
            
            currentQuestion.answers.forEach(answer => {
                const col = document.createElement('div');
                col.classList.add('col-md-6');
                
                const button = document.createElement('button');
                button.innerText = answer.text;
                button.classList.add('btn', 'btn-outline-light', 'w-100', 'p-3');
                if (answer.correct) {
                    button.dataset.correct = answer.correct;
                }
                button.addEventListener('click', selectAnswer);
                
                col.appendChild(button);
                answerButtons.appendChild(col);
            });
        }
        
        function resetState() {
            clearFeedback();
            answerButtons.innerHTML = '';
            if (!audioPlayer.paused) {
                audioPlayer.pause();
            }
            audioPlayer.currentTime = 0;
            playIcon.classList.remove('d-none');
            pauseIcon.classList.add('d-none');
            progressBar.style.width = '0%';
        }
        
        function selectAnswer(e) {
            const selectedBtn = e.target;
            const correct = selectedBtn.dataset.correct === "true";
            
            audioPlayer.pause();
            
            if (correct) {
                score += 10;
                updateScoreDisplay();
                showFeedback("Jawaban Benar! 🎉", "correct");
            } else {
                showFeedback("Jawaban Salah, coba lagi!", "wrong");
            }

            Array.from(answerButtons.querySelectorAll('.btn')).forEach(button => {
                setStatusClass(button, button.dataset.correct === "true");
                button.disabled = true;
            });

            setTimeout(() => {
                currentQuestionIndex++;
                if (currentQuestionIndex < quizData.length) {
                    showQuestion();
                } else {
                    showEndScreen();
                }
            }, 2000);
        }
        
        function showFeedback(message, type) {
            clearFeedback();
            const feedbackElement = document.createElement('div');
            feedbackElement.innerText = message;
            if (type === 'correct') {
                feedbackElement.classList.add('text-success', 'fw-bold', 'fs-5', 'feedback-correct');
            } else {
                feedbackElement.classList.add('text-danger', 'fw-bold', 'fs-5', 'feedback-wrong');
            }
            feedbackContainer.appendChild(feedbackElement);
        }

        function clearFeedback() {
            feedbackContainer.innerHTML = '';
        }
        
        function setStatusClass(element, correct) {
            element.classList.remove('btn-outline-light');
            if (correct) {
                element.classList.add('btn-success');
            } else {
                element.classList.add('btn-danger');
            }
        }

        function updateScoreDisplay() {
            scoreDisplay.innerText = `Skor: ${score}`;
        }
        
        function showEndScreen() {
            quizScreen.classList.add('d-none');
            endScreen.classList.remove('d-none');
            finalScore.innerText = score;
        }

        async function togglePlayPause() {
            if (audioPlayer.paused) {
                try {
                    await audioPlayer.play();
                    playIcon.classList.add('d-none');
                    pauseIcon.classList.remove('d-none');
                } catch (error) {
                    console.error("Error saat memutar audio:", error);
                    showFeedback("Audio tidak dapat diputar.", "wrong");
                }
            } else {
                audioPlayer.pause();
                playIcon.classList.remove('d-none');
                pauseIcon.classList.add('d-none');
            }
        }

        function updateProgressBar() {
            if (audioPlayer.duration) {
                const percentage = (audioPlayer.currentTime / audioPlayer.duration) * 100;
                progressBar.style.width = `${percentage}%`;
            }
        }
