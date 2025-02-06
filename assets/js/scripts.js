
// Seleciona o botão do menu e o menu
const menuToggle = document.querySelector('.menu-toggle');
const menu = document.querySelector('.menu');

// Adiciona um evento de clique ao botão
menuToggle.addEventListener('click', () => {
    menu.classList.toggle('active'); // Alterna a classe 'active' no menu
});


// Inicialização do Swiper
const swiper = new Swiper('.mySwiper', {
    loop: true, // Loop infinito
    centeredSlides: true, // Centraliza o slide ativo
    slidesPerView: 'auto', // Ajusta o número de slides visíveis automaticamente
    spaceBetween: 20, // Espaço entre os slides
    autoplay: {
        delay: 3000, // Troca de slide a cada 3 segundos
        disableOnInteraction: false, // Continua o autoplay após interação
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true, // Permite clicar nos pontos para navegar
    },
});


function debounce(func, wait) {
    let timeout;
    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

// Detecta a cor do fundo e muda a cor da barra lateral
function detectBackgroundColor() {
    const socialBar = document.getElementById("socialBar");
    const rect = socialBar.getBoundingClientRect();
    
    // Verifica vários pontos ao longo da barra
    const pointsToCheck = [
        { x: rect.left, y: rect.top }, // Canto superior esquerdo
        { x: rect.left + rect.width / 2, y: rect.top }, // Meio superior
        { x: rect.left + rect.width, y: rect.top }, // Canto superior direito
        { x: rect.left, y: rect.top + rect.height / 2 }, // Meio esquerdo
        { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 }, // Centro
        { x: rect.left + rect.width, y: rect.top + rect.height / 2 }, // Meio direito
        { x: rect.left, y: rect.top + rect.height }, // Canto inferior esquerdo
        { x: rect.left + rect.width / 2, y: rect.top + rect.height }, // Meio inferior
        { x: rect.left + rect.width, y: rect.top + rect.height } // Canto inferior direito
    ];

    let isOverBlack = false;

    for (const point of pointsToCheck) {
        const elements = document.elementsFromPoint(point.x, point.y);
        
        for (const element of elements) {
            const backgroundColor = window.getComputedStyle(element).backgroundColor;
            
            if (backgroundColor === "rgb(0, 0, 0)") { // Verifica se o fundo é preto
                isOverBlack = true;
                break;
            }
        }

        if (isOverBlack) break;
    }

    if (isOverBlack) {
        socialBar.style.background = "white"; // Troca a cor de fundo da barra lateral
        socialBar.style.color = "black"; // Troca a cor do texto
    } else {
        socialBar.style.background = "rgba(255, 255, 255, 0)"; // Restaura a cor original
        socialBar.style.color = ""; // Restaura a cor original do texto
    }
}

document.addEventListener("scroll", debounce(() => {
    const socialBar = document.getElementById("socialBar");

    if (window.scrollY > 100) {
        socialBar.classList.add("visible");
        detectBackgroundColor();
    } else {
        socialBar.classList.remove("visible");
    }
}, 100));

window.addEventListener("resize", debounce(detectBackgroundColor, 100));



// Filtro de Categorias
document.querySelectorAll('.filter-button').forEach(button => {
    button.addEventListener('click', () => {
        // Remove a classe 'active' de todos os botões
        document.querySelectorAll('.filter-button').forEach(btn => btn.classList.remove('active'));
        // Adiciona a classe 'active' ao botão clicado
        button.classList.add('active');

        const filter = button.getAttribute('data-filter');
        document.querySelectorAll('.portfolio-item').forEach(item => {
            if (filter === 'all' || item.classList.contains(filter)) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });
});


// Flip dos cards de serviços
function flipCard(cardId) {
    const card = document.getElementById(cardId);
    card.classList.toggle('flipped');
}