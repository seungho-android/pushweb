// 페이지가 로드되면 실행
document.addEventListener('DOMContentLoaded', () => {
    // 환영 메시지 표시
    const header = document.querySelector('h1');
    header.addEventListener('click', () => {
        alert('웹 개발의 세계에 오신 것을 환영합니다!');
    });

    // 현재 시간 표시
    const footer = document.querySelector('footer p');
    const updateTime = () => {
        const now = new Date();
        const timeString = now.toLocaleTimeString('ko-KR');
        footer.textContent = `현재 시간: ${timeString}`;
    };
    
    updateTime();
    setInterval(updateTime, 1000);

    // 모바일 메뉴 토글
    const menuIcon = document.querySelector('.fa-bars');
    const navLeft = document.querySelector('.nav-left');
    
    if (menuIcon && navLeft) {
        menuIcon.addEventListener('click', () => {
            navLeft.classList.toggle('active');
            menuIcon.classList.toggle('fa-bars');
            menuIcon.classList.toggle('fa-times');
        });
    }

    // 모바일에서 서브메뉴 토글
    const menuItems = document.querySelectorAll('.nav-left > ul > li');
    
    menuItems.forEach(item => {
        const link = item.querySelector('a');
        const submenu = item.querySelector('.submenu');
        
        if (submenu && window.innerWidth <= 768) {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                submenu.style.display = submenu.style.display === 'block' ? 'none' : 'block';
            });
        }
    });

    // 윈도우 리사이즈 시 모바일 메뉴 초기화
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            navLeft.classList.remove('active');
            menuIcon.classList.remove('fa-times');
            menuIcon.classList.add('fa-bars');
            
            // 서브메뉴 초기화
            document.querySelectorAll('.submenu').forEach(submenu => {
                submenu.style.display = '';
            });
        }
    });

    // 모달 관련 요소들
    const videoModal = document.getElementById('videoModal');
    const workoutModal = document.getElementById('workoutModal');
    const benefitsModal = document.getElementById('benefitsModal');
    const faqModal = document.getElementById('faqModal');
    
    const videoButton = document.querySelector('.video-button');
    const workoutButton = document.querySelector('.workout-plan-button');
    const benefitsButton = document.querySelector('.benefits-button');
    const faqButton = document.querySelector('.faq-button');
    
    const closeButtons = document.querySelectorAll('.close-button');

    // 모달 열기 함수
    function openModal(modal) {
        if (modal) {
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        }
    }

    // 모달 닫기 함수
    function closeModal(modal) {
        if (modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    }

    // 모달 버튼 이벤트 리스너
    if (videoButton) videoButton.addEventListener('click', () => openModal(videoModal));
    if (workoutButton) workoutButton.addEventListener('click', () => openModal(workoutModal));
    if (benefitsButton) benefitsButton.addEventListener('click', () => openModal(benefitsModal));
    if (faqButton) faqButton.addEventListener('click', () => openModal(faqModal));

    // 닫기 버튼 이벤트 리스너
    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modal = button.closest('.modal');
            closeModal(modal);
        });
    });

    // 모달 외부 클릭시 닫기
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            closeModal(e.target);
        }
    });

    // 운동 계획 관련 코드
    const step1 = document.getElementById('step1');
    const step2 = document.getElementById('step2');
    const levelButtons = document.querySelectorAll('.level-button');
    const backButton = document.querySelector('.back-button');
    const weekTabs = document.querySelectorAll('.week-tab');
    let currentLevel = null;
    let currentWeek = 1;

    // 레벨 선택
    if (levelButtons) {
        levelButtons.forEach(button => {
            button.addEventListener('click', () => {
                currentLevel = button.dataset.level;
                if (step1 && step2) {
                    step1.style.display = 'none';
                    step2.style.display = 'block';
                    updateWorkoutPlan();
                }
            });
        });
    }

    // 뒤로 가기
    if (backButton && step1 && step2) {
        backButton.addEventListener('click', () => {
            step2.style.display = 'none';
            step1.style.display = 'block';
        });
    }

    // 주차 선택
    if (weekTabs) {
        weekTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                weekTabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                currentWeek = parseInt(tab.dataset.week);
                updateWorkoutPlan();
            });
        });
    }

    // 운동 계획 업데이트
    function updateWorkoutPlan() {
        if (!currentLevel || !currentWeek) return;

        const plan = workoutPlans[currentLevel][currentWeek];
        const days = ['monday', 'wednesday', 'friday'];
        const details = document.querySelectorAll('.exercise-details');

        if (details) {
            days.forEach((day, index) => {
                if (details[index] && plan[day]) {
                    details[index].innerHTML = plan[day].replace(/\n/g, '<br>');
                }
            });
        }
    }

    // 스크롤 시 네비게이션 바 스타일 변경
    const headerNav = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (headerNav) {
            if (window.scrollY > 100) {
                headerNav.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
                headerNav.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
            } else {
                headerNav.style.backgroundColor = 'var(--white)';
                headerNav.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
            }
        }
    });

    // 스무스 스크롤 구현
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // 기능 카드 애니메이션
    const cards = document.querySelectorAll('.feature-card');
    const observerOptions = {
        threshold: 0.2
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';
        observer.observe(card);
    });

    // 다운로드 버튼 클릭 이벤트
    const downloadButton = document.querySelector('.download-button');
    downloadButton.addEventListener('click', (e) => {
        e.preventDefault();
        const apkPath = 'downloads/pushup.apk';
        
        fetch(apkPath)
            .then(response => {
                if (response.ok) {
                    window.location.href = apkPath;
                } else {
                    alert('현재 다운로드를 준비 중입니다. 곧 서비스될 예정입니다.');
                }
            })
            .catch(() => {
                alert('현재 다운로드를 준비 중입니다. 곧 서비스될 예정입니다.');
            });
    });

    // 스크롤 시 헤더 스타일 변경
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        const header = document.querySelector('header');
        
        if (currentScroll > lastScroll && currentScroll > 100) {
            // 스크롤 다운
            header.style.transform = 'translateY(-100%)';
        } else {
            // 스크롤 업
            header.style.transform = 'translateY(0)';
        }
        
        lastScroll = currentScroll;
    });

    // 스크롤 위치에 따른 메뉴 활성화
    const sections = document.querySelectorAll('section[id]');

    function updateActiveMenu() {
        const scrollPosition = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', updateActiveMenu);
    updateActiveMenu();

    // 운동 계획 데이터
    const workoutPlans = {
        beginner: {
            1: {
                monday: '기본 푸시업 3세트 (각 3회)\n30초 휴식\n무릎 푸시업 2세트 (각 5회)',
                wednesday: '무릎 푸시업 4세트 (각 4회)\n30초 휴식\n벽 푸시업 2세트 (각 8회)',
                friday: '기본 푸시업 2세트 (각 4회)\n45초 휴식\n무릎 푸시업 3세트 (각 5회)'
            },
            2: {
                monday: '기본 푸시업 4세트 (각 4회)\n30초 휴식\n무릎 푸시업 3세트 (각 6회)',
                wednesday: '무릎 푸시업 5세트 (각 5회)\n30초 휴식\n기본 푸시업 2세트 (각 5회)',
                friday: '기본 푸시업 3세트 (각 5회)\n45초 휴식\n무릎 푸시업 4세트 (각 6회)'
            },
            3: {
                monday: '기본 푸시업 4세트 (각 5회)\n45초 휴식\n무릎 푸시업 3세트 (각 7회)',
                wednesday: '기본 푸시업 5세트 (각 5회)\n30초 휴식\n벽 푸시업 3세트 (각 10회)',
                friday: '기본 푸시업 4세트 (각 6회)\n45초 휴식\n무릎 푸시업 3세트 (각 8회)'
            },
            4: {
                monday: '기본 푸시업 5세트 (각 5회)\n45초 휴식\n무릎 푸시업 3세트 (각 8회)',
                wednesday: '기본 푸시업 5세트 (각 6회)\n45초 휴식\n무릎 푸시업 4세트 (각 8회)',
                friday: '기본 푸시업 5세트 (각 7회)\n60초 휴식\n무릎 푸시업 3세트 (각 9회)'
            }
        },
        intermediate: {
            1: {
                monday: '기본 푸시업 4세트 (각 8회)\n45초 휴식\n다이아몬드 푸시업 2세트 (각 5회)',
                wednesday: '기본 푸시업 5세트 (각 10회)\n45초 휴식\n클랩 푸시업 2세트 (각 3회)',
                friday: '기본 푸시업 4세트 (각 12회)\n60초 휴식\n넓은 푸시업 3세트 (각 8회)'
            },
            2: {
                monday: '기본 푸시업 5세트 (각 10회)\n45초 휴식\n다이아몬드 푸시업 3세트 (각 6회)',
                wednesday: '기본 푸시업 5세트 (각 12회)\n60초 휴식\n클랩 푸시업 3세트 (각 4회)',
                friday: '기본 푸시업 5세트 (각 14회)\n60초 휴식\n넓은 푸시업 4세트 (각 10회)'
            },
            3: {
                monday: '기본 푸시업 5세트 (각 12회)\n60초 휴식\n다이아몬드 푸시업 4세트 (각 7회)',
                wednesday: '기본 푸시업 6세트 (각 12회)\n60초 휴식\n클랩 푸시업 4세트 (각 5회)',
                friday: '기본 푸시업 5세트 (각 15회)\n75초 휴식\n넓은 푸시업 4세트 (각 12회)'
            },
            4: {
                monday: '기본 푸시업 6세트 (각 13회)\n60초 휴식\n다이아몬드 푸시업 4세트 (각 8회)',
                wednesday: '기본 푸시업 6세트 (각 14회)\n75초 휴식\n클랩 푸시업 4세트 (각 6회)',
                friday: '기본 푸시업 6세트 (각 15회)\n75초 휴식\n넓은 푸시업 5세트 (각 12회)'
            }
        },
        advanced: {
            1: {
                monday: '기본 푸시업 5세트 (각 20회)\n60초 휴식\n다이아몬드 푸시업 4세트 (각 12회)',
                wednesday: '기본 푸시업 6세트 (각 20회)\n60초 휴식\n클랩 푸시업 4세트 (각 8회)',
                friday: '기본 푸시업 5세트 (각 25회)\n75초 휴식\n플라이오메트릭 푸시업 3세트 (각 10회)'
            },
            2: {
                monday: '기본 푸시업 6세트 (각 22회)\n60초 휴식\n다이아몬드 푸시업 5세트 (각 13회)',
                wednesday: '기본 푸시업 6세트 (각 23회)\n75초 휴식\n클랩 푸시업 5세트 (각 9회)',
                friday: '기본 푸시업 6세트 (각 25회)\n75초 휴식\n플라이오메트릭 푸시업 4세트 (각 11회)'
            },
            3: {
                monday: '기본 푸시업 6세트 (각 25회)\n75초 휴식\n다이아몬드 푸시업 5세트 (각 15회)',
                wednesday: '기본 푸시업 7세트 (각 25회)\n75초 휴식\n클랩 푸시업 5세트 (각 10회)',
                friday: '기본 푸시업 6세트 (각 30회)\n90초 휴식\n플라이오메트릭 푸시업 4세트 (각 12회)'
            },
            4: {
                monday: '기본 푸시업 7세트 (각 25회)\n75초 휴식\n다이아몬드 푸시업 6세트 (각 15회)',
                wednesday: '기본 푸시업 7세트 (각 27회)\n90초 휴식\n클랩 푸시업 5세트 (각 12회)',
                friday: '기본 푸시업 7세트 (각 30회)\n90초 휴식\n플라이오메트릭 푸시업 5세트 (각 12회)'
            }
        }
    };
});
