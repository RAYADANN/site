document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Анимация появления секций при скролле (Intersection Observer)
    const observerOptions = {
        threshold: 0.1
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.service-section').forEach(section => {
        section.style.opacity = "0";
        section.style.transform = "translateY(30px)";
        section.style.transition = "1s ease-out";
        revealObserver.observe(section);
    });

    // Функция для визуальной активации (вспомогательная)
    window.addEventListener('scroll', () => {
        document.querySelectorAll('.service-section').forEach(section => {
            const rect = section.getBoundingClientRect();
            if (rect.top < window.innerHeight - 100) {
                section.style.opacity = "1";
                section.style.transform = "translateY(0)";
            }
        });
    });

    // 2. Обработка карточек на мобильных устройствах
    const items = document.querySelectorAll('.item');
    
    items.forEach(item => {
        item.addEventListener('click', function(e) {
            // Если устройство сенсорное
            if (window.innerWidth <= 1024) {
                // Закрываем другие карточки
                items.forEach(i => {
                    if (i !== item) i.classList.remove('is-active');
                });
                // Переключаем текущую
                this.classList.toggle('is-active');
            }
        });
    });

    // 3. Умная подсветка активного пункта навигации
    const sections = document.querySelectorAll('.service-section');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = "";
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - 300)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active-link');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active-link');
            }
        });
    });
});