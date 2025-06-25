document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('main section');
    const header = document.querySelector('header');

    const setActiveLink = () => {
        let currentActiveSectionId = '';
        const headerOffset = header.offsetHeight;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - headerOffset - 1;
            const sectionBottom = sectionTop + section.offsetHeight;

            if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionBottom) {
                currentActiveSectionId = section.id;
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active'); // Apenas remove a classe 'active'
        });

        const activeLink = document.querySelector(`.nav-link[href="#${currentActiveSectionId}"]`);
        if (activeLink) {
            activeLink.classList.add('active'); // Apenas adiciona a classe 'active'
        }
    };

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                const headerOffset = header.offsetHeight;
                const elementPosition = targetSection.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = elementPosition - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });

                // Atualiza o link ativo imediatamente após o clique
                navLinks.forEach(l => {
                    l.classList.remove('active');
                });
                this.classList.add('active');
            }
        });
    });

    window.addEventListener('scroll', setActiveLink);
    setActiveLink(); // Chamada inicial
});
