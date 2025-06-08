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

    // 스크롤 시 네비게이션 바 스타일 변경
    const headerNav = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            headerNav.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            headerNav.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        } else {
            headerNav.style.backgroundColor = 'var(--white)';
            headerNav.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
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
        // APK 파일이 없을 경우를 대비한 에러 처리
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
});
